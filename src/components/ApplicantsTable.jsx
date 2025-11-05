export default function ApplicantsTable({ applicants, scores }) {
  return (
    <section className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Applicants</h2>
        <p className="text-sm text-slate-500">Weighted scoring with normalization</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">GPA</th>
              <th className="py-2 px-3">Income</th>
              <th className="py-2 px-3">Extracurricular</th>
              <th className="py-2 px-3">Recommendation</th>
              <th className="py-2 px-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {applicants.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-slate-500 py-6">
                  No applicants yet. Add candidates to compare.
                </td>
              </tr>
            )}
            {applicants.map((a) => (
              <tr key={a.name} className="border-t">
                <td className="py-2 px-3 font-medium">{a.name}</td>
                <td className="py-2 px-3">{a.gpa}</td>
                <td className="py-2 px-3">{a.income.toLocaleString()}</td>
                <td className="py-2 px-3">{a.extracurricular}</td>
                <td className="py-2 px-3">{a.recommendation}</td>
                <td className="py-2 px-3 font-semibold text-slate-800">{(scores[a.name] ?? 0).toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
