import {
  Activity,
  BarChart3,
  Bot,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Database,
  FlaskConical,
  Gauge,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
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
  BrowserRouter,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";

import Models from "./pages/Models";
import Evaluations from "./pages/Evaluations";
import NewEvaluation from "./pages/NewEvaluation";
import CompareModels from "./pages/CompareModels";
import Analytics from "./pages/Analytics";
import { evaluationRuns, models } from "./data/evaluationData";

function Sidebar() {
  const navigation = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      label: "Models",
      icon: Bot,
      path: "/models",
    },
    {
      label: "Evaluations",
      icon: FlaskConical,
      path: "/evaluations",
    },
    {
      label: "Datasets",
      icon: Database,
      path: "/datasets",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <Activity size={18} />
        </div>

        <div>
          <strong>AgentBench</strong>
          <span>Evaluation Console</span>
        </div>
      </div>

      <div className="workspace-switcher">
        <span className="workspace-avatar">AB</span>

        <div>
          <strong>AgentBench</strong>
          <span>Development</span>
        </div>

        <MoreHorizontal size={17} />
      </div>

      <nav>
        <p className="nav-heading">WORKSPACE</p>

        {navigation.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={17} />
          <span>Settings</span>
        </button>

        <div className="engine-status">
          <span className="status-dot" />

          <div>
            <strong>Evaluation engine</strong>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ElementType;
}) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span>{label}</span>

        <div className="metric-icon">
          <Icon size={17} />
        </div>
      </div>

      <strong className="metric-value">{value}</strong>
      <span className="metric-detail">{detail}</span>
    </article>
  );
}

