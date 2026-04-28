import SideBar from './components/SideBar'
import DiaryEditor from './components/DiaryEditor';

export default function App() {

  const handleSaveData = (data) => {
    console.log("ได้รับข้อมูลแล้ว:", data);
  };

  return (
    <>
      <div className="flex-col">
        <SideBar />
        <div className="p-10">
          <DiaryEditor onCreate={handleSaveData} />
        </div>
      </div>

    </>

  )
}

