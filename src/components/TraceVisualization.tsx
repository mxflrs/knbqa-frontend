import { ChainTrace } from "@/types";

export default function TraceVisualization({ trace }: { trace: ChainTrace }) {
  if (!trace) return null;
  return (
    <div className="bg-gray-50 p-2 rounded text-xs mt-2">
      <div className="font-semibold">Chain Trace:</div>
      <div className="flex flex-col gap-1">
        {trace.nodes.map(node => (
          <div key={node.id}>
            <span className="font-bold">{node.type}:</span> {node.content}
          </div>
        ))}
      </div>
    </div>
  );
}
