import SideBar from "./components/SideBar";
import DiaryEditor from "./components/DiaryEditor";
import Motto from "./components/Motto";

export default function App() {
  const handleSaveData = (data) => {
    console.log("ได้รับข้อมูลแล้ว:", data);
  };

  return (
    <>
      <div className="flex flex-row w-full min-h-screen">
        <SideBar />
        <div className="flex-1 p-10 flex justify-center items-start">
          <Motto />
        </div>
      </div>
      <div className="p-10">
        <DiaryEditor onCreate={handleSaveData} />
      </div>
    </>
  );
}
