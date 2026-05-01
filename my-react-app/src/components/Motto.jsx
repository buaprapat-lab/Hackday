// นำเข้า Hook ที่ชื่อว่า useState จากคลังของ React
// โค้ดนี้ต้องการจดจำและเปลี่ยนแปลงข้อมูลบนหน้าจอ (เช่น ข้อความที่แก้, สถานะติ๊กถูก) 
// useState คือตัวที่ทำให้ตัวแปรเหล่านั้นอัปเดตหน้าจอได้อัตโนมัติ
import { useState } from "react";

// ประกาศสร้างฟังก์ชันคอมโพเนนต์ชื่อ Motto และส่งออก (export default)
export default function Motto() {
  // 2. สร้างState สำหรับเปิด/ปิด โหมดแก้ไข
  // สร้าง State ชื่อ isEditing มีค่าเริ่มต้นเป็น false และมีฟังก์ชัน setIsEditing ไว้สำหรับเปลี่ยนค่า
  // ใช้เป็นสวิตช์บอกแอปพลิเคชันว่า ตอนนี้ผู้ใช้อยู่ใน "โหมดดูข้อมูล" (false) หรือ "โหมดแก้ไขข้อมูล" (true)
  const [isEditing, setIsEditing] = useState(false);

  // State สำหรับเก็บข้อความ Motto
  // สร้าง State เก็บข้อความคติประจำใจ ค่าเริ่มต้นคือ "Do your best!"
  const [mottoText, setMottoText] = useState("Do your best!");

  // State สำหรับเก็บเป้าหมาย (ใช้เป็น Array เพื่อให้วนลูปง่ายขึ้น)
  // สร้าง State ประเภท Array ภายในเก็บข้อมูลเป็น Object แตกต่างกันไปในแต่ละข้อ (id, text, checked)
  //การเก็บข้อมูลเป็น Array of Objects ทำให้เราสามารถเขียนโค้ดเพื่อสร้างรายการยาวๆ ได้ง่ายขึ้นด้วยการวนลูป 
  // และสามารถควบคุมแต่ละข้อแยกจากกันได้ผ่าน id
  const [goals, setGoals] = useState([
    { id: 1, text: "Graduate from Generation Thailand", checked: true },
    { id: 2, text: "Get a job and work for 3-4 years", checked: false },
    { id: 3, text: "Apply a job at Google 😎", checked: false },
  ]);

  //3. ฟังก์ชันจัดการการกระทำ (Event Handlers)
  // ฟังก์ชันสลับสถานะ Checkbox
    // ฟังก์ชันนี้จะรับ id เข้ามาเมื่อมีการติ๊ก Checkbox มันจะเอา goals เดิมมาวนลูป (map) เช็คว่า id ตรงกับข้อไหน
    // หมายถึง สมมติเราคลิกข้อที่ 2 ฟังก์ชันจะได้รับเลข 2 มา (id = 2)
  const handleCheckboxChange = (id) => {
    setGoals(
      // .map() ซึ่งทำหน้าที่เหมือน "สายพานโรงงาน"
//มันจะหยิบข้อมูล goals มาดูทีละข้อ (เรียกแต่ละข้อว่า goal) เพื่อสร้าง Array เส้นใหม่ทั้งหมดส่งไปให้ React อัปเดตหน้าจอ
      goals.map((goal) =>
        // // ตรงนี้แหละครับที่มันจะเช็ค:
        // รอบที่ 1: goal.id เป็น 1 ... (ไม่ตรงกับ 2) -> คืนค่าเดิม
        // รอบที่ 2: goal.id เป็น 2 ... (ตรงกับ 2 แล้ว!) -> แก้ไขข้อมูลข้อนี้
        // รอบที่ 3: goal.id เป็น 3 ... (ไม่ตรงกับ 2) -> คืนค่าเดิม
        goal.id === id ? { ...goal, checked: !goal.checked } : goal,
      ),
    );
  };
// { ...goal, checked: !goal.checked }: โค้ดส่วนนี้คือการสร้าง Object ใหม่โดยคัดลอกข้อมูลเดิมมาทั้งหมด 
// (...goal) แต่เขียนทับค่า checked ให้เป็นค่าตรงข้าม (!goal.checked) 
// สาเหตุที่ต้องทำแบบนี้เพราะ React มีกฎว่าห้ามแก้ไข State เดิมตรงๆ ต้องสร้างตัวใหม่ไปทับเสมอ

  // ฟังก์ชันเวลาพิมพ์แก้ข้อความ Goal แต่ละข้อ
  // คล้ายฟังก์ชันด้านบน แต่ใช้สำหรับตอนที่ผู้ใช้กำลังพิมพ์แก้ไขข้อความในแต่ละข้อ โดยจะรับ newText มาเขียนทับค่า text เดิม
  const handleGoalTextChange = (id, newText) => {
    setGoals(
      goals.map((goal) => (goal.id === id ? { ...goal, text: newText } : goal)),
    );
  };

  // 4. ส่วนการแสดงผล (JSX) - ปุ่ม Edit/Save
  return (
    <div className="bg-[#FFFFFF] text-[#141413] p-6 rounded-[40px] border border-[#E3DBCC] w-[75%] font-['Poppins',sans-serif]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm font-medium tracking-widest text-[#141413] opacity-70">
          TO MYSELF
        </span>

        {/* เปลี่ยนปุ่มเป็น EDIT / SAVE */}
        <button
          className={`text-xs font-semibold tracking-wide border-none rounded-md px-5 py-1.5 cursor-pointer transition-colors duration-200 ${
            isEditing
            // ใช้ Template Literal (เครื่องหมาย ) ร่วมกับเงื่อนไข เพื่อเปลี่ยนสีปุ่ม 
            // ถ้า isEditing` เป็นจริงให้ใช้สีดำ ถ้าเท็จให้ใช้สีเทา
              ? "bg-[#141413] text-[#F0EEE6] hover:bg-black" // สีปุ่มตอนเป็นโหมด SAVE
              : "bg-[#E3DBCC] text-[#141413] hover:bg-[#d6cbb5]" // สีปุ่มตอนเป็นโหมด EDIT
          }`}
          // เมื่อกดปุ่ม จะเรียกใช้ setIsEditing ให้สลับค่าเป็นตรงกันข้าม (!isEditing) = true (save?)
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "SAVE" : "EDIT"}
        </button>
      </div>

      {/* Motto Text Section 
      ใช้ตรวจสอบค่า isEditing
      ถ้าเป็นโหมดแก้ไข (true): จะแสดงแท็ก <input> ให้ผู้ใช้พิมพ์ได้ โดยผูกค่าเริ่มต้นไว้กับ mottoText 
      และเมื่อพิมพ์ (onChange) จะสั่งให้ setMottoText ดึงตัวอักษรที่พิมพ์ (e.target.value) 
      ไปอัปเดต State ตลอดเวลา*/}
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
          {/*ถ้าโหมดดูข้อมูล (false): จะแสดงเป็นหัวข้อ <h2> ธรรมดาที่ดึงข้อความมาแสดง*/}
          <h2 className="font-['JetBrains_Mono',monospace] text-5xl font-semibold m-0 leading-tight">
            “{mottoText}”
          </h2>
        )}
      </div>

{/*6. ส่วนรายการเป้าหมาย (Checklist)*/}
      <div className="flex flex-col gap-3 bg-[#E3DBCC] p-4 rounded-lg">
        {/* นำ State goals มาวนลูปด้วยคำสั่ง .map() เพื่อสร้างรายการทีละข้อ */}
        {goals.map((goal, index) => (
          <div key={goal.id} className="flex items-start gap-2.5 w-full">
            {/*key={goal.id} เป็นกฎบังคับของ React เวลาสร้าง UI ด้วยลูป 
            เพื่อให้ React รู้ว่าแท็กไหนอ้างอิงถึงข้อมูลตัวไหน เวลาอัปเดตจะได้ไม่แสดงผลผิดพลาด
           
            กล่องติ๊กถูกที่รับค่าความจริงมาจาก goal.checked 
            เมื่อผู้ใช้กด จะส่ง goal.id ไปให้ฟังก์ชันสลับสถานะทำงาน*/}
            <input
              type="checkbox"
              id={`goal-${goal.id}`}
              checked={goal.checked}
              onChange={() => handleCheckboxChange(goal.id)}
              className="mt-1 cursor-pointer accent-[#141413]"
            />

            {/* สลับการแสดงผลระหว่าง Input (ตอนกด Edit) กับ Label ปกติ 
            เหมือนหลักการของหัวข้อ Motto ด้านบน คือสลับกันแสดงระหว่าง <input> 
            สำหรับแก้ไข กับ <label> สำหรับอ่านอย่างเดียว*/}
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
                  {/*โค้ดส่วน goal.checked ? "line-through..." ใช้สำหรับตรวจว่าถ้า Checkbox ถูกติ๊กแล้ว (true) 
                    จะเพิ่มคลาสที่ขีดฆ่าข้อความและทำให้สีจางลง เพื่อแสดงให้เห็นว่าทำภารกิจข้อนี้เสร็จแล้ว*/}
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
