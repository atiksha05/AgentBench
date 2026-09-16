import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock3,
  DollarSign,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { models } from "../data/evaluationData";

function Models() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <div className="eyebrow">
            <span>MODEL REGISTRY</span>
            <span className="eyebrow-divider">/</span>
            <span>{models.length} active models</span>
          </div>

          <h1>Models</h1>

          <p>
            Compare model performance, reliability, risk, latency and inference
            economics.
          </p>
        </div>

        <button className="primary-button">
          <Bot size={15} />
          Add model
        </button>
      </header>

      <section className="model-summary-strip">
        <div>
          <span>TOP OVERALL</span>
          <strong>GPT-5 Mini</strong>
          <small>92 / 100</small>
        </div>

        <div>
          <span>LOWEST LATENCY</span>
          <strong>Gemini Flash</strong>
          <small>0.9 seconds</small>
        </div>

        <div>
          <span>LOWEST COST</span>
          <strong>Llama 4</strong>
          <small>$0.0012 / request</small>
        </div>

        <div>
          <span>BEST RELIABILITY</span>
          <strong>GPT-5 Mini</strong>
          <small>96%</small>
        </div>
      </section>

      <section className="models-list">
        <div className="models-list-header">
          <span>MODEL</span>
          <span>QUALITY</span>
          <span>RELIABILITY</span>
          <span>RISK</span>
          <span>LATENCY</span>
          <span>COST / REQ</span>
          <span>SCORE</span>
          <span />
        </div>

        {models.map((model) => (
          <article className="model-row-card" key={model.id}>
            <div className="model-main-info">
              <div className="registry-avatar">{model.name.charAt(0)}</div>

              <div>
                <div className="model-title-line">
                  <strong>{model.name}</strong>

                  <span
                    className={`model-status ${
                      model.status === "Production" ? "production" : "testing"
                    }`}
                  >
                    {model.status}
                  </span>
                </div>

                <span>{model.provider}</span>

                <p>{model.description}</p>
              </div>
            </div>

            <div className="registry-metric">
              <span>
                <CheckCircle2 size={13} />
                Quality
              </span>
              <strong>{model.quality}%</strong>
            </div>

            <div className="registry-metric">
              <span>
                <ShieldCheck size={13} />
                Reliability
              </span>
              <strong>{model.reliability}%</strong>
            </div>

            <div className="registry-metric">
              <span>
                <TriangleAlert size={13} />
                Hallucination
              </span>
              <strong>{model.hallucination}%</strong>
            </div>

            <div className="registry-metric">
              <span>
                <Clock3 size={13} />
                Latency
              </span>
              <strong>{model.latency}s</strong>
            </div>

            <div className="registry-metric">
              <span>
                <DollarSign size={13} />
                Request
              </span>
              <strong>${model.cost.toFixed(4)}</strong>
            </div>

            <div className="registry-score">
              <strong>{model.score}</strong>
              <span>/100</span>
            </div>

            <button className="row-action" aria-label={`Open ${model.name}`}>
              <ArrowUpRight size={15} />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Models;