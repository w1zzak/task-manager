import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#030712] text-slate-100 px-4 relative overflow-hidden">
      {/* Sistema de Glows dinámicos mejorado */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[180px]"></div>

      <div className="z-10 max-w-5xl w-full text-center space-y-16">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md animate-fade-in">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
              Next-Gen Platform
            </span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-[0.9] text-white">
            Productividad <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">
              Sin Límites
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            La plataforma definitiva para equipos que exigen lo mejor. Tareas,
            colaboración y analítica avanzada con una interfaz editorial
            diseñada para el futuro.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <Link
            href="/register"
            className="w-full sm:w-auto bg-white text-black hover:bg-slate-200 px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all duration-500 shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-[1.05] active:scale-[0.95]"
          >
            Comenzar Ahora
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all duration-500 backdrop-blur-xl hover:border-white/20"
          >
            Iniciar Sesión
          </Link>
        </div>

        {/* Feature Grid mejorado */}
        <div className="pt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="group p-8 bg-white/5 border border-white/5 rounded-[2.5rem] transition-all duration-500 hover:bg-white/10 hover:border-white/10 hover:-translate-y-2">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="font-black text-slate-100 mb-3 uppercase tracking-wider text-sm">
              Equipos de Élite
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Gestión jerárquica y colaborativa diseñada para equipos de alto
              rendimiento.
            </p>
          </div>
          <div className="group p-8 bg-white/5 border border-white/5 rounded-[2.5rem] transition-all duration-500 hover:bg-white/10 hover:border-white/10 hover:-translate-y-2">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="font-black text-slate-100 mb-3 uppercase tracking-wider text-sm">
              Flujos Inteligentes
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Automatiza y organiza tus tareas con una interfaz que se anticipa
              a tus necesidades.
            </p>
          </div>
          <div className="group p-8 bg-white/5 border border-white/5 rounded-[2.5rem] transition-all duration-500 hover:bg-white/10 hover:border-white/10 hover:-translate-y-2">
            <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-6 text-violet-400 group-hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-black text-slate-100 mb-3 uppercase tracking-wider text-sm">
              Aesthetica Pura
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              No es solo software, es una experiencia editorial inmersiva para
              tu trabajo diario.
            </p>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-8 flex gap-8">
        <span className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
          Built for the Future
        </span>
        <span className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
          Privacy First
        </span>
      </footer>
    </main>
  );
}
