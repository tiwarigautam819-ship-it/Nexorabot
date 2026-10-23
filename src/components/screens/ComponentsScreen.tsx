import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/TopAppBar';
import { ComponentItem } from '../../types';

export const ComponentsScreen: React.FC = () => {
  const { components, updateComponents, deleteComponent, adminUser, navigateTo } = useApp();
  const [selectedComp, setSelectedComp] = useState<ComponentItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPurpose, setNewPurpose] = useState('');
  const [newSpec, setNewSpec] = useState('');
  const [newStatus, setNewStatus] = useState<'Implemented' | 'In Testing' | 'Planned'>('Implemented');

  const handleAddComponent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const item: ComponentItem = {
      id: 'comp-' + Date.now(),
      name: newName,
      category: 'controller',
      description: newDesc,
      purpose: newPurpose,
      specification: newSpec,
      status: newStatus,
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    };
    updateComponents([...components, item]);
    setShowAddModal(false);
    setNewName('');
    setNewDesc('');
    setNewPurpose('');
    setNewSpec('');
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (selectedComp?.id === id) {
      setSelectedComp(null);
    }
    await deleteComponent(id);
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#060c18] text-slate-100 overflow-y-auto">
      {/* Top Bar */}
      <TopAppBar
        title="Components"
        showBack
        showSettings
      />

      <div className="flex-1 px-4 py-3 space-y-3">
        {/* Header note */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">
              Hardware Component Inventory
            </h2>
            <p className="text-[11px] text-slate-400">
              Verified modules and engineering specifications
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-2.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md shadow-cyan-600/30 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        {/* Component List */}
        <div className="space-y-2.5">
          {components.map((comp) => (
            <div
              key={comp.id}
              onClick={() => setSelectedComp(comp)}
              className="p-3.5 rounded-2xl bg-[#09152b] border border-cyan-950/80 hover:border-cyan-500/30 transition-all flex items-center gap-3.5 cursor-pointer group"
            >
              {/* Photo */}
              <div className="w-16 h-16 rounded-xl bg-[#060e20] border border-cyan-900/40 overflow-hidden shrink-0 flex items-center justify-center p-1">
                <img
                  src={comp.imageUrl}
                  alt={comp.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h3 className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                    {comp.name}
                  </h3>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                      comp.status === 'Implemented'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : comp.status === 'In Testing'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {comp.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {comp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedComp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#09152b] border border-cyan-500/40 p-5 space-y-3.5 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="w-full h-40 rounded-xl bg-[#060c18] border border-cyan-950 overflow-hidden flex items-center justify-center">
              <img
                src={selectedComp.imageUrl}
                alt={selectedComp.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{selectedComp.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  {selectedComp.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{selectedComp.description}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#060c18] border border-cyan-950/60 space-y-1.5 text-xs">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase">
                  Project Purpose:
                </span>
                <p className="text-slate-300 text-[11px] mt-0.5">{selectedComp.purpose}</p>
              </div>
              <div className="pt-1.5 border-t border-cyan-950/60">
                <span className="text-[10px] font-bold text-cyan-400 uppercase">
                  Technical Specifications:
                </span>
                <p className="text-slate-300 text-[11px] font-mono-code mt-0.5">
                  {selectedComp.specification}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedComp(null)}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleDelete(selectedComp.id)}
                className="px-3 py-2 rounded-xl bg-red-950/90 hover:bg-red-800 border border-red-500/60 text-red-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Component Modal for Admin */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleAddComponent}
            className="w-full max-w-sm rounded-2xl bg-[#09152b] border border-cyan-500/40 p-5 space-y-3 shadow-2xl"
          >
            <h3 className="text-sm font-bold text-white">Add Hardware Component</h3>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Component Name:</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Servo Motor (SG90)"
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Description:</label>
              <textarea
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Description of the hardware role..."
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 h-16"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Purpose & Role:</label>
              <input
                type="text"
                value={newPurpose}
                onChange={(e) => setNewPurpose(e.target.value)}
                placeholder="Controls camera pan/tilt rotation"
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Specification:</label>
              <input
                type="text"
                value={newSpec}
                onChange={(e) => setNewSpec(e.target.value)}
                placeholder="4.8V-6V, 1.8 kg-cm torque"
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 font-mono-code"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Status:</label>
              <select
                value={newStatus}
                onChange={(e: any) => setNewStatus(e.target.value)}
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
              >
                <option value="Implemented">Implemented</option>
                <option value="In Testing">In Testing</option>
                <option value="Planned">Planned</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
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
