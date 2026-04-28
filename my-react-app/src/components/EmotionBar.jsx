const EmotionBar = ({ name, score, color }) => {
  return (
    <div className="flex flex-col mb-4 w-full max-w-md">
      {/* ส่วนชื่ออารมณ์ข้างบน */}
      <span className="text-sm font-semibold mb-1 text-gray-700">{name}</span>
      
      {/* ตัวหลอด Scorebar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`${color} h-full transition-all duration-500`} 
          style={{ width: `${score}%` }} // ใช้ style="width: 70%" ตามที่ต้องการ
        ></div>
      </div>

      {/* เปอร์เซ็นต์ด้านล่างหลอด ตามเงื่อนไขที่คุณระบุ */}
      <div className="flex justify-end mt-1">
        <span className="text-xs font-bold text-gray-500">{score}%</span>
      </div>
    </div>
  );
};

export default EmotionBar;
