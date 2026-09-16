import type { ModelEvaluation } from "../data/evaluationData";

export type ScoreWeights = {
  quality: number;
  accuracy: number;
  reliability: number;
  hallucination: number;
  latency: number;
  cost: number;
};

export type ScoredModel = ModelEvaluation & {
  calculatedScore: number;
  scoreBreakdown: {
    quality: number;
    accuracy: number;
    reliability: number;
    hallucination: number;
    latency: number;
    cost: number;
  };
};

export type Recommendation = {
  model: ScoredModel;
  reasons: string[];
  tradeoffs: string[];
};

export const DEFAULT_WEIGHTS: ScoreWeights = {
  quality: 0.3,
  accuracy: 0.2,
  reliability: 0.25,
  hallucination: 0.15,
  latency: 0.05,
  cost: 0.05,
};

/*
  Hallucination risk:
  0% = perfect score
  20%+ = 0 score
*/
function scoreHallucinationRisk(risk: number): number {
  return Math.max(0, Math.min(100, 100 - risk * 5));
}

/*
  Latency:
  <= 0.5s = 100
  >= 5s = 0
*/
function scoreLatency(latency: number): number {
  if (latency <= 0.5) return 100;
  if (latency >= 5) return 0;

  return ((5 - latency) / 4.5) * 100;
}

/*
  Cost:
  <= $0.001/request = 100
  >= $0.01/request = 0
*/
function scoreCost(cost: number): number {
  if (cost <= 0.001) return 100;
  if (cost >= 0.01) return 0;

  return ((0.01 - cost) / 0.009) * 100;
}

export function calculateModelScore(
  model: ModelEvaluation,
  weights: ScoreWeights = DEFAULT_WEIGHTS
): ScoredModel {
  const hallucinationScore = scoreHallucinationRisk(
    model.hallucination
  );

  const latencyScore = scoreLatency(model.latency);
  const costScore = scoreCost(model.cost);

  const scoreBreakdown = {
    quality: model.quality * weights.quality,
    accuracy: model.accuracy * weights.accuracy,
    reliability: model.reliability * weights.reliability,
    hallucination:
      hallucinationScore * weights.hallucination,
    latency: latencyScore * weights.latency,
    cost: costScore * weights.cost,
  };

  const calculatedScore =
    scoreBreakdown.quality +
    scoreBreakdown.accuracy +
    scoreBreakdown.reliability +
    scoreBreakdown.hallucination +
    scoreBreakdown.latency +
    scoreBreakdown.cost;

  return {
    ...model,
    calculatedScore: Number(calculatedScore.toFixed(1)),
    scoreBreakdown,
  };
}

export function rankModels(
  models: ModelEvaluation[],
  weights: ScoreWeights = DEFAULT_WEIGHTS
): ScoredModel[] {
  return models
    .map((model) => calculateModelScore(model, weights))
    .sort(
      (first, second) =>
        second.calculatedScore - first.calculatedScore
    );
}

export function getRecommendedModel(
  models: ModelEvaluation[],
  weights: ScoreWeights = DEFAULT_WEIGHTS
): Recommendation {
  const rankedModels = rankModels(models, weights);
  const winner = rankedModels[0];

  const bestQuality = Math.max(
    ...models.map((model) => model.quality)
  );

  const bestReliability = Math.max(
    ...models.map((model) => model.reliability)
  );

  const lowestHallucination = Math.min(
    ...models.map((model) => model.hallucination)
  );

  const lowestLatency = Math.min(
    ...models.map((model) => model.latency)
  );

  const lowestCost = Math.min(
    ...models.map((model) => model.cost)
  );

  const reasons: string[] = [];
  const tradeoffs: string[] = [];

  if (winner.quality === bestQuality) {
    reasons.push(
      `Highest quality score in the benchmark at ${winner.quality}%.`
    );
  } else if (winner.quality >= bestQuality - 3) {
    reasons.push(
      `Quality remains within ${(
        bestQuality - winner.quality
      ).toFixed(0)} points of the benchmark leader.`
    );
  }

  if (winner.reliability === bestReliability) {
    reasons.push(
      `Highest reliability score at ${winner.reliability}%.`
    );
  }

  if (winner.hallucination === lowestHallucination) {
    reasons.push(
      `Lowest hallucination risk at ${winner.hallucination}%.`
    );
  }

  if (winner.latency === lowestLatency) {
    reasons.push(
      `Fastest response time at ${winner.latency}s.`
    );
  }

  if (winner.cost === lowestCost) {
    reasons.push(
      `Lowest request cost at $${winner.cost.toFixed(4)}.`
    );
  }

  if (winner.latency > lowestLatency) {
    tradeoffs.push(
      `${winner.name} is ${(
        winner.latency - lowestLatency
      ).toFixed(1)}s slower than the fastest model.`
    );
  }

  if (winner.cost > lowestCost) {
    const costDifference =
      ((winner.cost - lowestCost) / lowestCost) * 100;

    tradeoffs.push(
      `Request cost is ${costDifference.toFixed(
        0
      )}% higher than the lowest-cost model.`
    );
  }

  if (winner.hallucination > lowestHallucination) {
    tradeoffs.push(
      `Hallucination risk is ${(
        winner.hallucination - lowestHallucination
      ).toFixed(1)} points above the lowest-risk model.`
    );
  }

  return {
    model: winner,
    reasons,
    tradeoffs,
  };
}