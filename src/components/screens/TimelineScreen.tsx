import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/TopAppBar';
import { TimelinePhase } from '../../types';

export const TimelineScreen: React.FC = () => {
  const { timeline, updateTimeline, adminUser } = useApp();
  const [editingPhase, setEditingPhase] = useState<TimelinePhase | null>(null);

  const handleSavePhase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhase) return;
    const updated = timeline.map((p) => (p.id === editingPhase.id ? editingPhase : p));
    updateTimeline(updated);
    setEditingPhase(null);
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#060c18] text-slate-100 overflow-y-auto">
      {/* Top Bar */}
      <TopAppBar
        title="Project Development"
        showBack
        showSettings
      />

      <div className="flex-1 px-4 py-3 space-y-4">
        {/* Intro */}
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide">Development Roadmap</h2>
          <p className="text-[11px] text-slate-400">
            Nexora engineering phases from prototype to Skill Expo live exhibition
          </p>
        </div>

        {/* Phase List matching reference design */}
        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-emerald-400 before:via-cyan-400 before:to-slate-700">
          {timeline.map((phase) => {
            const isCompleted = phase.status === 'Completed';
            const isInProgress = phase.status === 'In Progress';

            return (
              <div key={phase.id} className="relative group">
                {/* Numbered Indicator Node */}
                <div
                  className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ring-4 ring-[#060c18] z-10 ${
                    isCompleted
                      ? 'bg-emerald-400 text-black shadow-[0_0_10px_#10b981]'
                      : isInProgress
                      ? 'bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4] animate-pulse'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {phase.phaseNumber}
                </div>

                {/* Card Container */}
                <div
                  className={`p-3.5 rounded-2xl bg-[#09152b] border transition-all ${
                    isInProgress
                      ? 'border-cyan-500/50 shadow-lg shadow-cyan-950/40 bg-gradient-to-r from-[#0a1835] to-[#09152b]'
                      : isCompleted
                      ? 'border-emerald-500/30'
                      : 'border-cyan-950/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h3 className="text-xs font-bold text-white tracking-wide">
                        {phase.title}
                      </h3>
                      <span className="text-[10px] text-cyan-400/90 font-mono-code">
                        {phase.targetDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : isInProgress
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {phase.status}
                      </span>
                      {adminUser.isAuthenticated && (
                        <button
                          onClick={() => setEditingPhase(phase)}
                          className="p-1 text-slate-400 hover:text-cyan-300"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                    {phase.description}
                  </p>

                  {/* Milestones list */}
                  <div className="space-y-1 pt-1 border-t border-cyan-950/60">
                    {phase.milestones.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span
                          className={`w-1 h-1 rounded-full ${
                            isCompleted ? 'bg-emerald-400' : isInProgress ? 'bg-cyan-400' : 'bg-slate-600'
                          }`}
                        />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Admin Edit Modal */}
      {editingPhase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSavePhase}
            className="w-full max-w-sm rounded-2xl bg-[#09152b] border border-cyan-500/40 p-5 space-y-3 shadow-2xl"
          >
            <h3 className="text-sm font-bold text-white">Edit Phase Details</h3>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Phase Title:</label>
              <input
                type="text"
                required
                value={editingPhase.title}
                onChange={(e) => setEditingPhase({ ...editingPhase, title: e.target.value })}
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Status:</label>
              <select
                value={editingPhase.status}
                onChange={(e: any) =>
                  setEditingPhase({ ...editingPhase, status: e.target.value })
                }
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Description:</label>
              <textarea
                value={editingPhase.description}
                onChange={(e) =>
                  setEditingPhase({ ...editingPhase, description: e.target.value })
                }
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 h-20"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingPhase(null)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
