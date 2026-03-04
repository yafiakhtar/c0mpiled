"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent
} from "react";
import { DEFAULT_MAX_UPLOAD_BYTES, STORAGE_BUCKET } from "@/lib/constants";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import type { ChatMessage, PaperSummary } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/status-badge";

interface WorkspaceShellProps {
  userId: string;
  userEmail: string;
  initialPapers: PaperSummary[];
}

async function safeJson<T>(response: Response) {
  return (await response.json()) as T;
}

function buildLocalMessage(role: "user" | "assistant", content = ""): ChatMessage {
  return {
    id: `temp-${crypto.randomUUID()}`,
    role,
    content,
    citedPages: [],
    citedSnippets: [],
    createdAt: new Date().toISOString()
  };
}

async function readEventStream(
  response: Response,
  callbacks: {
    onDelta: (delta: string) => void;
    onDone: (payload: { message: ChatMessage }) => void;
  }
) {
  const reader = response.body?.getReader();

  if (!reader) {
    throw new Error("Streaming is not supported in this browser.");
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });

    let boundary = buffer.indexOf("\n\n");

    while (boundary !== -1) {
      const block = buffer.slice(0, boundary).trim();
      buffer = buffer.slice(boundary + 2);

      if (block) {
        let eventName = "message";
        let dataLine = "";

        for (const line of block.split("\n")) {
          if (line.startsWith("event:")) {
            eventName = line.slice(6).trim();
          }

          if (line.startsWith("data:")) {
            dataLine += line.slice(5).trim();
          }
        }

        if (eventName === "delta") {
          const payload = JSON.parse(dataLine) as { delta: string };
          callbacks.onDelta(payload.delta);
        }

        if (eventName === "done") {
          const payload = JSON.parse(dataLine) as { message: ChatMessage };
          callbacks.onDone(payload);
        }
      }

      boundary = buffer.indexOf("\n\n");
    }
  }
}

