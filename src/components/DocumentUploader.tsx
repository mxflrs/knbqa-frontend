"use client";
import { useRef, useState } from "react";
import { uploadDocument } from "@/services/api";
import { cn } from "@/utils/classnames";

export default function DocumentUploader({ onUpload }: { onUpload?: () => void }) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInput.current?.files?.[0];
    if (!file || !title) {
      setMsg("Please provide both a file and a title.");
      return;
    }
    setLoading(true);
    setMsg(null);
    try {
      await uploadDocument(file, title);
      setMsg("Upload successful!");
      setTitle("");
      if (fileInput.current) {
        fileInput.current.value = "";
      }
      onUpload?.();
    } catch {
      setMsg("Upload failed.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleUpload} className="flex flex-col gap-2 p-4 bg-gray-100 rounded-xl">
      <label className="text-sm font-medium">Document title</label>
      <input
        type="text"
        className="mb-2 rounded text-black px-2 py-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        aria-label="title"
      />
      <label className="text-sm font-medium">Upload document</label>
      <input type="file" accept=".txt,.md" ref={fileInput} className="mb-2" aria-label="input" />
      <button type="submit" className={cn("btn", loading && "opacity-50 pointer-events-none")}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {msg && <p className="text-xs text-gray-400">{msg}</p>}
    </form>
  );
}
