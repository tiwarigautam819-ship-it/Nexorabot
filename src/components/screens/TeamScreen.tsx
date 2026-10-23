import React, { useState } from 'react';
import {
  Award,
  ChevronRight,
  Code2,
  Cpu,
  Mail,
  Plus,
  Trash2,
  User,
  Users,
  Wrench,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/TopAppBar';
import { BottomNavBar } from '../common/BottomNavBar';
import { TeamMember } from '../../types';

export const TeamScreen: React.FC = () => {
  const { team, updateTeam, deleteTeamMember, adminUser } = useApp();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [contribution, setContribution] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return;

    const newMember: TeamMember = {
      id: 'member-' + Date.now(),
      name,
      role,
      skills: skillsStr ? skillsStr.split(',').map((s) => s.trim()) : ['Robotics Engineering'],
      contribution: contribution || 'Core engineering team contributor.',
      bio: bio || 'Robotics team member working on the Nexora Smart Robot project.',
      photoUrl:
        photoUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    };

    updateTeam([...team, newMember]);
    setShowAddModal(false);
    setName('');
    setRole('');
    setSkillsStr('');
    setContribution('');
    setBio('');
    setPhotoUrl('');
  };

  const handleDeleteMember = async (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (selectedMember?.id === id) {
      setSelectedMember(null);
    }
    await deleteTeamMember(id);
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#060c18] text-slate-100 overflow-y-auto">
      {/* Top Bar */}
      <TopAppBar
        title="Our Team"
        showBack
        showSettings
      />

      <div className="flex-1 px-4 py-3 space-y-3">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">Nexora Engineering Team</h2>
            <p className="text-[11px] text-slate-400">
              Meet the talented people behind Nexora.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-2.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md shadow-cyan-600/30 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>
        </div>

        {/* Empty state per specification */}
        {team.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs space-y-3 px-4 rounded-2xl bg-[#09152b]/50 border border-cyan-950">
            <Users className="w-12 h-12 mx-auto text-cyan-500/40 opacity-70" />
            <p className="font-semibold text-slate-200 text-sm">No team members added yet.</p>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
              You can upload team members with 1:1 full-resolution photos directly using the button above or Admin Panel.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs inline-flex items-center gap-1.5 shadow-md shadow-cyan-600/30 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Upload First Member</span>
            </button>
          </div>
        ) : (
          /* Team members list with 1:1 full photos */
          <div className="space-y-4">
            {team.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className={`relative p-4 rounded-2xl bg-[#09152b] border transition-all cursor-pointer group ${
                  member.isLead
                    ? 'border-cyan-500/60 bg-gradient-to-b from-[#0a1835] to-[#09152b] shadow-xl shadow-cyan-950/40'
                    : 'border-cyan-950/80 hover:border-cyan-500/40'
                }`}
              >
                {/* 1:1 Full Photo Container */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#060e20] border border-cyan-900/50 mb-3 shadow-inner">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  {member.isLead && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cyan-400 text-black font-extrabold text-[10px] tracking-wider uppercase shadow-lg shadow-cyan-500/40">
                      LEAD DEVELOPER
                    </span>
                  )}
                  {/* Remove button directly on member card */}
                  <button
                    type="button"
                    onClick={(e) => handleDeleteMember(member.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-red-950/85 hover:bg-red-600 border border-red-500/60 text-red-300 hover:text-white transition-all shadow-md z-10 active:scale-90"
                    title="Remove Member Profile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {member.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                  </div>
                  <p className="text-xs text-cyan-400 font-semibold mb-1">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {member.bio || member.contribution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Member Details Modal with 1:1 Full Photo */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-2xl bg-[#09152b] border border-cyan-500/40 p-5 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* 1:1 Full Resolution Photo */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#060c18] border border-cyan-500/30 shadow-lg">
              <img
                src={selectedMember.photoUrl}
                alt={selectedMember.name}
                className="w-full h-full object-cover"
              />
              {selectedMember.isLead && (
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-cyan-400 text-black font-bold text-[10px] tracking-wide shadow-md">
                  TEAM LEAD
                </span>
              )}
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{selectedMember.name}</h3>
              <p className="text-xs text-cyan-400 font-semibold">{selectedMember.role}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#060c18] border border-cyan-950 space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase">
                  Project Contribution:
                </span>
                <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                  {selectedMember.contribution}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase">
                  Biography:
                </span>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase">
                  Core Skills & Tools:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedMember.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-[9px] px-2 py-0.5 rounded-md bg-[#0a1835] text-cyan-300 border border-cyan-800/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setSelectedMember(null)}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleDeleteMember(selectedMember.id)}
                className="px-3 py-2 rounded-xl bg-red-950/90 hover:bg-red-800 border border-red-500/60 text-red-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all shadow-md"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span>Remove Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleAddMember}
            className="w-full max-w-sm rounded-2xl bg-[#09152b] border border-cyan-500/40 p-5 space-y-3 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <h3 className="text-sm font-bold text-white">Add Team Member Profile</h3>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Full Name:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya Sharma"
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Project Role:</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Embedded Software Engineer"
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">
                Photo (1:1 Full Square):
              </label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Paste photo URL or pick file below..."
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 font-mono-code"
              />
              <div className="mt-1.5 flex items-center justify-between">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (uploadEvent) => {
                        if (uploadEvent.target?.result) {
                          setPhotoUrl(String(uploadEvent.target.result));
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border file:border-cyan-600/50 file:bg-cyan-950/60 file:text-cyan-300 hover:file:bg-cyan-900 cursor-pointer"
                />
                {photoUrl && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-cyan-400/50 shrink-0">
                    <img src={photoUrl} alt="1:1 Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Contribution:</label>
              <textarea
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                placeholder="How this member contributes to the robot prototype..."
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 h-14"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Short Biography:</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Background and robotics specialization..."
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 h-14"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">
                Skills (comma separated):
              </label>
              <input
                type="text"
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                placeholder="Arduino, L298N, C++, Soldering"
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
              />
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
                Save Profile
              </button>
            </div>
          </form>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
};
