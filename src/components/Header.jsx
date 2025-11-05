import { GraduationCap, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-3 rounded-xl">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Scholarship DSS
          </h1>
        </div>
        <div className="md:ml-auto text-sm md:text-base flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
          <Sparkles className="w-4 h-4" />
          <p className="opacity-90">Decision support for selecting scholarship grantees</p>
        </div>
      </div>
    </header>
  );
}
