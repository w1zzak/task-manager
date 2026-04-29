"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData || "{}"));
    fetchTeams(token);
  }, [router]);

  const fetchTeams = async (token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setTeams(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading || !user)
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"></div>

      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 bg-white/5 backdrop-blur-3xl border border-white/10 p-6 rounded-[2rem] relative z-10">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
            Panel de Control
          </h1>
          <p className="text-slate-400 font-medium text-sm mt-1">
            Hola de nuevo, {user.name}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/teams/join"
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm transition-all duration-300"
          >
            Unirse a Equipo
          </Link>
          <Link
            href="/teams/new"
            className="px-6 py-2.5 bg-white text-black hover:bg-slate-200 rounded-xl font-black text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            Nuevo Equipo
          </Link>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl font-bold text-sm transition-all duration-300"
          >
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-xl font-black uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-3">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Tus Equipos
        </h2>

        {teams.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 text-center backdrop-blur-xl">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-400">
              <svg
                className="w-8 h-8"
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
            <h3 className="text-xl font-bold text-white mb-2">
              Aún no tienes equipos
            </h3>
            <p className="text-slate-400 mb-6">
              Crea uno nuevo o únete con un código de invitación.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <Link
                href={`/teams/${team.id}`}
                key={team.id}
                className="group block bg-white/5 border border-white/10 hover:border-blue-500/50 rounded-[2rem] p-6 transition-all duration-500 hover:bg-white/10 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 rounded-xl flex items-center justify-center text-blue-400 font-black text-lg">
                    {team.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-black tracking-widest px-3 py-1.5 bg-white/5 rounded-lg text-slate-400 border border-white/10 uppercase">
                    {team.inviteCode}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {team.name}
                </h3>
                <div className="flex gap-4 text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    {team._count.members}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
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
                    {team._count.tasks}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
