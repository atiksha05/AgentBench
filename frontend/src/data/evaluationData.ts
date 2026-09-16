export type ModelEvaluation = {
  id: string;
  name: string;
  provider: string;
  description: string;
  quality: number;
  accuracy: number;
  reliability: number;
  hallucination: number;
  latency: number;
  cost: number;
  score: number;
  evaluations: number;
  status: "Production" | "Testing";
};

export type EvaluationRun = {
  id: string;
  suite: string;
  model: string;
  score: number;
  quality: number;
  reliability: number;
  hallucination: number;
  latency: number;
  cost: number;
  status: "Passed" | "Review";
  time: string;
};

export const models: ModelEvaluation[] = [
  {
    id: "gpt-5-mini",
    name: "GPT-5 Mini",
    provider: "OpenAI",
    description:
      "High-quality general-purpose model optimized for reasoning and production AI workflows.",
    quality: 94,
    accuracy: 93,
    reliability: 96,
    hallucination: 3.8,
    latency: 1.4,
    cost: 0.0028,
    score: 92,
    evaluations: 384,
    status: "Production",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet",
    provider: "Anthropic",
    description:
      "Strong reasoning model with reliable instruction following and long-context performance.",
    quality: 93,
    accuracy: 92,
    reliability: 94,
    hallucination: 4.1,
    latency: 1.8,
    cost: 0.0034,
    score: 89,
    evaluations: 312,
    status: "Production",
  },
  {
    id: "gemini-flash",
    name: "Gemini Flash",
    provider: "Google",
    description:
      "Fast multimodal model designed for high-throughput and latency-sensitive AI products.",
    quality: 88,
    accuracy: 87,
    reliability: 91,
    hallucination: 5.2,
    latency: 0.9,
    cost: 0.0019,
    score: 86,
    evaluations: 297,
    status: "Production",
  },
  {
    id: "llama-4",
    name: "Llama 4",
    provider: "Meta",
    description:
      "Open-weight model offering flexible deployment and attractive inference economics.",
    quality: 85,
    accuracy: 84,
    reliability: 88,
    hallucination: 6.4,
    latency: 1.1,
    cost: 0.0012,
    score: 82,
    evaluations: 255,
    status: "Testing",
  },
];

export const evaluationRuns: EvaluationRun[] = [
  {
    id: "EV-1048",
    suite: "Support Agent — Production",
    model: "GPT-5 Mini",
    score: 92,
    quality: 94,
    reliability: 96,
    hallucination: 3.8,
    latency: 1.4,
    cost: 0.0028,
    status: "Passed",
    time: "8 min ago",
  },
  {
    id: "EV-1047",
    suite: "RAG Answer Quality",
    model: "Claude Sonnet",
    score: 89,
    quality: 93,
    reliability: 94,
    hallucination: 4.1,
    latency: 1.8,
    cost: 0.0034,
    status: "Passed",
    time: "34 min ago",
  },
  {
    id: "EV-1046",
    suite: "Customer Intent Routing",
    model: "Gemini Flash",
    score: 86,
    quality: 88,
    reliability: 91,
    hallucination: 5.2,
    latency: 0.9,
    cost: 0.0019,
    status: "Passed",
    time: "1 hr ago",
  },
  {
    id: "EV-1045",
    suite: "Hallucination Stress Test",
    model: "Llama 4",
    score: 74,
    quality: 82,
    reliability: 84,
    hallucination: 9.1,
    latency: 1.2,
    cost: 0.0012,
    status: "Review",
    time: "3 hrs ago",
  },
  {
    id: "EV-1044",
    suite: "Tool Use Reliability",
    model: "GPT-5 Mini",
    score: 94,
    quality: 95,
    reliability: 97,
    hallucination: 3.1,
    latency: 1.5,
    cost: 0.003,
    status: "Passed",
    time: "Yesterday",
  },
  {
    id: "EV-1043",
    suite: "Knowledge Grounding",
    model: "Claude Sonnet",
    score: 91,
    quality: 94,
    reliability: 95,
    hallucination: 3.7,
    latency: 1.9,
    cost: 0.0035,
    status: "Passed",
    time: "Yesterday",
  },
];