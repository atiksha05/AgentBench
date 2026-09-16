import { useMemo, useState } from "react";
import {
  CheckCircle2,
  FlaskConical,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
} from "lucide-react";

import { models } from "../data/evaluationData";
import { calculateModelScore } from "../services/scoring";

const testSuites = [
  {
    id: "support",
    name: "Support Agent",
    description: "Tests answer quality, reliability and safety.",
  },
  {
    id: "rag",
    name: "RAG Answer Quality",
    description: "Tests grounded answers and hallucination risk.",
  },
  {
    id: "routing",
    name: "Intent Routing",
    description: "Tests classification accuracy and consistency.",
  },
  {
    id: "stress",
    name: "Hallucination Stress Test",
    description: "Tests behavior under ambiguous prompts.",
  },
];

function NewEvaluation() {
  const [modelId, setModelId] = useState(models[0].id);
  const [suiteId, setSuiteId] = useState(testSuites[0].id);
  const [hasRun, setHasRun] = useState(false);

  const selectedModel = useMemo(
    () => models.find((model) => model.id === modelId) ?? models[0],
    [modelId]
  );

  const selectedSuite = useMemo(
    () =>
      testSuites.find((suite) => suite.id === suiteId) ??
      testSuites[0],
    [suiteId]
  );

  const result = useMemo(
    () => calculateModelScore(selectedModel),
    [selectedModel]
  );

  const runEvaluation = () => {
    setHasRun(false);

    window.setTimeout(() => {
      setHasRun(true);
    }, 350);
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <div className="eyebrow">
            <span>EVALUATION ENGINE</span>
            <span className="eyebrow-divider">/</span>
            <span>New run</span>
          </div>

          <h1>New evaluation</h1>

          <p>
            Configure a benchmark run and evaluate a model against the
            current AgentBench scoring policy.
          </p>
        </div>
      </header>

      <div className="new-evaluation-grid">
        <section className="evaluation-config-panel">
          <div className="evaluation-config-heading">
            <span className="section-kicker">CONFIGURATION</span>
            <h2>Evaluation setup</h2>
          </div>

          <div className="config-section">
            <label>MODEL</label>

            <div className="evaluation-option-grid">
              {models.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => {
                    setModelId(model.id);
                    setHasRun(false);
                  }}
                  className={`evaluation-option ${
                    modelId === model.id ? "selected" : ""
                  }`}
                >
                  <div>
                    <strong>{model.name}</strong>
                    <span>{model.provider}</span>
                  </div>

                  {modelId === model.id && (
                    <CheckCircle2 size={15} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="config-section">
            <label>TEST SUITE</label>

            <div className="suite-list">
              {testSuites.map((suite) => (
                <button
                  type="button"
                  key={suite.id}
                  onClick={() => {
                    setSuiteId(suite.id);
                    setHasRun(false);
                  }}
                  className={`suite-option ${
                    suiteId === suite.id ? "selected" : ""
                  }`}
                >
                  <FlaskConical size={15} />

                  <div>
                    <strong>{suite.name}</strong>
                    <span>{suite.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="run-evaluation-button"
            onClick={runEvaluation}
          >
            <Play size={15} />
            Run evaluation
          </button>
        </section>

        <section className="evaluation-preview-panel">
          <span className="section-kicker">RUN PREVIEW</span>

          <h2>{selectedModel.name}</h2>
          <p>{selectedSuite.name}</p>

          {!hasRun ? (
            <div className="evaluation-awaiting">
              <FlaskConical size={24} />

              <strong>Ready to evaluate</strong>

              <span>
                Run the benchmark to calculate the weighted model score.
              </span>
            </div>
          ) : (
            <div className="evaluation-result">
              <div className="result-status">
                <div>
                  <Sparkles size={16} />
                  <span>EVALUATION COMPLETE</span>
                </div>

                <strong>{result.calculatedScore}</strong>
                <small>/100 overall score</small>
              </div>

              <div className="result-metrics">
                <ResultMetric
                  icon={Target}
                  label="Quality"
                  value={`${result.quality}%`}
                />

                <ResultMetric
                  icon={CheckCircle2}
                  label="Accuracy"
                  value={`${result.accuracy}%`}
                />

                <ResultMetric
                  icon={ShieldCheck}
                  label="Reliability"
                  value={`${result.reliability}%`}
                />

                <ResultMetric
                  icon={TriangleAlert}
                  label="Hallucination"
                  value={`${result.hallucination}%`}
                />
              </div>

              <div className="result-decision">
                <CheckCircle2 size={15} />

                <div>
                  <strong>
                    {result.calculatedScore >= 85
                      ? "Production threshold passed"
                      : "Manual review recommended"}
                  </strong>

                  <span>
                    AgentBench calculated this result using the weighted
                    evaluation policy.
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ResultMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div>
      <span>
        <Icon size={13} />
        {label}
      </span>

      <strong>{value}</strong>
    </div>
  );
}

export default NewEvaluation;