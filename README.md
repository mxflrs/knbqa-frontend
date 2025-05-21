# Knowledge Base Frontend (Next.js)

This is the **frontend** for the Knowledge Base Q&A web application. It is built with **Next.js 14+** and **Tailwind CSS**. The frontend lets users upload documents, ask questions, stream answers, and visualize the chain-of-thought used to answer each question.

---

## Features

- Upload `.txt` and `.md` documents.
- Ask questions about ingested documents.
- Stream answer tokens as they are generated (optional).
- Visualize answer reasoning (which contexts were used).
- View Q&A history.
- Toggle context visibility and delete Q&A records.

---

## Setup Instructions

### Prerequisites

- Node.js v20+
- Backend API (FastAPI) running (see backend/README.md)

### Getting Started

```bash
cd frontend
npm install

# Copy and update environment variables
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL to your backend, e.g.:
# NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
