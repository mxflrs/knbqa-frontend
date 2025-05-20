export interface ChainNode {
  id: string;
  type: string;
  content: string;
  metadata?: Record<string, any>;
}

export interface ChainEdge {
  source: string;
  target: string;
  label?: string;
}

export interface ChainTrace {
  nodes: ChainNode[];
  edges: ChainEdge[];
}

export interface QAResponse {
  id: string;
  question: string;
  answer: string;
  chain_trace: ChainTrace;
  created_at: string;
}

export interface DocumentResponse {
  id: string;
  title: string;
  created_at: string;
}
