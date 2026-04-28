import { useState } from 'react'

const moodOptions = [
  { name: 'happy', emoji: '😊' },
  { name: 'sad', emoji: '😢' },
  { name: 'fear', emoji: '😱' },
  { name: 'strong', emoji: '💪' },
  { name: 'angry', emoji: '😡' },
  { name: 'love', emoji: '🥰' },
  { name: 'joy', emoji: '😃' },
]

const formatToday = () => {
  const now = new Date()
  return now.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export default function DiaryEditor({ onCreate, onUpdate, onCancelEdit, editingEntry }) {
  const [text, setText] = useState(editingEntry ? editingEntry.text : '')
  const [selectedMood, setSelectedMood] = useState(editingEntry ? editingEntry.mood : '')
  const today = formatToday()

  const handleSave = () => {
    if (!text.trim() || !selectedMood) {
      return alert('กรุณากรอกข้อความและเลือกอารมณ์ก่อนครับ')
    }

    if (editingEntry) {
      // Update existing entry
      const updatedEntry = {
        ...editingEntry,
        text: text.trim(),
        mood: selectedMood,
        timestamp: new Date().toISOString(),
      }
      onUpdate(updatedEntry)
    } else {
      // Create new entry
      const newEntry = {
        id: Date.now(),
        date: new Date(),
        text: text.trim(),
        mood: selectedMood,
        timestamp: new Date().toISOString(),
      }
      onCreate(newEntry)
    }
    setText('')
    setSelectedMood('')
  }

  const handleCancel = () => {
    setText('')
    setSelectedMood('')
    if (onCancelEdit) onCancelEdit()
  }

  return (
    <section className="w-full rounded-[40px] bg-white p-6 shadow-xl md:p-10">
      <div className="mb-6 rounded-[32px] bg-slate-100 p-4 text-slate-500 shadow-sm">
        <div className="text-xs uppercase tracking-[0.3em] text-slate-500">DATE</div>
        <div className="text-sm font-semibold text-slate-900">{today}</div>
      </div>

      <div className="relative mb-8 rounded-[32px] bg-[#FFF7ED] p-8 shadow-inner">
        <span className="absolute left-8 top-8 text-[10px] font-black uppercase tracking-widest text-orange-200">
          To My Self
        </span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Do your best!"
          className="h-64 w-full resize-none bg-transparent text-3xl italic text-slate-600 outline-none placeholder-orange-100"
        />
      </div>

      <div className="mb-8 rounded-[40px] bg-white p-5 shadow-md border border-slate-100">
        <div className="grid grid-cols-4 gap-3">
          {moodOptions.map((mood) => (
            <button
              key={mood.name}
              type="button"
              onClick={() => setSelectedMood(mood.name)}
              className={`rounded-3xl p-4 text-4xl transition ${
                selectedMood === mood.name ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-3xl bg-slate-900 px-6 py-5 text-white transition hover:bg-black"
        >
          {editingEntry ? 'Update' : 'Create'}
        </button>
        {editingEntry && (
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-3xl bg-slate-500 px-6 py-5 text-white transition hover:bg-slate-600"
          >
            Cancel
          </button>
        )}
      </div>
    </section>
  )
}
