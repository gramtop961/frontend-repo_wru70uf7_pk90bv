import { useState, useEffect } from "react";
import { SlidersHorizontal, Info } from "lucide-react";

export default function ConfigPanel({ weights, setWeights, onResetWeights, onAddApplicant }) {
  const [local, setLocal] = useState(weights);
  const [applicant, setApplicant] = useState({
    name: "",
    gpa: "",
    income: "",
    extracurricular: "",
    recommendation: "",
  });

  useEffect(() => {
    setLocal(weights);
  }, [weights]);

  const sum = Object.values(local).reduce((a, b) => a + (Number(b) || 0), 0);

  const handleWeightChange = (key, value) => {
    const v = Math.max(0, Math.min(1, Number(value)));
    const next = { ...local, [key]: v };
    setLocal(next);
  };

  const applyWeights = () => {
    const s = Object.values(local).reduce((a, b) => a + (Number(b) || 0), 0) || 1;
    const normalized = Object.fromEntries(
      Object.entries(local).map(([k, v]) => [k, (Number(v) || 0) / s])
    );
    setWeights(normalized);
  };

  const setEqualWeights = () => {
    onResetWeights();
  };

  const handleApplicantChange = (key, value) => {
    setApplicant((prev) => ({ ...prev, [key]: value }));
  };

  const submitApplicant = (e) => {
    e.preventDefault();
    const { name, gpa, income, extracurricular, recommendation } = applicant;
    if (!name) return;
    const payload = {
      name: name.trim(),
      gpa: Number(gpa),
      income: Number(income),
      extracurricular: Number(extracurricular),
      recommendation: Number(recommendation),
    };
    if (Object.values(payload).some((v) => Number.isNaN(v))) return;
    onAddApplicant(payload);
    setApplicant({ name: "", gpa: "", income: "", extracurricular: "", recommendation: "" });
  };

  return (
    <section className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
          <SlidersHorizontal className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-semibold">Configure Criteria & Add Applicants</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Weights */}
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <Info className="w-4 h-4" />
            <p>Adjust or type weights. They will be normalized to sum to 1.</p>
          </div>
          <div className="space-y-4">
            {[
              { key: "gpa", label: "GPA (benefit)" },
              { key: "income", label: "Family Income (cost)" },
              { key: "extracurricular", label: "Extracurricular (benefit)" },
              { key: "recommendation", label: "Recommendation (benefit)" },
            ].map((c) => (
              <div key={c.key} className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-5 text-sm font-medium text-slate-700">{c.label}</label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={local[c.key]}
                  onChange={(e) => handleWeightChange(c.key, e.target.value)}
                  className="col-span-5"
                />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={local[c.key]}
                  onChange={(e) => handleWeightChange(c.key, e.target.value)}
                  className="col-span-2 w-full border rounded-md px-2 py-1 text-sm"
                />
              </div>
            ))}
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Current sum: <span className="font-medium text-slate-800">{sum.toFixed(2)}</span></span>
              <div className="flex gap-2">
                <button onClick={setEqualWeights} className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200">Equalize</button>
                <button onClick={applyWeights} className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Apply</button>
              </div>
            </div>
          </div>
        </div>

        {/* Add applicant */}
        <form onSubmit={submitApplicant} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="Applicant Name"
              value={applicant.name}
              onChange={(e) => handleApplicantChange("name", e.target.value)}
              className="md:col-span-2 border rounded-md px-3 py-2 text-sm"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="GPA (0-4)"
              value={applicant.gpa}
              onChange={(e) => handleApplicantChange("gpa", e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
              required
            />
            <input
              type="number"
              step="100"
              placeholder="Income (USD/yr)"
              value={applicant.income}
              onChange={(e) => handleApplicantChange("income", e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
              required
            />
            <input
              type="number"
              step="1"
              placeholder="Extracurricular (0-10)"
              value={applicant.extracurricular}
              onChange={(e) => handleApplicantChange("extracurricular", e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
              required
            />
            <input
              type="number"
              step="1"
              placeholder="Recommendation (0-10)"
              value={applicant.recommendation}
              onChange={(e) => handleApplicantChange("recommendation", e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
              Add Applicant
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
