import { getUploadLimits, validateStoragePath } from "@/lib/papers/validation";
import { listPapersWithViewerUrls, updatePaperStatus } from "@/lib/papers/service";
import { publishProcessingJob } from "@/lib/queue";
import { requireRouteUser, unauthorizedJson } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireRouteUser();

  if (auth.unauthorized) {
    return unauthorizedJson();
  }

  try {
    const papers = await listPapersWithViewerUrls(auth.user.id, auth.supabase);
    return Response.json({ papers });
  } catch (errorValue) {
    const error = errorValue as Error;
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireRouteUser();

  if (auth.unauthorized) {
    return unauthorizedJson();
  }

  try {
    const body = (await request.json()) as {
      filePath?: string;
      originalFilename?: string;
      fileSizeBytes?: number;
    };
    const filePath = body.filePath?.trim();
    const originalFilename = body.originalFilename?.trim() || null;
    const fileSizeBytes = Number(body.fileSizeBytes ?? 0);
    const { maxBytes } = getUploadLimits();

    if (!filePath || !validateStoragePath(auth.user.id, filePath)) {
      return Response.json({ error: "Invalid storage path." }, { status: 400 });
    }

    if (!Number.isFinite(fileSizeBytes) || fileSizeBytes <= 0 || fileSizeBytes > maxBytes) {
      return Response.json(
        { error: `PDFs must be under ${Math.round(maxBytes / 1_000_000)} MB.` },
        { status: 400 }
      );
    }

    const { data, error } = await auth.supabase
      .from("papers")
      .insert({
        user_id: auth.user.id,
        file_path: filePath,
        original_filename: originalFilename,
        file_size_bytes: fileSizeBytes,
        status: "queued"
      })
      .select("id")
      .single();

    if (error || !data) {
      throw error ?? new Error("Failed to create paper.");
    }

    try {
      await publishProcessingJob({ paperId: data.id });
    } catch (errorValue) {
      const error = errorValue as Error;
      await updatePaperStatus(data.id, {
        status: "failed",
        error_message: error.message,
        failure_code: "QUEUE_PUBLISH_FAILED"
      });
      throw new Error("The paper was saved, but processing could not be queued.");
    }

    return Response.json({ paperId: data.id, status: "queued" }, { status: 202 });
  } catch (errorValue) {
    const error = errorValue as Error;
    return Response.json({ error: error.message }, { status: 500 });
  }
}
