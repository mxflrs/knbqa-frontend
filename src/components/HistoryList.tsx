"use client";
import { useEffect, useState } from "react";
import { fetchHistory } from "@/services/api";
import { QAResponse } from "@/types";
import AnswerCard from "./AnswerCard";

export default function HistoryList() {
  const [history, setHistory] = useState<QAResponse[]>([]);
  useEffect(() => {
    fetchHistory().then(setHistory);
  }, []);
  if (!history.length) return null;
  return (
    <div className="my-6">
      <h3 className="font-bold mb-2">Past Questions</h3>
      <div className="flex flex-col gap-4">
        {history.map(q => (
          <AnswerCard answer={q} key={q.id} />
        ))}
      </div>
    </div>
  );
}
