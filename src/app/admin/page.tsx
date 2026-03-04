"use client";

import { useState, useEffect } from "react";
import { VibeConfig, VibeCategory, VibeEntry, VibeStatus } from "@/types/vibe";
import vibeData from "../../../public/vibe.json";

const CATEGORIES: VibeCategory[] = ["Project", "Work", "Life", "Learning"];
const STATUSES: VibeStatus[] = ["available", "busy", "unavailable"];
const ICONS = ["rocket", "briefcase", "star", "mic", "palette", "mapPin", "bookOpen", "building", "code", "coffee", "heart", "zap", "server", "terminal", "cpu"];

// Default template
const defaultConfig: VibeConfig = {
  meta: {
    name: "",
    title: "",
    status: "available",
    statusMessage: "Open for collaborations",
  },
  entries: [],
};

export default function AdminPage() {
  const [config, setConfig] = useState<VibeConfig>(vibeData as VibeConfig);
  const [activeTab, setActiveTab] = useState<"meta" | "entries">("meta");
  const [editingEntry, setEditingEntry] = useState<VibeEntry | null>(null);
  // Auto-save on every change
  useEffect(() => {
    const save = async () => {
      try {
        await fetch("/api/save-vibe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(config),
        });
      } catch { /* ignore */ }
    };
    const timer = setTimeout(save, 1000);
    return () => clearTimeout(timer);
  }, [config]);

  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    // Try to save to server first
    try {
      const res = await fetch("/api/save-vibe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        return;
      }
    } catch {
      // Fall back to download
    }
    // Fallback: download as file
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vibe.json";
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        setConfig(data);
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const addEntry = () => {
    const newEntry: VibeEntry = {
      id: `entry-${Date.now()}`,
      date: new Date().toISOString().slice(0, 7),
      title: "New Entry",
      description: "Description here",
      category: "Project",
      icon: "rocket",
      image: "",
      highlight: false,
    };
    setEditingEntry(newEntry);
  };

  const saveEntry = () => {
    if (!editingEntry) return;
    const existing = config.entries.findIndex((e) => e.id === editingEntry.id);
    if (existing >= 0) {
      const updated = [...config.entries];
      updated[existing] = editingEntry;
      setConfig({ ...config, entries: updated });
    } else {
      setConfig({ ...config, entries: [...config.entries, editingEntry] });
    }
    setEditingEntry(null);
  };

  const deleteEntry = (id: string) => {
    setConfig({ ...config, entries: config.entries.filter((e) => e.id !== id) });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">⚙️ Vibe Config Editor</h1>
          <div className="flex gap-2">
            <label className="px-4 py-2 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
              Load
              <input type="file" accept=".json" onChange={handleLoad} className="hidden" />
            </label>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              {saved ? "✓ Saved!" : "Save"}
            </button>
            <button
              onClick={() => {
                const json = JSON.stringify(config, null, 2);
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "vibe.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="px-4 py-2 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300"
            >
              Download
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab("meta")}
            className={`pb-2 px-1 ${activeTab === "meta" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("entries")}
            className={`pb-2 px-1 ${activeTab === "entries" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
          >
            Timeline Entries ({config.entries.length})
          </button>
        </div>

        {/* Meta Tab */}
        {activeTab === "meta" && (
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={config.meta.name}
                onChange={(e) => setConfig({ ...config, meta: { ...config.meta, name: e.target.value } })}
                className="w-full p-2 border rounded"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={config.meta.title}
                onChange={(e) => setConfig({ ...config, meta: { ...config.meta, title: e.target.value } })}
                className="w-full p-2 border rounded"
                placeholder="Your role"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={config.meta.status}
                onChange={(e) => setConfig({ ...config, meta: { ...config.meta, status: e.target.value as VibeStatus } })}
                className="w-full p-2 border rounded"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status Message</label>
              <input
                type="text"
                value={config.meta.statusMessage || ""}
                onChange={(e) => setConfig({ ...config, meta: { ...config.meta, statusMessage: e.target.value } })}
                className="w-full p-2 border rounded"
                placeholder="Open for collaborations"
              />
            </div>
          </div>
        )}

        {/* Entries Tab */}
        {activeTab === "entries" && (
          <div>
            <button
              onClick={addEntry}
              className="mb-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              + Add Entry
            </button>

            {/* Entry Editor Modal */}
            {editingEntry && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h2 className="text-lg font-bold mb-4">Edit Entry</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                          type="text"
                          value={editingEntry.date}
                          onChange={(e) => setEditingEntry({ ...editingEntry, date: e.target.value })}
                          className="w-full p-2 border rounded"
                          placeholder="2026-03"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                          value={editingEntry.category}
                          onChange={(e) => setEditingEntry({ ...editingEntry, category: e.target.value as VibeCategory })}
                          className="w-full p-2 border rounded"
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={editingEntry.title}
                        onChange={(e) => setEditingEntry({ ...editingEntry, title: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        value={editingEntry.description}
                        onChange={(e) => setEditingEntry({ ...editingEntry, description: e.target.value })}
                        className="w-full p-2 border rounded h-24"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Icon</label>
                        <select
                          value={editingEntry.icon || ""}
                          onChange={(e) => setEditingEntry({ ...editingEntry, icon: e.target.value as any })}
                          className="w-full p-2 border rounded"
                        >
                          <option value="">None</option>
                          {ICONS.map((i) => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input
                          type="text"
                          value={editingEntry.image || ""}
                          onChange={(e) => setEditingEntry({ ...editingEntry, image: e.target.value })}
                          className="w-full p-2 border rounded"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <input
                          type="checkbox"
                          checked={editingEntry.highlight}
                          onChange={(e) => setEditingEntry({ ...editingEntry, highlight: e.target.checked })}
                          id="highlight"
                        />
                        <label htmlFor="highlight" className="text-sm font-medium">Highlight this entry</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setEditingEntry(null)} className="px-4 py-2 border rounded">Cancel</button>
                    <button onClick={saveEntry} className="px-4 py-2 bg-black text-white rounded">Save Entry</button>
                  </div>
                </div>
              </div>
            )}

            {/* Entries List */}
            <div className="space-y-3">
              {config.entries.map((entry) => (
                <div key={entry.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                  <div>
                    <div className="font-medium">{entry.title}</div>
                    <div className="text-sm text-gray-500">{entry.date} · [{entry.category}]</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingEntry(entry)} className="text-blue-600 hover:underline text-sm">Edit</button>
                    <button onClick={() => deleteEntry(entry.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                  </div>
                </div>
              ))}
              {config.entries.length === 0 && (
                <p className="text-gray-500 text-center py-8">No entries yet. Click "Add Entry" to get started.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
