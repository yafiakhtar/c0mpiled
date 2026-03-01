"use client";

import { useEffect, useMemo, useState } from "react";

type DocumentRecord = {
  id: string;
  title: string;
  status: string;
  page_count?: number | null;
  created_at?: string;
};

type ChatResponse = {
  answer: string;
  citations: { page: number | null; snippet: string }[];
};

type TabKey = "voice" | "chat" | "citations";

type UploadResponse = {
  document: {
    id: string;
    title: string;
    blob_url: string;
    status: string;
  };
};

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [documentId, setDocumentId] = useState<string>("");
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [ingestStatus, setIngestStatus] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [chatResponse, setChatResponse] = useState<ChatResponse | null>(null);
  const [docs, setDocs] = useState<DocumentRecord[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>("chat");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const statusPill = useMemo(() => {
    if (uploadStatus) return uploadStatus;
    if (ingestStatus) return ingestStatus;
    return null;
  }, [uploadStatus, ingestStatus]);

  async function login() {
    setLoginStatus("logging in...");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setLoginStatus(data.error ?? "login failed");
      return;
    }
    setLoginStatus("ok");
    await loadDocuments();
  }

  async function upload() {
    if (!file) {
      setUploadStatus("select a PDF first");
      return;
    }
    setUploadStatus("uploading...");
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = (await res.json().catch(() => ({}))) as UploadResponse & { error?: string };
    if (!res.ok) {
      setUploadStatus(data.error ?? "upload failed");
      return;
    }
    setUploadStatus("uploaded");
    setDocumentId(data.document.id);
    setBlobUrl(data.document.blob_url);
    await loadDocuments();
  }

  async function ingest() {
    if (!documentId) {
      setIngestStatus("missing document id");
      return;
    }
    setIngestStatus("ingesting...");
    const res = await fetch("/api/ingest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setIngestStatus(data.error ?? "ingest failed");
      return;
    }
    setIngestStatus("ready");
    await loadDocuments();
  }

  async function chat() {
    if (!documentId) {
      setChatResponse({ answer: "Missing document id", citations: [] });
      return;
    }
    if (!query.trim()) {
      setChatResponse({ answer: "Ask a question first", citations: [] });
      return;
    }
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId, query })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setChatResponse({ answer: data.error ?? "chat failed", citations: [] });
      return;
    }
    setChatResponse(data);
    setActiveTab("citations");
  }

  async function loadDocuments() {
    const res = await fetch("/api/documents");
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setDocs([]);
      return;
    }
    setDocs(data.documents ?? []);
  }

  const activeCitations = chatResponse?.citations ?? [];
  const uniqueDocs = useMemo(() => {
    const seen = new Set<string>();
    return docs.filter((d) => {
      if (seen.has(d.id)) return false;
      seen.add(d.id);
      return true;
    });
  }, [docs]);

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="dot" />
          PaperTalk
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="toggle theme">
            {theme === "light" ? "Dark" : "Light"} mode
          </button>
        </div>
      </header>

      <section className="grid">
        <aside className="panel history">
          <div className="panel-title">History</div>
          <div className="history-actions">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={login}>Login</button>
          </div>
          {loginStatus && <div className="status">{loginStatus}</div>}
          <div className="history-list">
            {uniqueDocs.length === 0 && <div className="muted">No papers yet.</div>}
            {uniqueDocs.map((doc) => (
              <button
                key={doc.id}
                className={`history-item ${doc.id === documentId ? "active" : ""}`}
                onClick={() => {
                  setDocumentId(doc.id);
                  setBlobUrl("");
                }}
              >
                <div className="history-title">{doc.title}</div>
                <div className="history-meta">{doc.status}</div>
              </button>
            ))}
          </div>
        </aside>

        <section className="panel middle">
          <div className="panel-title">Paper</div>
          <div className="upload-box">
            <div className="upload-row">
              <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="file-input" />
              <button onClick={upload}>Upload</button>
              <button className="ghost" onClick={ingest}>Ingest</button>
            </div>
            <div className="upload-meta">
              {statusPill && <span className="status">{statusPill}</span>}
              {documentId && <span className="doc-id" title={documentId}>{documentId.slice(0, 8)}…</span>}
            </div>
          </div>

          <div className="paper-view">
            {blobUrl ? (
              <>
                <button
                  className="close-pdf ghost"
                  onClick={() => setBlobUrl("")}
                  aria-label="Close PDF"
                >
                  Close
                </button>
                <iframe title="pdf" src={blobUrl} className="pdf-frame" />
              </>
            ) : (
              <div className="empty">Upload a PDF to preview it here.</div>
            )}
          </div>
        </section>

        <aside className="panel right">
          <div className="tabs">
            {(["voice", "chat", "citations"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "voice" && (
            <div className="tab-panel">
              <div className="muted">Voice mode will appear here once Realtime UI is wired.</div>
            </div>
          )}

          {activeTab === "chat" && (
            <div className="tab-panel">
              <textarea
                rows={5}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about the paper..."
              />
              <div className="chat-actions">
                <button onClick={chat}>Ask</button>
              </div>
              {chatResponse && (
                <div className="response">
                  <div className="response-title">Answer</div>
                  <div>{chatResponse.answer}</div>
                </div>
              )}
            </div>
          )}

          {activeTab === "citations" && (
            <div className="tab-panel">
              {activeCitations.length === 0 && <div className="muted">No citations yet.</div>}
              {activeCitations.map((c, i) => (
                <div key={i} className="citation">
                  <div className="citation-head">Page {c.page ?? "?"}</div>
                  <div className="citation-body">{c.snippet}</div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </section>

      <style jsx>{`
        .shell {
          padding: 32px;
          max-width: 1600px;
          margin: 0 auto;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 24px;
        }

        .brand {
          font-family: "Lora", serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--ink);
        }

        .top-actions button {
          padding: 6px 0;
          font-size: 13px;
        }

        .grid {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr) 300px;
          gap: 40px;
          align-items: start;
        }

        .panel {
          display: flex;
          flex-direction: column;
          min-height: 560px;
        }

        .panel-title {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 16px;
        }

        .history {
          gap: 12px;
        }

        .history-actions {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
          align-items: center;
        }

        .history-actions input {
          padding: 6px 0;
          border: none;
          border-bottom: 1px solid var(--border);
          background: transparent;
          color: inherit;
          font-size: 13px;
          min-width: 0;
        }

        button {
          border: none;
          padding: 6px 12px;
          background: var(--ink);
          color: var(--bg);
          font-weight: 500;
          font-size: 13px;
          cursor: pointer;
        }

        button.ghost {
          background: transparent;
          color: var(--ink);
        }

        .status {
          font-size: 12px;
          color: var(--muted);
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 16px;
          overflow: auto;
        }

        .history-item {
          text-align: left;
          background: transparent;
          padding: 10px 0;
          color: inherit;
          font-size: 13px;
          border-bottom: 1px solid var(--border);
          display: block;
          width: 100%;
        }

        .history-item:last-child {
          border-bottom: none;
        }

        .history-item:hover,
        .history-item.active {
          color: var(--ink);
        }

        .history-title {
          font-weight: 400;
          font-size: 13px;
        }

        .history-meta {
          font-size: 11px;
          color: var(--muted);
          margin-top: 2px;
        }

        .middle {
          gap: 16px;
        }

        .upload-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .upload-row {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 12px;
          align-items: center;
        }

        .file-input {
          font-size: 12px;
          min-width: 0;
        }

        .upload-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
        }

        .doc-id {
          color: var(--muted);
          font-family: monospace;
        }

        .paper-view {
          flex: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .close-pdf {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 1;
        }

        .pdf-frame {
          width: 100%;
          height: 100%;
          border: none;
        }

        .empty {
          color: var(--muted);
          font-size: 13px;
        }

        .right {
          gap: 16px;
        }

        .tabs {
          display: flex;
          gap: 0;
          border-bottom: 1px solid var(--border);
        }

        .tab {
          flex: none;
          background: transparent;
          border: none;
          color: var(--muted);
          font-size: 12px;
          padding: 8px 12px;
          margin-bottom: -1px;
          border-bottom: 1px solid transparent;
        }

        .tab.active {
          color: var(--ink);
          border-bottom-color: var(--ink);
        }

        .tab-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chat-actions {
          display: flex;
          justify-content: flex-end;
        }

        textarea {
          border: none;
          border-bottom: 1px solid var(--border);
          padding: 8px 0;
          background: transparent;
          color: inherit;
          font-size: 13px;
          resize: vertical;
          line-height: 1.5;
        }

        .response {
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }

        .response-title {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 8px;
        }

        .response > div:last-child {
          font-size: 13px;
          line-height: 1.6;
        }

        .citation {
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }

        .citation:last-child {
          border-bottom: none;
        }

        .citation-head {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--muted);
          margin-bottom: 4px;
        }

        .citation-body {
          font-size: 13px;
          line-height: 1.5;
        }

        .muted {
          color: var(--muted);
          font-size: 13px;
        }

        @media (max-width: 1100px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .panel {
            min-height: auto;
          }
        }
      `}</style>
    </main>
  );
}
