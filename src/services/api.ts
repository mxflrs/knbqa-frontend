const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api/v1";

export async function askQuestion(question: string, stream = false) {
  const res = await fetch(`${BASE_URL}/qa/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, stream }),
  });
  if (!res.ok) throw new Error("Failed to fetch answer");
  return await res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${BASE_URL}/qa/history`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return await res.json();
}

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE_URL}/documents/`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload document");
  return await res.json();
}
