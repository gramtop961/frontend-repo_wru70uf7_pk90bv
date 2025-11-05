import { useMemo, useState } from "react";
import Header from "./components/Header";
import ConfigPanel from "./components/ConfigPanel";
import ApplicantsTable from "./components/ApplicantsTable";
import ResultsPanel from "./components/ResultsPanel";

// Utility: compute normalized values and weighted score
function computeScores(applicants, weights) {
  if (applicants.length === 0) return { scores: {}, ranking: [] };

  // Extract arrays for normalization
  const gpas = applicants.map((a) => a.gpa);
  const incomes = applicants.map((a) => a.income); // cost criterion
  const exts = applicants.map((a) => a.extracurricular);
  const recs = applicants.map((a) => a.recommendation);

  const max = (arr) => Math.max(...arr);
  const min = (arr) => Math.min(...arr);

  const maxG = max(gpas) || 1;
  const maxE = max(exts) || 1;
  const maxR = max(recs) || 1;
  const minI = min(incomes) || 1; // for cost, smaller is better

  const scores = {};
  for (const a of applicants) {
    const ngpa = (a.gpa || 0) / maxG; // benefit
    const nincome = (minI || 1) / (a.income || 1); // cost
    const next = (a.extracurricular || 0) / maxE; // benefit
    const nrec = (a.recommendation || 0) / maxR; // benefit

    const s =
      weights.gpa * ngpa +
      weights.income * nincome +
      weights.extracurricular * next +
      weights.recommendation * nrec;

    scores[a.name] = s;
  }

  const ranking = [...applicants]
    .map((a) => ({ name: a.name, score: scores[a.name] || 0 }))
    .sort((x, y) => y.score - x.score);

  return { scores, ranking };
}

export default function App() {
  const [weights, setWeights] = useState({
    gpa: 0.4,
    income: 0.3,
    extracurricular: 0.2,
    recommendation: 0.1,
  });

  const [applicants, setApplicants] = useState([
    { name: "Alice Johnson", gpa: 3.9, income: 18000, extracurricular: 9, recommendation: 9 },
    { name: "Brian Lee", gpa: 3.7, income: 12000, extracurricular: 7, recommendation: 8 },
    { name: "Carmen Diaz", gpa: 3.5, income: 9000, extracurricular: 8, recommendation: 7 },
  ]);

  const { scores, ranking } = useMemo(
    () => computeScores(applicants, weights),
    [applicants, weights]
  );

  const onResetWeights = () => {
    setWeights({ gpa: 0.25, income: 0.25, extracurricular: 0.25, recommendation: 0.25 });
  };

  const onAddApplicant = (a) => {
    // Ensure unique name key for table mapping
    if (applicants.find((x) => x.name.toLowerCase() === a.name.toLowerCase())) {
      const suffix = Math.floor(Math.random() * 1000);
      a.name = `${a.name} ${suffix}`;
    }
    setApplicants((prev) => [...prev, a]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <ConfigPanel
          weights={weights}
          setWeights={setWeights}
          onResetWeights={onResetWeights}
          onAddApplicant={onAddApplicant}
        />

        <ResultsPanel ranking={ranking} weights={weights} />

        <ApplicantsTable applicants={applicants} scores={scores} />
      </main>

      <footer className="text-center text-slate-500 text-xs py-6">
        Built for scholarship decision support. Adjust weights to reflect policy priorities.
      </footer>
    </div>
  );
}
