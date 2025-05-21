import { AskQuestionParams } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api/v1";

export async function askQuestion({ question, stream, onToken, onTrace }: AskQuestionParams) {
  const res = await fetch(`${BASE_URL}/qa/ask`, {
    method: "POST",
    body: JSON.stringify({ question, stream }),
    headers: { "Content-Type": "application/json" },
  });

  if (stream) {
    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (let line of lines) {
        if (!line.trim()) continue;
        const msg = JSON.parse(line);

        if (msg.type === "chain_visualization" && onTrace) onTrace(msg.data);
        if (msg.type === "token" && onToken) onToken(msg.data);
      }
    }
  } else {
    const data = await res.json();
    if (onTrace) onTrace(data.chain_trace);
    if (onToken) onToken(data.answer);
    return data;
  }
}

export async function fetchHistory() {
  const res = await fetch(`${BASE_URL}/qa/history`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return await res.json();
}

export async function uploadDocument(file: File, title: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);

  const res = await fetch(`${BASE_URL}/documents/`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload document");
  return await res.json();
}

