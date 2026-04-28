import React, { useState } from 'react';

export default function DiaryEditor({ onCreate, today = "2026-04-28" }) {
  const [text, setText] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const moodList = ['😆', '😊', '🙂', '😐', '😕', '😠', '😢'];

  const handleSave = () => {
    if (!text || !selectedMood) {
      return alert("กรุณากรอกข้อความและเลือกอารมณ์ก่อนครับ");
    }

    // สร้าง Object ข้อมูลเตรียมส่งให้เพื่อน
    const newEntry = {
      id: Date.now(),
      date: today,
      content: text,
      mood: selectedMood,
      timestamp: new Date().toISOString()
    };

    // ส่ง Object กลับไปที่ Component หลัก (ตัวแม่)
    onCreate(newEntry);

    // ล้างค่าฟอร์ม
    setText('');
    setSelectedMood('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto shadow-sm">
      {/* Header Date */}
      <div className="bg-gray-300 p-2 rounded-t-2xl text-[10px] font-bold px-6 text-gray-600">
        DATE: {today}
      </div>

      {/* Textarea Area */}
      <div className="bg-[#FFF7ED] p-10 rounded-b-3xl border-2 border-[#FFEDD5] relative h-72 mb-6">
        <span className="absolute top-4 left-8 text-[10px] font-black text-orange-200 uppercase tracking-widest">
          To My Self
        </span>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Do your best!" 
          className="w-full h-full bg-transparent outline-none text-3xl italic text-gray-600 placeholder-orange-100 resize-none"
        />
      </div>

      {/* Mood Selector */}
      <div className="flex justify-between bg-white p-5 rounded-[40px] shadow-md border border-gray-100 mb-6 px-8">
        {moodList.map(m => (
          <button 
            key={m} 
            onClick={() => setSelectedMood(m)} 
            className={`text-5xl transition-all ${selectedMood === m ? 'scale-125' : 'grayscale opacity-30'}`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={handleSave}
          className="flex-1 bg-gray-800 hover:bg-black text-white py-5 rounded-2xl font-black uppercase text-xl transition-all"
        >
          Create
        </button>
        <button disabled className="flex-1 bg-gray-200 text-gray-400 py-5 rounded-2xl font-black uppercase cursor-not-allowed">
          Update
        </button>
        <button disabled className="flex-1 bg-gray-200 text-gray-400 py-5 rounded-2xl font-black uppercase cursor-not-allowed">
          Delete
        </button>
      </div>
    </div>
  );
}