import DocumentUploader from "@/components/DocumentUploader";
import QuestionForm from "@/components/QuestionForm";
import HistoryList from "@/components/HistoryList";

export default function Home() {
  return (
    <main className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Knowledge Base Q&A</h1>
      <DocumentUploader />
      <div className="mt-6">
        <QuestionForm />
      </div>
      <HistoryList />
    </main>
  );
}