export function WorkspaceShell({ userId, userEmail, initialPapers }: WorkspaceShellProps) {
  const [papers, setPapers] = useState<PaperSummary[]>(initialPapers);
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(initialPapers[0]?.id ?? null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [composerValue, setComposerValue] = useState("");
  const [viewerPage, setViewerPage] = useState(1);
  const [uploadStatus, setUploadStatus] = useState<string>("Drop a PDF here or pick a file.");
  const [chatStatus, setChatStatus] = useState<string>("Ask questions once a paper is ready.");
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedPaper = useMemo(
    () => papers.find((paper) => paper.id === selectedPaperId) ?? null,
    [papers, selectedPaperId]
  );
  const viewerSrc = selectedPaper?.viewerUrl ? `${selectedPaper.viewerUrl}#page=${viewerPage}` : null;

  const refreshPapers = async () => {
    const response = await fetch("/api/papers", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Unable to refresh the paper list.");
    }

    const payload = (await response.json()) as { papers: PaperSummary[] };
    setPapers(payload.papers);

    if (!selectedPaperId && payload.papers[0]) {
      setSelectedPaperId(payload.papers[0].id);
    }
  };

  const loadPaperContext = async (paperId: string) => {
    const [paperResponse, messageResponse] = await Promise.all([
      fetch(`/api/papers/${paperId}`, { cache: "no-store" }),
      fetch(`/api/papers/${paperId}/messages`, { cache: "no-store" })
    ]);

    if (!paperResponse.ok) {
      throw new Error("Unable to load that paper.");
    }

    if (!messageResponse.ok) {
      throw new Error("Unable to load the conversation.");
    }

    const paperPayload = (await paperResponse.json()) as { paper: PaperSummary };
    const messagePayload = (await messageResponse.json()) as { messages: ChatMessage[] };

    setPapers((current) =>
      current.map((paper) => (paper.id === paperId ? paperPayload.paper : paper))
    );
    setMessages(messagePayload.messages);
  };

  useEffect(() => {
    if (!selectedPaperId) {
      setMessages([]);
      return;
    }

    setViewerPage(1);
    void loadPaperContext(selectedPaperId).catch((error: Error) => {
      setChatStatus(error.message);
    });
  }, [selectedPaperId]);

  useEffect(() => {
    if (!selectedPaper || selectedPaper.status === "ready" || selectedPaper.status === "failed") {
      return;
    }

    const timer = window.setInterval(() => {
      void refreshPapers().catch(() => undefined);
      void loadPaperContext(selectedPaper.id).catch(() => undefined);
    }, 4_000);

    return () => window.clearInterval(timer);
  }, [selectedPaper]);

  const handleUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      setUploadStatus("Only PDF files are supported.");
      return;
    }

    if (file.size > DEFAULT_MAX_UPLOAD_BYTES) {
      setUploadStatus("PDFs must be 20 MB or smaller.");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Uploading your PDF...");

    try {
      const supabase = createBrowserSupabaseClient();
      const path = `${userId}/${crypto.randomUUID()}.pdf`;
      const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
        cacheControl: "3600",
        contentType: "application/pdf",
        upsert: false
      });

      if (uploadError) {
        throw uploadError;
      }

      const createResponse = await fetch("/api/papers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          filePath: path,
          originalFilename: file.name,
          fileSizeBytes: file.size
        })
      });

      if (!createResponse.ok) {
        const payload = await safeJson<{ error: string }>(createResponse);
        throw new Error(payload.error);
      }

      const payload = await safeJson<{ paperId: string }>(createResponse);
      await refreshPapers();
      setSelectedPaperId(payload.paperId);
      setUploadStatus("Uploaded. Processing has started.");
    } catch (errorValue) {
      const error = errorValue as Error;
      setUploadStatus(error.message || "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      await handleUpload(file);
    }

    event.target.value = "";
  };

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPaper || selectedPaper.status !== "ready" || isSending) {
      return;
    }

    const trimmed = composerValue.trim();

    if (!trimmed) {
      return;
    }

    const userMessage = buildLocalMessage("user", trimmed);
    const assistantPlaceholder = buildLocalMessage("assistant", "");
    setMessages((current) => [...current, userMessage, assistantPlaceholder]);
    setComposerValue("");
    setIsSending(true);
    setChatStatus("Thinking with the paper...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          paperId: selectedPaper.id,
          message: trimmed
        })
      });

      if (!response.ok) {
        const payload = await safeJson<{ error: string }>(response);
        throw new Error(payload.error);
      }

      await readEventStream(response, {
        onDelta: (delta) => {
          setMessages((current) =>
            current.map((message, index) =>
              index === current.length - 1
                ? { ...message, content: `${message.content}${delta}` }
                : message
            )
          );
        },
        onDone: ({ message }) => {
          setMessages((current) => [...current.slice(0, -1), message]);
          setChatStatus("Answer ready.");
        }
      });
    } catch (errorValue) {
      const error = errorValue as Error;
      setMessages((current) => current.slice(0, -1));
      setChatStatus(error.message || "Unable to answer right now.");
    } finally {
      setIsSending(false);
    }
  };

  const handleRetry = async () => {
    if (!selectedPaper) {
      return;
    }

    const response = await fetch(`/api/papers/${selectedPaper.id}/retry`, {
      method: "POST"
    });

    if (!response.ok) {
      const payload = await safeJson<{ error: string }>(response);
      setChatStatus(payload.error);
      return;
    }

    setChatStatus("Retry queued.");
    await refreshPapers();
    await loadPaperContext(selectedPaper.id);
  };

  return (
    <div className="workspace-shell">
      <aside className="panel panel-history">
        <div className="panel-header">
          <div>
            <p className="eyebrow">History</p>
            <h2>Your papers</h2>
          </div>
          <form action="/auth/sign-out" method="post">
            <button className="ghost-button" type="submit">
              Sign out
            </button>
          </form>
        </div>
        <p className="panel-copy">Signed in as {userEmail}</p>
        <button className="upload-card" type="button" onClick={() => fileInputRef.current?.click()}>
          <span>Upload a paper</span>
          <strong>{isUploading ? "Uploading..." : "Pick PDF"}</strong>
          <small>{uploadStatus}</small>
        </button>
        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept="application/pdf"
          onChange={handleFileInput}
        />
        <div className="history-list">
          {papers.length === 0 ? <p className="empty-state">No papers yet.</p> : null}
          {papers.map((paper) => (
            <button
              key={paper.id}
              type="button"
              onClick={() => setSelectedPaperId(paper.id)}
              className={cn("history-item", paper.id === selectedPaperId && "history-item-active")}
            >
              <div className="history-item-head">
                <strong>{paper.title ?? paper.originalFilename ?? "Untitled paper"}</strong>
                <StatusBadge status={paper.status} />
              </div>
              <span>{formatDate(paper.createdAt)}</span>
              {paper.pageCount ? <small>{paper.pageCount} pages</small> : null}
            </button>
          ))}
        </div>
      </aside>
      <section className="panel panel-viewer">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Viewer</p>
            <h2>{selectedPaper?.title ?? selectedPaper?.originalFilename ?? "Select a paper"}</h2>
          </div>
          {selectedPaper ? <StatusBadge status={selectedPaper.status} /> : null}
        </div>
        {selectedPaper?.status === "failed" ? (
          <div className="notice-card notice-failed">
            <p>{selectedPaper.errorMessage ?? "Processing failed."}</p>
            <button className="primary-button" type="button" onClick={handleRetry}>
              Retry processing
            </button>
          </div>
        ) : null}
        <div className="viewer-surface">
          {viewerSrc ? (
            <iframe key={viewerSrc} src={viewerSrc} title="PDF viewer" />
          ) : (
            <div className="empty-viewer">
              <p>Upload a PDF to see it here.</p>
            </div>
          )}
        </div>
      </section>
      <aside className="panel panel-chat">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Chat</p>
            <h2>Paper Q&A</h2>
          </div>
        </div>
        <p className="panel-copy">{chatStatus}</p>
        <div className="chat-thread">
          {messages.length === 0 ? <p className="empty-state">No messages yet.</p> : null}
          {messages.map((message) => (
            <article key={message.id} className={cn("chat-bubble", message.role === "assistant" && "chat-bubble-assistant")}>
              <header>
                <strong>{message.role === "assistant" ? "PaperTalk" : "You"}</strong>
                <span>{formatDate(message.createdAt)}</span>
              </header>
              <p>{message.content || "..."}</p>
              {message.role === "assistant" && message.citedPages.length > 0 ? (
                <footer className="citation-block">
                  <span>Pages {message.citedPages.join(", ")}</span>
                  {message.citedSnippets.map((snippet, index) => (
                    <button
                      key={`${message.id}-${index}`}
                      type="button"
                      className="citation-pill"
                      onClick={() => {
                        if (!selectedPaper?.viewerUrl) {
                          return;
                        }

                        setViewerPage(snippet.page);
                      }}
                    >
                      p.{snippet.page}: {snippet.snippet}
                    </button>
                  ))}
                </footer>
              ) : null}
            </article>
          ))}
        </div>
        <form className="chat-form" onSubmit={handleSendMessage}>
          <textarea
            value={composerValue}
            onChange={(event) => setComposerValue(event.target.value)}
            placeholder={selectedPaper?.status === "ready" ? "Ask something specific about this paper..." : "Chat unlocks when processing finishes."}
            disabled={!selectedPaper || selectedPaper.status !== "ready" || isSending}
          />
          <button
            className="primary-button"
            type="submit"
            disabled={!selectedPaper || selectedPaper.status !== "ready" || isSending}
          >
            {isSending ? "Answering..." : "Ask the paper"}
          </button>
        </form>
      </aside>
    </div>
  );
}
