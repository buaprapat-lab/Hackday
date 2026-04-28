import { useState } from "react";

export default function Motto() {
  // 1. State สำหรับเปิด/ปิด โหมดแก้ไข
  const [isEditing, setIsEditing] = useState(false);

  // 2. State สำหรับเก็บข้อความ Motto
  const [mottoText, setMottoText] = useState("Do your best!");

  // 3. State สำหรับเก็บเป้าหมาย (ใช้เป็น Array เพื่อให้วนลูปง่ายขึ้น)
  const [goals, setGoals] = useState([
    { id: 1, text: "Graduate from Generation Thailand", checked: true },
    { id: 2, text: "Get a job and work 3-4 years", checked: false },
    { id: 3, text: "Apply a job at Google 😎", checked: false },
  ]);

  // ฟังก์ชันสลับสถานะ Checkbox
  const handleCheckboxChange = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, checked: !goal.checked } : goal,
      ),
    );
  };

  // ฟังก์ชันเวลาพิมพ์แก้ข้อความ Goal แต่ละข้อ
  const handleGoalTextChange = (id, newText) => {
    setGoals(
      goals.map((goal) => (goal.id === id ? { ...goal, text: newText } : goal)),
    );
  };

  return (
    <div className="bg-[#F0EEE6] text-[#141413] p-6 rounded-xl border border-[#E3DBCC] w-[50%] font-['Poppins',sans-serif]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm font-medium tracking-widest text-[#141413] opacity-70">
          TO MYSELF
        </span>

        {/* เปลี่ยนปุ่มเป็น EDIT / SAVE */}
        <button
          className={`text-xs font-semibold tracking-wide border-none rounded-md px-5 py-1.5 cursor-pointer transition-colors duration-200 ${
            isEditing
              ? "bg-[#141413] text-[#F0EEE6] hover:bg-black" // สีปุ่มตอนเป็นโหมด SAVE
              : "bg-[#E3DBCC] text-[#141413] hover:bg-[#d6cbb5]" // สีปุ่มตอนเป็นโหมด EDIT
          }`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "SAVE" : "EDIT"}
        </button>
      </div>

      {/* Motto Text Section */}
      <div className="text-center my-6 py-4">
        {isEditing ? (
          <input
            type="text"
            value={mottoText}
            onChange={(e) => setMottoText(e.target.value)}
            className="font-['JetBrains_Mono',monospace] text-4xl font-semibold text-center w-full bg-transparent border-b-2 border-[#141413] focus:outline-none opacity-80"
            placeholder="Type your motto here..."
          />
        ) : (
          <h2 className="font-['JetBrains_Mono',monospace] text-5xl font-semibold m-0 leading-tight">
            “{mottoText}”
          </h2>
        )}
      </div>

      {/* Checklist Section */}
      <div className="flex flex-col gap-3 bg-[#E3DBCC] p-4 rounded-lg">
        {/* ใช้การวนลูป (map) สร้าง Checklist ทำให้โค้ดคลีนขึ้น */}
        {goals.map((goal, index) => (
          <div key={goal.id} className="flex items-start gap-2.5 w-full">
            <input
              type="checkbox"
              id={`goal-${goal.id}`}
              checked={goal.checked}
              onChange={() => handleCheckboxChange(goal.id)}
              className="mt-1 cursor-pointer accent-[#141413]"
            />

            {/* สลับการแสดงผลระหว่าง Input (ตอนกด Edit) กับ Label ปกติ */}
            {isEditing ? (
              <div className="flex w-full items-center gap-1.5">
                <span className="text-sm font-medium">{index + 1}.</span>
                <input
                  type="text"
                  value={goal.text}
                  onChange={(e) =>
                    handleGoalTextChange(goal.id, e.target.value)
                  }
                  className="text-sm w-full bg-[#F0EEE6] px-2 py-1 rounded outline-none focus:ring-1 focus:ring-[#141413] transition-all"
                />
              </div>
            ) : (
              <label
                htmlFor={`goal-${goal.id}`}
                className={`text-sm cursor-pointer leading-relaxed transition-all ${
                  goal.checked ? "line-through opacity-60" : "opacity-100"
                }`}
              >
                {index + 1}. {goal.text}
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
