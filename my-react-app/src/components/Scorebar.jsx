import EmotionBar from "./EmotionBar";

const emotionsData = [
    { id:1, label: "มีความสุข(Happy)", value: 85, color: "bg-yellow-500"},
    { id:2, label: "ตื่นเต้น (Excited)", value: 20, color: "bg-blue-500"},
    { id:3, label: "ผ่อนคลาย(Relax)", value: 50, color: "bg-red-500"},
    { id:4, label: "เฉยๆ(indifferent)", value: 40, color: "bg-pink-500"},
    { id:5, label: "กังวล(Anxious)", value: 65, color: "bg-green-500"},
    { id:6, label: "เบื่อ(Bored)", value: 25, color: "bg-gray-500"},
    { id:7, label: "เศร้า(Sad)", value: 43, color: "bg-orange-500"},
];

export default function Scorebar() {
  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Emotion Scores</h2>
      {emotionsData.map((emotion) => (
        <EmotionBar 
          key={emotion.id} 
          name={emotion.label} 
          score={emotion.value} 
          color={emotion.color} 
        />
      ))}
    </div>
  );
}
