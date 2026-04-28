import { useState } from 'react'
import SideBar from './components/SideBar'
import DiaryEditor from './components/DiaryEditor'
import { diary as initialDiary } from './assets/diary'

export default function App() {
  const [entries, setEntries] = useState(initialDiary)
  const [editingEntry, setEditingEntry] = useState(null)

  const handleSaveData = (data) => {
    setEntries((prevEntries) => [data, ...prevEntries])
    console.log('ได้รับข้อมูลแล้ว:', data)
  }

  const handleEdit = (entry) => {
    setEditingEntry(entry)
  }

  const handleDelete = (id) => {
    setEntries((prevEntries) => prevEntries.filter(entry => entry.id !== id))
  }

  const handleUpdate = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map(entry =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    )
    setEditingEntry(null)
  }

  const handleCancelEdit = () => {
    setEditingEntry(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto flex flex-col gap-8 px-4 md:flex-row md:items-start">
        <SideBar
          entries={entries}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <main className="flex-1">
          <DiaryEditor
            onCreate={handleSaveData}
            onUpdate={handleUpdate}
            onCancelEdit={handleCancelEdit}
            editingEntry={editingEntry}
          />
        </main>
      </div>
    </div>
  )
}

