import { useMemo, useState } from "react";
import {
  Check,
  CheckCircle2,
  Clock3,
  DollarSign,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
} from "lucide-react";

import { models } from "../data/evaluationData";
import {
  getRecommendedModel,
  rankModels,
} from "../services/scoring";

function CompareModels() {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    models.slice(0, 3).map((model) => model.id)
  );

  const selectedModels = useMemo(
    () => models.filter((model) => selectedIds.includes(model.id)),
    [selectedIds]
  );

  const rankedModels = useMemo(
    () => rankModels(selectedModels),
    [selectedModels]
  );

  const recommendation = useMemo(
    () =>
      selectedModels.length > 0
        ? getRecommendedModel(selectedModels)
        : null,
    [selectedModels]
  );

  const toggleModel = (id: string) => {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        if (current.length === 2) {
          return current;
        }

        return current.filter((modelId) => modelId !== id);
      }

      if (current.length === 4) {
        return current;
      }

      return [...current, id];
    });
  };

  return (
    <div className="page compare-page">
      <header className="page-header">
        <div>
          <div className="eyebrow">
            <span>DECISION ANALYSIS</span>
            <span className="eyebrow-divider">/</span>
            <span>{selectedModels.length} models selected</span>
          </div>

          <h1>Compare models</h1>

          <p>
            Evaluate model tradeoffs across quality, reliability, risk,
            latency and cost.
          </p>
        </div>
      </header>

      <section className="compare-selector">
        <div className="compare-selector-heading">
          <div>
            <span className="section-kicker">COMPARISON SET</span>
            <h2>Select models</h2>
          </div>

          <span className="selector-hint">
            Select between 2 and 4 models
          </span>
        </div>

        <div className="model-selector-grid">
          {models.map((model) => {
            const selected = selectedIds.includes(model.id);

            return (
              <button
                type="button"
                key={model.id}
                className={`model-selector-card ${
                  selected ? "selected" : ""
                }`}
                onClick={() => toggleModel(model.id)}
              >
                <div className="selector-check">
                  {selected && <Check size={12} />}
                </div>

                <div>
                  <strong>{model.name}</strong>
                  <span>{model.provider}</span>
                </div>

                <small>{model.evaluations} runs</small>
              </button>
            );
          })}
        </div>
      </section>

      {recommendation && (
        <section className="decision-analysis-grid">
          <article className="decision-winner-card">
            <div className="decision-winner-top">
              <div className="decision-symbol">
                <Sparkles size={17} />
              </div>

              <div>
                <span className="section-kicker">
                  RECOMMENDED MODEL
                </span>
                <h2>{recommendation.model.name}</h2>
                <p>{recommendation.model.provider}</p>
              </div>

              <div className="decision-score">
                <strong>
                  {recommendation.model.calculatedScore}
                </strong>
                <span>/100</span>
              </div>
            </div>

            <p className="decision-summary">
              AgentBench selected this model using the current weighted
              evaluation policy across six production metrics.
            </p>

            <div className="decision-reason-list">
              {recommendation.reasons.map((reason) => (
                <div key={reason}>
                  <CheckCircle2 size={13} />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="tradeoff-card">
            <div>
              <span className="section-kicker">
                TRADEOFF ANALYSIS
              </span>
              <h2>What you give up</h2>
            </div>

            <div className="tradeoff-list">
              {recommendation.tradeoffs.length > 0 ? (
                recommendation.tradeoffs.map((tradeoff) => (
                  <div key={tradeoff}>
                    <TriangleAlert size={13} />
                    <span>{tradeoff}</span>
                  </div>
                ))
              ) : (
                <div>
                  <CheckCircle2 size={13} />
                  <span>
                    No major tradeoffs detected against the selected
                    comparison set.
                  </span>
                </div>
              )}
            </div>

            <div className="policy-note">
              <Scale size={14} />

              <div>
                <strong>Current decision policy</strong>
                <span>
                  Quality 30% · Accuracy 20% · Reliability 25% ·
                  Hallucination 15% · Latency 5% · Cost 5%
                </span>
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="comparison-panel">
        <div className="comparison-panel-heading">
          <div>
            <span className="section-kicker">SIDE-BY-SIDE</span>
            <h2>Performance matrix</h2>
          </div>

          <span>
            Overall scores are calculated by the AgentBench scoring
            engine.
          </span>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>METRIC</th>

                {rankedModels.map((model, index) => (
                  <th key={model.id}>
                    <div className="comparison-model-heading">
                      <span>{model.provider}</span>
                      <strong>{model.name}</strong>

                      {index === 0 && (
                        <small>RECOMMENDED</small>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr className="overall-row">
                <td>
                  <div className="metric-name">
                    <Sparkles size={14} />
                    Overall score
                  </div>
                </td>

                {rankedModels.map((model) => (
                  <td key={model.id}>
                    <strong className="matrix-score">
                      {model.calculatedScore}
                    </strong>
                    <span className="matrix-unit"> / 100</span>
                  </td>
                ))}
              </tr>

              <tr>
                <td>
                  <div className="metric-name">
                    <Target size={14} />
                    Quality
                  </div>
                </td>

                {rankedModels.map((model) => (
                  <td key={model.id}>{model.quality}%</td>
                ))}
              </tr>

              <tr>
                <td>
                  <div className="metric-name">
                    <CheckCircle2 size={14} />
                    Accuracy
                  </div>
                </td>

                {rankedModels.map((model) => (
                  <td key={model.id}>{model.accuracy}%</td>
                ))}
              </tr>

              <tr>
                <td>
                  <div className="metric-name">
                    <ShieldCheck size={14} />
                    Reliability
                  </div>
                </td>

                {rankedModels.map((model) => (
                  <td key={model.id}>{model.reliability}%</td>
                ))}
              </tr>

              <tr>
                <td>
                  <div className="metric-name">
                    <TriangleAlert size={14} />
                    Hallucination risk
                  </div>
                </td>

                {rankedModels.map((model) => (
                  <td key={model.id}>{model.hallucination}%</td>
                ))}
              </tr>

              <tr>
                <td>
                  <div className="metric-name">
                    <Clock3 size={14} />
                    Latency
                  </div>
                </td>

                {rankedModels.map((model) => (
                  <td key={model.id}>{model.latency}s</td>
                ))}
              </tr>

              <tr>
                <td>
                  <div className="metric-name">
                    <DollarSign size={14} />
                    Cost / request
                  </div>
                </td>

                {rankedModels.map((model) => (
                  <td key={model.id}>
                    ${model.cost.toFixed(4)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="score-breakdown-section">
        <div className="score-breakdown-heading">
          <span className="section-kicker">
            SCORING ENGINE
          </span>
          <h2>Weighted score contribution</h2>
          <p>
            See how each evaluation dimension contributes to the final
            recommendation.
          </p>
        </div>

        <div className="breakdown-grid">
          {rankedModels.map((model, index) => (
            <article className="breakdown-card" key={model.id}>
              <div className="breakdown-card-heading">
                <div>
                  <span>
                    {index === 0
                      ? "RANK 01 · RECOMMENDED"
                      : `RANK 0${index + 1}`}
                  </span>
                  <h3>{model.name}</h3>
                </div>

                <strong>{model.calculatedScore}</strong>
              </div>

              <BreakdownBar
                label="Quality"
                value={model.scoreBreakdown.quality}
                maximum={30}
              />

              <BreakdownBar
                label="Accuracy"
                value={model.scoreBreakdown.accuracy}
                maximum={20}
              />

              <BreakdownBar
                label="Reliability"
                value={model.scoreBreakdown.reliability}
                maximum={25}
              />

              <BreakdownBar
                label="Hallucination"
                value={model.scoreBreakdown.hallucination}
                maximum={15}
              />

              <BreakdownBar
                label="Latency"
                value={model.scoreBreakdown.latency}
                maximum={5}
              />

              <BreakdownBar
                label="Cost"
                value={model.scoreBreakdown.cost}
                maximum={5}
              />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function BreakdownBar({
  label,
  value,
  maximum,
}: {
  label: string;
  value: number;
  maximum: number;
}) {
  const percentage = Math.min(100, (value / maximum) * 100);

  return (
    <div className="breakdown-row">
      <div className="breakdown-label">
        <span>{label}</span>
        <strong>
          {value.toFixed(1)}
          <small> / {maximum}</small>
        </strong>
      </div>

      <div className="breakdown-track">
        <span style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export default CompareModels;