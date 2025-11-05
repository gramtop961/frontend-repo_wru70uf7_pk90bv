import { Trophy, Crown } from "lucide-react";

export default function ResultsPanel({ ranking, weights }) {
  const top = ranking[0];
  const weightEntries = Object.entries(weights);

  return (
    <section className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
          <Trophy className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-semibold">Results</h2>
      </div>

      {top ? (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-amber-100 text-amber-700">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Top candidate</p>
              <p className="text-xl font-semibold">{top.name}</p>
              <p className="text-sm text-slate-600">Score: {top.score.toFixed(3)}</p>
            </div>
          </div>
          <div className="text-sm text-slate-600">
            <p className="font-medium mb-1">Weights</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {weightEntries.map(([k, v]) => (
                <span key={k} className="inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                  <span className="capitalize">{k}</span>
                  <span className="text-slate-500">{v.toFixed(2)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-slate-500 mb-6">Add applicants to see results.</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="py-2 px-3">Rank</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((r, idx) => (
              <tr key={r.name} className="border-t">
                <td className="py-2 px-3">#{idx + 1}</td>
                <td className="py-2 px-3 font-medium">{r.name}</td>
                <td className="py-2 px-3 font-semibold">{r.score.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
