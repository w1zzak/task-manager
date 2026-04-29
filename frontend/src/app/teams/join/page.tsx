"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JoinTeamPage() {
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ inviteCode: inviteCode.toUpperCase() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Código inválido");
      router.push(`/teams/${data.teamId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] px-4 relative overflow-hidden">
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse"></div>

      <div className="w-full max-w-[440px] bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10">
        <Link
          href="/dashboard"
          className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 mb-8 font-black uppercase tracking-widest text-[10px]"
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al Panel
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">
            Unirse a Equipo
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Ingresa el código de acceso proporcionado por tu administrador
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs font-bold text-center">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-1">
              Código de Invitación
            </label>
            <input
              type="text"
              required
              maxLength={6}
              className="w-full bg-black/20 border border-white/5 rounded-2xl px-5 py-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 placeholder:text-slate-700 text-center text-2xl font-black tracking-[0.2em] uppercase"
              placeholder="XXXXXX"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full relative bg-white text-black font-black py-4 rounded-2xl transition-all duration-500 hover:scale-[1.02] disabled:opacity-50 shadow-xl shadow-white/5"
          >
            {loading ? "VERIFICANDO..." : "UNIRSE AL EQUIPO"}
          </button>
        </form>
      </div>
    </div>
  );
}
