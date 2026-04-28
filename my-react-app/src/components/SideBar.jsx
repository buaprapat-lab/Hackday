import { diary } from "../assets/diary"

export default function SideBar(){

    function checkmood(mood){
        switch(mood){
            case("happy"):return "😊"; break;
            case("sad"):return "😢";break;
            case("fear"):return "😱";break;
            case("strong"):return "💪";break;
            case("angry"):return "😡";break;
            case("love"):return "🥰";break;
            case("joy"):return "😃";break;
        default:return" ";
        }

    }


    return(
        <div>
        <div className="flex flex-col min-h-[75vh] w-[30%] bg-[#E3DBCC]">
            <button className="bg-amber-500 hover:bg-amber-200 transition m-2" >HOME</button>
            { 
            diary.map((memory) => (
                 <div className="bg-amber-600 w-full text-amber-50 hover:bg-amber-200 hover:text-black transition" key={memory.id}>
                 {memory.id}{" : "}  
                 {memory.date.getDate()}/{memory.date.getMonth()}/{memory.date.getFullYear()} 
                 {"  "}i'm {memory.mood} {checkmood(memory.mood)}
                 </div>
            ))
            
            }
        
        </div>
        <button className="bg-blue-500 text-white h-[25vh] w-[30%] hover:bg-blue-300 hover:text-black transition"> new entry</button>
        </div>

    )
}