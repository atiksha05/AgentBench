# AgentBench

**AI Evaluation Platform for Comparing LLMs and AI Agents**

AgentBench is an AI evaluation and decision-support platform designed to help product and engineering teams compare AI models across quality, accuracy, reliability, hallucination risk, latency, and cost.

Instead of selecting an AI model based on a single benchmark, AgentBench provides a weighted evaluation framework that makes model tradeoffs visible and helps teams make more informed deployment decisions.

---

## Problem

Choosing an AI model for a production application involves multiple competing factors.

A model may provide excellent response quality but have higher latency or inference cost. Another model may be faster and cheaper while introducing greater hallucination or reliability risk.

Teams therefore need a way to evaluate models across several dimensions rather than relying on a single metric.

AgentBench was built to explore this problem.

---

## Key Features

### Model Registry

Compare AI models using standardized metrics including:

- Quality
- Accuracy
- Reliability
- Hallucination risk
- Latency
- Cost
- Evaluation history

### Model Comparison

Select multiple models and compare their performance side by side.

AgentBench dynamically ranks selected models using a weighted scoring system and surfaces both strengths and tradeoffs.

### Weighted Evaluation Engine

The evaluation engine calculates an overall model score using:

- Quality — 30%
- Accuracy — 20%
- Reliability — 25%
- Hallucination risk — 15%
- Latency — 5%
- Cost — 5%

Metrics such as latency, cost, and hallucination risk are normalized before being incorporated into the final score.

### Evaluation Workflow

Users can configure an evaluation by selecting:

- AI model
- Evaluation suite
- Benchmark scenario

The platform calculates the model's weighted score and determines whether the result meets the configured production threshold.

### Evaluation History

AgentBench provides visibility into previous benchmark runs, including:

- Evaluation suite
- Model
- Overall score
- Reliability
- Hallucination risk
- Latency
- Cost
- Pass/review status

### Analytics

The analytics dashboard provides cross-model visibility into:

- Evaluation pass rate
- Average model score
- Average latency
- Average hallucination risk
- Model quality and reliability
- Cost and latency tradeoffs
- Overall model ranking

---

## Scoring Methodology

AgentBench calculates a weighted model score:

```text
Score =
(Quality × 0.30)
+ (Accuracy × 0.20)
+ (Reliability × 0.25)
+ (Hallucination Score × 0.15)
+ (Latency Score × 0.05)
+ (Cost Score × 0.05)
```

Lower-is-better metrics such as hallucination risk, latency, and cost are converted into normalized scores before weighting.

This creates a single comparable score while preserving the underlying metrics so teams can understand the tradeoffs behind the recommendation.

---

## Product Decisions

AgentBench was designed around several product principles:

**Multi-metric evaluation**

AI model selection should not depend on a single benchmark.

**Explainable recommendations**

The platform shows why a model is recommended and exposes its tradeoffs rather than presenting only a final score.

**Deployment-oriented metrics**

Quality is important, but production AI systems must also consider reliability, hallucination risk, latency, and cost.

**Reproducible MVP**

The current version uses seeded benchmark data so evaluation behavior remains deterministic and reproducible without requiring paid model APIs.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Recharts
- Lucide React
- Custom CSS

### Evaluation Logic

- TypeScript scoring engine
- Weighted model ranking
- Metric normalization
- Recommendation and tradeoff analysis

---

## Architecture

```text
AgentBench
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── data
│   │   │   └── evaluationData.ts
│   │   ├── pages
│   │   │   ├── Models.tsx
│   │   │   ├── Evaluations.tsx
│   │   │   ├── CompareModels.tsx
│   │   │   ├── NewEvaluation.tsx
│   │   │   └── Analytics.tsx
│   │   ├── services
│   │   │   └── scoring.ts
│   │   ├── App.tsx
│   │   └── App.css
│   │
│   └── package.json
│
└── README.md
```

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/atiksha05/AgentBench.git
cd AgentBench/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

---

## Current MVP

The current AgentBench MVP includes:

- AI model registry
- Evaluation history
- Multi-model comparison
- Dynamic weighted scoring
- Model recommendation engine
- Tradeoff analysis
- New evaluation workflow
- Production threshold decisions
- Performance analytics
- Responsive AI infrastructure dashboard

---

## Future Improvements

Potential future extensions include:

- Live model API evaluations
- Custom benchmark datasets
- User-defined scoring weights
- Prompt-level evaluation traces
- LLM-as-a-judge evaluation
- RAG evaluation
- Experiment persistence
- Evaluation APIs
- Team workspaces
- Production monitoring integrations

---

## Why I Built AgentBench

As AI products increasingly depend on multiple foundation models, choosing the right model becomes a product and engineering decision rather than simply a model-quality decision.

I built AgentBench to explore how AI teams can make those decisions more systematic, measurable, and explainable by balancing model quality with reliability, risk, latency, and cost.