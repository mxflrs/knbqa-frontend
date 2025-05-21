"use client";
import { useState } from "react";
import { askQuestion } from "@/services/api";
import AnswerCard from "./AnswerCard";
import Loader from "./Loader";
import { ChainTrace, QAResponse } from "@/types";
import TraceVisualization from "@/components/TraceVisualization";

export default function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState(false);
  const [liveAnswer, setLiveAnswer] = useState("");
  const [trace, setTrace] = useState<ChainTrace | null>(null);
  const [finalAnswer, setFinalAnswer] = useState<QAResponse | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFinalAnswer(null);
    setLiveAnswer("");
    setTrace(null);

    try {
      if (stream) {
        await askQuestion({
          question,
          stream: true,
          onToken: (token: string) => setLiveAnswer(a => a + token),
          onTrace: (trace: ChainTrace) => setTrace(trace)
        });
      } else {
        const res = await askQuestion({ question, stream: false });
        setFinalAnswer(res);
        setTrace(res.chain_trace);
        setLiveAnswer(res.answer);
      }
    } catch (err) {
      setLiveAnswer("Something went wrong.");
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
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={stream} onChange={e => setStream(e.target.checked)} />
        Enable streaming response
      </label>

      {loading && !stream && <Loader />}

      {/* STREAMING UI */}
      {stream && (liveAnswer || loading) && (
        <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-2 mt-2">
          <div>
            <span className="font-bold">A:</span> {liveAnswer}
          </div>
          {trace && <TraceVisualization trace={trace} />}
          {loading && <div className="text-xs text-gray-500">Loading...</div>}
        </div>
      )}

      {/* NON-STREAM UI */}
      {!stream && finalAnswer && <AnswerCard answer={finalAnswer} />}
    </div>
  );
}
