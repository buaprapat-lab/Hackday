import { useState } from 'react'

const moodEmoji = {
  happy: '😊',
  sad: '😢',
  fear: '😱',
  strong: '💪',
  angry: '😡',
  love: '🥰',
  joy: '😃',
}

function formatDate(dateValue) {
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue)
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
}

export default function SideBar({ entries = [], onEdit, onDelete }) {
  const [mood, setMood] = useState('all')

  const filteredEntries =
    mood === 'all'
      ? entries
      : entries.filter((entry) => entry.mood === mood)

  return (
    <aside className="w-full rounded-[36px] bg-[#E3DBCC] p-6 shadow-xl md:w-[32%]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Mood Journal</p>
            <h2 className="text-2xl font-bold text-slate-900">Memory List</h2>
          </div>
          <button
            type="button"
            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-400"
            onClick={() => setMood('all')}
          >
            HOME
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {Object.entries(moodEmoji).map(([key, emoji]) => (
            <button
              key={key}
              type="button"
              onClick={() => setMood(key)}
              className={`rounded-3xl border border-transparent p-4 text-2xl transition ${
                mood === key ? 'bg-white shadow-md' : 'bg-amber-300 hover:bg-amber-200'
              }`}
            >
              {emoji}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setMood('all')}
            className={`col-span-4 rounded-3xl p-4 text-sm font-semibold transition ${
              mood === 'all' ? 'bg-white shadow-md' : 'bg-amber-300 hover:bg-amber-200'
            }`}
          >
            all
          </button>
        </div>

        <div className="rounded-[32px] bg-white p-4 shadow-inner max-h-96 overflow-y-auto">
          {filteredEntries.length === 0 ? (
            <div className="rounded-3xl bg-slate-100 p-6 text-center text-sm text-slate-500">
              ยังไม่มีรายการสำหรับสถานะนี้
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEntries.map((memory) => (
                <div
                  key={memory.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:bg-white"
                >
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{memory.id}</span>
                    <span>{formatDate(memory.date)}</span>
                  </div>
                  <p className="mt-2 text-base text-slate-800">
                    {memory.content || memory.text}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(memory)}
                      className="rounded px-3 py-1 text-xs bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(memory.id)}
                      className="rounded px-3 py-1 text-xs bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="mt-4 rounded-[28px] bg-blue-600 px-5 py-4 text-white transition hover:bg-blue-500"
          onClick={() => setMood('all')}
        >
          New entry
        </button>
      </div>
    </aside>
  )
}
