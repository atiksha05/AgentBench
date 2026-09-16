import {
  Activity,
  CheckCircle2,
  Clock3,
  DollarSign,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  evaluationRuns,
  models,
} from "../data/evaluationData";

import { rankModels } from "../services/scoring";

function Analytics() {
  const rankedModels = rankModels(models);

  const passedRuns = evaluationRuns.filter(
    (run) => run.status === "Passed"
  ).length;

  const passRate =
    (passedRuns / evaluationRuns.length) * 100;

  const averageScore =
    rankedModels.reduce(
      (total, model) => total + model.calculatedScore,
      0
    ) / rankedModels.length;

  const averageLatency =
    models.reduce(
      (total, model) => total + model.latency,
      0
    ) / models.length;

  const averageHallucination =
    models.reduce(
      (total, model) => total + model.hallucination,
      0
    ) / models.length;

  const performanceData = rankedModels.map((model) => ({
    name: model.name,
    Quality: model.quality,
    Reliability: model.reliability,
    Score: model.calculatedScore,
  }));

  const efficiencyData = models.map((model) => ({
    name: model.name,
    Latency: model.latency,
    Cost: Number((model.cost * 1000).toFixed(2)),
  }));

  return (
    <div className="page analytics-page">
      <header className="page-header">
        <div>
          <div className="eyebrow">
            <span>PERFORMANCE ANALYTICS</span>
            <span className="eyebrow-divider">/</span>
            <span>Model intelligence</span>
          </div>

          <h1>Analytics</h1>

          <p>
            Analyze model performance, reliability, efficiency and
            deployment risk across AgentBench evaluations.
          </p>
        </div>
      </header>

      <section className="analytics-kpi-grid">
        <AnalyticsMetric
          icon={CheckCircle2}
          label="PASS RATE"
          value={`${passRate.toFixed(1)}%`}
          detail={`${passedRuns} of ${evaluationRuns.length} recent runs`}
        />

        <AnalyticsMetric
          icon={Activity}
          label="AVG MODEL SCORE"
          value={averageScore.toFixed(1)}
          detail="Weighted AgentBench score"
        />

        <AnalyticsMetric
          icon={Clock3}
          label="AVG LATENCY"
          value={`${averageLatency.toFixed(1)}s`}
          detail="Across configured models"
        />

        <AnalyticsMetric
          icon={TriangleAlert}
          label="AVG HALLUCINATION"
          value={`${averageHallucination.toFixed(1)}%`}
          detail="Lower is better"
        />
      </section>

      <section className="analytics-chart-grid">
        <article className="analytics-chart-card">
          <div className="analytics-card-heading">
            <div>
              <span className="section-kicker">
                PERFORMANCE
              </span>

              <h2>Model benchmark profile</h2>
            </div>

            <span>Quality · Reliability · Overall</span>
          </div>

          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{
                  top: 15,
                  right: 5,
                  left: -25,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="rgba(148,163,184,.08)"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#737d79",
                    fontSize: 9,
                  }}
                />

                <YAxis
                  domain={[60, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#5e6864",
                    fontSize: 9,
                  }}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(255,255,255,.025)",
                  }}
                  contentStyle={{
                    background: "#111516",
                    border: "1px solid #2a302f",
                    borderRadius: "4px",
                    color: "#e8e6df",
                    fontSize: "10px",
                  }}
                />

                <Bar
                  dataKey="Quality"
                  fill="#35b7a3"
                  radius={[2, 2, 0, 0]}
                />

                <Bar
                  dataKey="Reliability"
                  fill="#d4a75d"
                  radius={[2, 2, 0, 0]}
                />

                <Bar
                  dataKey="Score"
                  fill="#667476"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="analytics-legend">
            <span>
              <i className="analytics-quality-dot" />
              Quality
            </span>

            <span>
              <i className="analytics-reliability-dot" />
              Reliability
            </span>

            <span>
              <i className="analytics-score-dot" />
              Overall score
            </span>
          </div>
        </article>

        <article className="analytics-chart-card">
          <div className="analytics-card-heading">
            <div>
              <span className="section-kicker">
                EFFICIENCY
              </span>

              <h2>Latency & cost profile</h2>
            </div>

            <span>Operational tradeoffs</span>
          </div>

          <div className="efficiency-list">
            {efficiencyData.map((model) => (
              <div
                className="efficiency-row"
                key={model.name}
              >
                <div className="efficiency-model">
                  <strong>{model.name}</strong>
                </div>

                <div className="efficiency-metric">
                  <span>
                    <Clock3 size={12} />
                    LATENCY
                  </span>

                  <strong>{model.Latency}s</strong>
                </div>

                <div className="efficiency-metric">
                  <span>
                    <DollarSign size={12} />
                    COST / 1K
                  </span>

                  <strong>
                    ${model.Cost.toFixed(2)}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <div className="analytics-insight">
            <Activity size={14} />

            <div>
              <strong>Efficiency insight</strong>

              <span>
                Gemini Flash delivers the lowest latency while
                Llama 4 provides the lowest request cost in the
                current benchmark set.
              </span>
            </div>
          </div>
        </article>
      </section>

      <section className="analytics-model-table-card">
        <div className="analytics-card-heading">
          <div>
            <span className="section-kicker">
              MODEL INTELLIGENCE
            </span>

            <h2>Performance summary</h2>
          </div>

          <span>Ranked by calculated score</span>
        </div>

        <div className="table-wrapper">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>RANK</th>
                <th>MODEL</th>
                <th>PROVIDER</th>
                <th>QUALITY</th>
                <th>RELIABILITY</th>
                <th>HALLUCINATION</th>
                <th>LATENCY</th>
                <th>COST / REQUEST</th>
                <th>AGENTBENCH SCORE</th>
              </tr>
            </thead>

            <tbody>
              {rankedModels.map((model, index) => (
                <tr key={model.id}>
                  <td className="analytics-rank">
                    0{index + 1}
                  </td>

                  <td className="suite-name">
                    {model.name}
                  </td>

                  <td>{model.provider}</td>

                  <td>{model.quality}%</td>

                  <td>
                    <span className="analytics-good-value">
                      <ShieldCheck size={11} />
                      {model.reliability}%
                    </span>
                  </td>

                  <td>{model.hallucination}%</td>

                  <td>{model.latency}s</td>

                  <td>
                    ${model.cost.toFixed(4)}
                  </td>

                  <td>
                    <strong className="analytics-final-score">
                      {model.calculatedScore}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function AnalyticsMetric({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="analytics-kpi">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>

      <div className="analytics-kpi-icon">
        <Icon size={16} />
      </div>
    </article>
  );
}

export default Analytics;