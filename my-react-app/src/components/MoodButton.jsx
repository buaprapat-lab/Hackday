import { useState } from "react";

function MoodButton({ mood, onSelect }) {
  return (
    <button 
      onClick={() => onSelect(mood)}
      style={{
        margin: "5px",
        padding: "10px 15px",
        fontSize: "18px",
        cursor: "pointer"
      }}
    >
      {mood.emoji} {mood.label}
    </button>
  );
}

// function ChangeButton({ Change, onSelect }) {
//   return (
//     <button 
//       onClick={() => onSelect(Change)}
//       style={{
//         margin: "5px",
//         padding: "10px 15px",
//         fontSize: "18px",
//         cursor: "pointer"
//       }}
//     >
//       {Change.emoji} {mood.label}
//     </button>
//   );
// }

function MoodDisplay({ selectedMood }) {
  return (
    <div style={{ marginTop: "20px" }}>
      {selectedMood ? (
        <h2>
          วันนี้คุณรู้สึก: {selectedMood.emoji} {selectedMood.label}
        </h2>
      ) : (
        <h2>กรุณาเลือกมู๊ดของคุณ</h2>
      )}
    </div>
  );
}

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { label: "Happy", emoji: "😊" },
    { label: "Neutral", emoji: "😐" },
    { label: "Sad", emoji: "😢" },
    { label: "Angry", emoji: "😡" },
    { label: "Fear", emoji: "😱" },
    { label: "Love", emoji: "😍" },
    { label: "Strong", emoji: "😎" },
    { label: "Joy", emoji: "🤣" },
  ];

  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Mood Tracker</h1>

      {/* map() */}
      {moods.map((mood, index) => (
        <MoodButton key={index} mood={mood} onSelect={handleSelectMood} />
      ))}

      {/* conditional rendering */}
      <MoodDisplay selectedMood={selectedMood} />
    </div>
  );

}