function Dashboard() {
  const winner = models[0];

  const chartData = models.map((model) => ({
    name: model.name,
    Quality: model.quality,
    Reliability: model.reliability,
    Score: model.score,
  }));

  const recentRuns = evaluationRuns.slice(0, 4);

  return (
    <>
      <header className="topbar">
        <div>
          <div className="eyebrow">
            <span>OVERVIEW</span>
            <span className="eyebrow-divider">/</span>
            <span>Last 7 days</span>
          </div>

          <h1>Evaluation overview</h1>

          <p>
            Monitor model performance and make evidence-based deployment
            decisions.
          </p>
        </div>

        <div className="topbar-actions">
        <NavLink to="/compare" className="secondary-button button-link">            Compare models
          </NavLink>

          <NavLink
            to="/evaluations/new"
            className="primary-button button-link"
          >
            <Plus size={16} />
            New evaluation
          </NavLink>
        </div>
      </header>

      <section className="metrics-grid">
        <MetricCard
          label="MODELS EVALUATED"
          value="12"
          detail="+3 this week"
          icon={Bot}
        />

        <MetricCard
          label="EVALUATION RUNS"
          value="1,248"
          detail="98.4% completed"
          icon={FlaskConical}
        />

        <MetricCard
          label="AVERAGE QUALITY"
          value="89.7%"
          detail="+2.4% vs last week"
          icon={Target}
        />

        <MetricCard
          label="MEDIAN LATENCY"
          value="1.3s"
          detail="−180ms vs last week"
          icon={Clock3}
        />
      </section>

      <section className="dashboard-grid">
        <article className="panel performance-panel">
          <div className="panel-header">
            <div>
              <span className="section-kicker">
                MODEL PERFORMANCE
              </span>

              <h2>Benchmark comparison</h2>
            </div>

            <NavLink to="/models" className="text-button button-link">
              View report
              <ChevronRight size={15} />
            </NavLink>
          </div>

          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 12,
                  right: 4,
                  left: -25,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  stroke="rgba(148,163,184,.08)"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fill: "#77817e",
                    fontSize: 11,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  domain={[60, 100]}
                  tick={{
                    fill: "#65706d",
                    fontSize: 11,
                  }}
                  axisLine={false}
                  tickLine={false}
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

          <div className="chart-legend">
            <span>
              <i className="legend-quality" />
              Quality
            </span>

            <span>
              <i className="legend-reliability" />
              Reliability
            </span>

            <span>
              <i className="legend-score" />
              Overall score
            </span>
          </div>
        </article>

        <article className="panel recommendation-panel">
          <div className="recommendation-heading">
            <div className="recommendation-icon">
              <Sparkles size={17} />
            </div>

            <div>
              <span className="section-kicker">
                DECISION ENGINE
              </span>

              <h2>Recommended model</h2>
            </div>
          </div>

          <div className="winner">
            <div>
              <span className="winner-provider">
                {winner.provider}
              </span>

              <h3>{winner.name}</h3>
            </div>

            <div className="score-ring">
              <strong>{winner.score}</strong>
              <span>/100</span>
            </div>
          </div>

          <p className="recommendation-copy">
            Best overall tradeoff for this workload based on quality,
            reliability, hallucination risk, latency and request cost.
          </p>

          <div className="decision-factors">
            <div>
              <span>
                <ShieldCheck size={14} />
                Reliability
              </span>
              <strong>{winner.reliability}%</strong>
            </div>

            <div>
              <span>
                <TriangleAlert size={14} />
                Hallucination
              </span>
              <strong>{winner.hallucination}%</strong>
            </div>

            <div>
              <span>
                <Gauge size={14} />
                Latency
              </span>
              <strong>{winner.latency}s</strong>
            </div>

            <div>
              <span>
                <CircleDollarSign size={14} />
                Cost / request
              </span>
              <strong>${winner.cost.toFixed(4)}</strong>
            </div>
          </div>

          <NavLink
            to="/compare"
            className="recommendation-button button-link"
          >
            View decision analysis
            <ChevronRight size={15} />
          </NavLink>
        </article>
      </section>

      <section className="lower-grid">
        <article className="panel leaderboard-panel">
          <div className="panel-header">
            <div>
              <span className="section-kicker">
                LEADERBOARD
              </span>
              <h2>Model ranking</h2>
            </div>

            <span className="muted-label">
              Composite score
            </span>
          </div>

          <div className="leaderboard">
            {models.map((model, index) => (
              <div className="leaderboard-row" key={model.id}>
                <span className="rank">
                  0{index + 1}
                </span>

                <div className="model-identity">
                  <div className="model-avatar">
                    {model.name.charAt(0)}
                  </div>

                  <div>
                    <strong>{model.name}</strong>
                    <span>{model.provider}</span>
                  </div>
                </div>

                <div className="score-track">
                  <span
                    style={{
                      width: `${model.score}%`,
                    }}
                  />
                </div>

                <strong className="leader-score">
                  {model.score}
                </strong>
              </div>
            ))}
          </div>
        </article>

        <article className="panel latest-panel">
          <div className="panel-header">
            <div>
              <span className="section-kicker">
                LATEST EVALUATION
              </span>

              <h2>{recentRuns[0].suite}</h2>
            </div>

            <span className="passed-badge">
              PASSED
            </span>
          </div>

          <div className="latest-score">
            <div>
              <strong>{recentRuns[0].score}</strong>
              <span>/100 overall</span>
            </div>

            <span>
              {recentRuns[0].id} · {recentRuns[0].time}
            </span>
          </div>

          <div className="evaluation-metrics">
            <div>
              <span>Quality</span>
              <strong>{recentRuns[0].quality}%</strong>
            </div>

            <div>
              <span>Reliability</span>
              <strong>{recentRuns[0].reliability}%</strong>
            </div>

            <div>
              <span>Hallucination risk</span>
              <strong>{recentRuns[0].hallucination}%</strong>
            </div>

            <div>
              <span>Latency</span>
              <strong>{recentRuns[0].latency}s</strong>
            </div>
          </div>
        </article>
      </section>

      <section className="panel recent-panel">
        <div className="panel-header">
          <div>
            <span className="section-kicker">
              EVALUATION HISTORY
            </span>

            <h2>Recent runs</h2>
          </div>

          <NavLink
            to="/evaluations"
            className="text-button button-link"
          >
            View all evaluations
            <ChevronRight size={15} />
          </NavLink>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>RUN</th>
                <th>TEST SUITE</th>
                <th>MODEL</th>
                <th>SCORE</th>
                <th>STATUS</th>
                <th>COMPLETED</th>
              </tr>
            </thead>

            <tbody>
              {recentRuns.map((run) => (
                <tr key={run.id}>
                  <td className="run-id">{run.id}</td>
                  <td className="suite-name">{run.suite}</td>
                  <td>{run.model}</td>

                  <td>
                    <strong>{run.score}</strong>
                    <span className="score-total">
                      {" "}
                      / 100
                    </span>
                  </td>

                  <td>
                    <span
                      className={`run-status ${
                        run.status === "Passed"
                          ? "passed"
                          : "review"
                      }`}
                    >
                      {run.status}
                    </span>
                  </td>

                  <td>{run.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/models" element={<Models />} />
            <Route path="/evaluations/new" element={<NewEvaluation />} />
             <Route path="/compare" element={<CompareModels />} />
            <Route
              path="/evaluations"
              element={<Evaluations />}
            />

            <Route
              path="/datasets"
              element={
                <PlaceholderPage
                  title="Datasets"
                  label="TEST DATA"
                  description="Evaluation datasets and benchmark test suites will live here."
                />
              }
            />

            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function PlaceholderPage({
  title,
  label,
  description,
}: {
  title: string;
  label: string;
  description: string;
}) {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <div className="eyebrow">
            <span>{label}</span>
          </div>

          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </header>

      <div className="placeholder-console">
        <span>AGENTBENCH</span>
        <strong>{title} module</strong>
        <p>Module ready for the next implementation stage.</p>
      </div>
    </div>
  );
}

export default App;