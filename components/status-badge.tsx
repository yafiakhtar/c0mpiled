import type { PaperStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const LABELS: Record<PaperStatus, string> = {
  queued: "Queued",
  processing: "Processing",
  ready: "Ready",
  failed: "Failed"
};

export function StatusBadge({ status }: { status: PaperStatus }) {
  return (
    <span
      className={cn(
        "status-badge",
        status === "queued" && "status-queued",
        status === "processing" && "status-processing",
        status === "ready" && "status-ready",
        status === "failed" && "status-failed"
      )}
    >
      {LABELS[status]}
    </span>
  );
}
