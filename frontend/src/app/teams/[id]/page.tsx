"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function TeamViewPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params.id as string;

  const [team, setTeam] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
    fetchTeam();
  }, [teamId]);

  const fetchTeam = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error("No se pudo cargar");
      const data = await res.json();
      setTeam(data);
    } catch (err) {
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: newTaskTitle }),
        },
      );
      if (res.ok) {
        setNewTaskTitle("");
        fetchTeam();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/complete`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      fetchTeam();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTeam();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTeam = async () => {
    if (!confirm('¿Seguro que deseas eliminar este equipo? Esta acción es irreversible.')) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (!confirm('¿Seguro que deseas remover a este miembro?')) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/members/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTeam();
    } catch (error) {
      console.error(error);
    }
  };

  const submitEditTask = async (taskId: string) => {
    if (!editingTaskTitle || editingTaskTitle === team?.tasks?.find((t: any) => t.id === taskId)?.title) {
      setEditingTaskId(null);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ title: editingTaskTitle }),
      });
      setEditingTaskId(null);
      fetchTeam();
    } catch (error) {
      console.error(error);
    }
  };

  const isCreator = team?.members?.find((m: any) => m.userId === user?.id)?.role === 'creator';

  if (loading || !team)
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px]"></div>

      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-12 relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10 p-6 rounded-[2rem]">
        <div>
          <Link
            href="/dashboard"
            className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 mb-3 font-black uppercase tracking-widest text-[10px]"
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
            Dashboard
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            {team.name}
          </h1>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col md:items-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
            Código de Invitación
          </span>
          <span className="px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-sm font-black tracking-widest text-indigo-400">
            {team.inviteCode}
          </span>
          {isCreator && (
            <button
              onClick={handleDeleteTeam}
              className="mt-3 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition-all w-full text-center"
            >
              Eliminar Equipo
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* TASKS COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Tareas ({team.tasks?.length || 0})
            </h2>

            <form onSubmit={handleCreateTask} className="mb-8 flex gap-3">
              <input
                type="text"
                placeholder="Añadir nueva tarea..."
                className="flex-1 bg-black/20 border border-white/5 rounded-xl px-5 py-3 text-sm font-medium text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-600"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <button
                type="submit"
                className="bg-white text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                Añadir
              </button>
            </form>

            <div className="space-y-3">
              {team.tasks?.map((task: any) => (
                <div
                  key={task.id}
                  className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${task.status === "Done" ? "bg-white/5 border-transparent opacity-50" : "bg-black/20 border-white/5 hover:border-indigo-500/30"}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors flex-shrink-0 ${task.status === "Done" ? "bg-indigo-500 border-indigo-500 text-white" : "border-slate-600 hover:border-indigo-400"}`}
                    >
                      {task.status === "Done" && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      )}
                    </button>
                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        autoFocus
                        className="flex-1 bg-black/40 border border-indigo-500/50 rounded-lg px-3 py-1 text-sm font-medium text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                        value={editingTaskTitle}
                        onChange={(e) => setEditingTaskTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') submitEditTask(task.id);
                          if (e.key === 'Escape') setEditingTaskId(null);
                        }}
                        onBlur={() => submitEditTask(task.id)}
                      />
                    ) : (
                      <span className={`font-medium text-sm truncate ${task.status === "Done" ? "line-through text-slate-500" : "text-slate-200"}`}>
                        {task.title}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all ml-4">
                    {editingTaskId !== task.id && (
                      <button
                        onClick={() => {
                          setEditingTaskId(task.id);
                          setEditingTaskTitle(task.title);
                        }}
                        className="text-slate-600 hover:text-blue-400 bg-black/20 p-2 rounded-lg hover:bg-blue-500/10 flex-shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-slate-600 hover:text-red-400 bg-black/20 p-2 rounded-lg hover:bg-red-500/10 flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
              {team.tasks?.length === 0 && (
                <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-black/10">
                  <p className="text-slate-500 text-sm font-medium">
                    Este equipo no tiene tareas pendientes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MEMBERS COLUMN */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
              Miembros ({team.members?.length || 0})
            </h2>
            <div className="space-y-4">
              {team.members?.map((member: any) => (
                <div
                  key={member.user.id}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-black/20 border border-white/5"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 rounded-xl flex items-center justify-center text-white font-black text-sm">
                      {member.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">
                        {member.user.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  {isCreator && member.userId !== user?.id && (
                    <button
                      onClick={() => handleRemoveMember(member.userId)}
                      className="text-slate-600 hover:text-red-400 bg-black/20 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                      title="Remover miembro"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
