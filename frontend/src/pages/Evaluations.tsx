import {
  CheckCircle2,
  Filter,
  FlaskConical,
  Plus,
  Search,
} from "lucide-react";
import { evaluationRuns } from "../data/evaluationData";
import { NavLink } from "react-router-dom";

function Evaluations() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <div className="eyebrow">
            <span>EVALUATION RUNS</span>
            <span className="eyebrow-divider">/</span>
            <span>Benchmark history</span>
          </div>

          <h1>Evaluations</h1>

          <p>
            Inspect benchmark runs and identify quality, reliability and safety
            regressions.
          </p>
        </div>

        <NavLink
  to="/evaluations/new"
  className="primary-button button-link"
>
  <Plus size={15} />
  New evaluation
</NavLink>
      </header>

      <section className="evaluation-toolbar">
        <div className="evaluation-search">
          <Search size={14} />
          <span>Search evaluations...</span>
        </div>

        <button className="filter-button">
          <Filter size={14} />
          Filter
        </button>
      </section>

      <section className="evaluation-stat-row">
        <div>
          <span>TOTAL RUNS</span>
          <strong>1,248</strong>
        </div>

        <div>
          <span>PASS RATE</span>
          <strong>94.8%</strong>
        </div>

        <div>
          <span>AVG SCORE</span>
          <strong>88.7</strong>
        </div>

        <div>
          <span>FLAGGED FOR REVIEW</span>
          <strong>18</strong>
        </div>
      </section>

      <section className="evaluation-table-panel">
        <div className="evaluation-table-heading">
          <div>
            <span className="section-kicker">RUN HISTORY</span>
            <h2>Recent evaluations</h2>
          </div>

          <span className="table-count">
            Showing {evaluationRuns.length} recent runs
          </span>
        </div>

        <div className="table-wrapper">
          <table className="full-evaluation-table">
            <thead>
              <tr>
                <th>RUN</th>
                <th>TEST SUITE</th>
                <th>MODEL</th>
                <th>QUALITY</th>
                <th>RELIABILITY</th>
                <th>HALLUCINATION</th>
                <th>LATENCY</th>
                <th>COST</th>
                <th>SCORE</th>
                <th>STATUS</th>
                <th>COMPLETED</th>
              </tr>
            </thead>

            <tbody>
              {evaluationRuns.map((run) => (
                <tr key={run.id}>
                  <td className="run-id">{run.id}</td>

                  <td className="suite-name">{run.suite}</td>

                  <td>{run.model}</td>

                  <td>{run.quality}%</td>

                  <td>{run.reliability}%</td>

                  <td>{run.hallucination}%</td>

                  <td>{run.latency}s</td>

                  <td>${run.cost.toFixed(4)}</td>

                  <td className="evaluation-score-cell">{run.score}</td>

                  <td>
                    <span
                      className={`run-status ${
                        run.status === "Passed" ? "passed" : "review"
                      }`}
                    >
                      {run.status === "Passed" && (
                        <CheckCircle2 size={10} />
                      )}

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

      <div className="evaluation-footer-note">
        <FlaskConical size={13} />
        Seeded benchmark runs are used for the portfolio MVP. The evaluation
        engine will replace these values with calculated results.
      </div>
    </div>
  );
}

export default Evaluations;