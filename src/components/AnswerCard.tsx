import { QAResponse } from "@/types";
import TraceVisualization from "./TraceVisualization";

export default function AnswerCard({ answer }: { answer: QAResponse }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
      <div>
        <span className="font-bold">Q:</span> {answer.question}
      </div>
      <div>
        <span className="font-bold">A:</span> {answer.answer}
      </div>
      <TraceVisualization trace={answer.chain_trace} />
      <div className="text-xs text-gray-400 mt-2">{new Date(answer.created_at).toLocaleString()}</div>
    </div>
  );
}
