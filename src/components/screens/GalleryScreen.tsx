import React, { useState } from 'react';
import {
  Calendar,
  ChevronRight,
  Eye,
  Image as ImageIcon,
  Maximize2,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/TopAppBar';
import { BottomNavBar } from '../common/BottomNavBar';
import { GalleryItem } from '../../types';

export const GalleryScreen: React.FC = () => {
  const { gallery, updateGallery, deleteGalleryItem, adminUser } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewingPhoto, setViewingPhoto] = useState<GalleryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<'robot' | 'circuit' | 'components' | 'expo'>('robot');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'robot', label: 'Robot Model' },
    { id: 'circuit', label: 'Circuit & Wiring' },
    { id: 'components', label: 'Components' },
    { id: 'expo', label: 'Skill Expo' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;
    const item: GalleryItem = {
      id: 'gal-' + Date.now(),
      title: newTitle,
      subtitle: newSubtitle || 'Project photograph',
      category: newCategory,
      imageUrl: newUrl,
      date: 'Oct 2026',
      description: newDesc,
    };
    updateGallery([item, ...gallery]);
    setShowAddModal(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewUrl('');
    setNewDesc('');
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    await deleteGalleryItem(id);
    if (viewingPhoto?.id === id) {
      setViewingPhoto(null);
    }
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#060c18] text-slate-100 overflow-y-auto">
      {/* Top Bar */}
      <TopAppBar
        title="Project Gallery"
        showBack
        showSettings
      />

      <div className="flex-1 px-4 py-3 space-y-3">
        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                  : 'bg-[#09152b] text-slate-400 hover:text-slate-200 border border-cyan-950'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery count & upload photo action */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{filteredItems.length} Photographs</span>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>
        </div>

        {/* 2-Column Photo Grid matching reference */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs space-y-3 px-4 rounded-2xl bg-[#09152b]/50 border border-cyan-950">
            <ImageIcon className="w-12 h-12 mx-auto opacity-50 text-cyan-400" />
            <p className="font-semibold text-slate-200 text-sm">No photographs uploaded yet.</p>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
              You can upload real robot prototype, circuit, and component photographs directly.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs inline-flex items-center gap-1.5 shadow-md shadow-cyan-600/30 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Upload First Photo</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setViewingPhoto(item)}
                className="relative rounded-2xl bg-[#09152b] border border-cyan-950 hover:border-cyan-500/40 overflow-hidden cursor-pointer group shadow-lg transition-all"
              >
                {/* Photo frame */}
                <div className="relative w-full h-32 bg-[#060e20] overflow-hidden flex items-center justify-center">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09152b] via-transparent to-transparent opacity-80" />
                  
                  {/* Direct Remove Button right on each card */}
                  <button
                    type="button"
                    onClick={(e) => handleDelete(item.id, e)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-950/85 hover:bg-red-600 border border-red-500/60 text-red-300 hover:text-white transition-all shadow-md z-10 active:scale-90"
                    title="Remove this photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="absolute top-2 left-2 p-1 rounded-full bg-black/60 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-2.5">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {viewingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-[#09152b] border border-cyan-500/50 overflow-hidden shadow-2xl space-y-3 p-4">
            <button
              onClick={() => setViewingPhoto(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/70 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-h-80 rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={viewingPhoto.imageUrl}
                alt={viewingPhoto.title}
                className="max-h-80 w-full object-contain"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{viewingPhoto.title}</h3>
                <span className="text-[10px] font-mono-code text-cyan-400">
                  {viewingPhoto.date}
                </span>
              </div>
              <p className="text-xs text-cyan-300/90 font-medium mt-0.5">
                {viewingPhoto.subtitle}
              </p>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {viewingPhoto.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-cyan-950">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono-code">
                CATEGORY: {viewingPhoto.category.toUpperCase()}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(viewingPhoto.id)}
                className="px-3 py-1.5 rounded-xl bg-red-950/90 hover:bg-red-800 border border-red-500/60 text-red-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-red-950/50 active:scale-95 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span>Remove Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleAddPhoto}
            className="w-full max-w-sm rounded-2xl bg-[#09152b] border border-cyan-500/40 p-5 space-y-3 shadow-2xl"
          >
            <h3 className="text-sm font-bold text-white">Upload / Link Project Photo</h3>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Title:</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Robot Chassis Bottom View"
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Subtitle:</label>
              <input
                type="text"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="e.g. Motor wiring detail"
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Photograph:</label>
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Paste image URL or pick file below..."
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
                          setNewUrl(String(uploadEvent.target.result));
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border file:border-cyan-600/50 file:bg-cyan-950/60 file:text-cyan-300 hover:file:bg-cyan-900 cursor-pointer"
                />
                {newUrl && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-cyan-400/50 shrink-0">
                    <img src={newUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Category:</label>
              <select
                value={newCategory}
                onChange={(e: any) => setNewCategory(e.target.value)}
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
              >
                <option value="robot">Robot Model</option>
                <option value="circuit">Circuit & Wiring</option>
                <option value="components">Components</option>
                <option value="expo">Skill Expo</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Description:</label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Describe this engineering photograph..."
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-400 h-16"
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
                Add Photo
              </button>
            </div>
          </form>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
};
