"use client";
import { useState } from "react";
import { askQuestion } from "@/services/api";
import AnswerCard from "./AnswerCard";
import Loader from "./Loader";
import { QAResponse } from "@/types";

export default function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<QAResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnswer(null);
    try {
      const res = await askQuestion(question);
      setAnswer(res);
    } catch (err) {
      setAnswer(null);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask a question about your documents..."
          className="input flex-1"
        />
        <button className="btn" disabled={loading || !question.trim()}>
          Ask
        </button>
      </form>
      {loading && <Loader />}
      {answer && <AnswerCard answer={answer} />}
    </div>
  );
}
