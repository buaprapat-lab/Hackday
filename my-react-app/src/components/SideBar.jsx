import { useState } from "react";
import { diary } from "../assets/diary"

export default function SideBar(){

    const [mood,setMood]=useState("all");



    function checkmood(moods){
        switch(moods){
            case("happy"):return "😊";
            case("sad"):return "😢";
            case("fear"):return "😱";
            case("strong"):return "💪";
            case("angry"):return "😡";
            case("love"):return "🥰";
            case("joy"):return "😃";
        default:return" ";
        }

    }
    function showlistMemory(myMood){

        let mem=null;
         mem= diary.filter(mem=>mem.mood===myMood)
        console.log(mem);
        if(myMood==="all"||!myMood){
        console.log(mem);

        return diary.map((memory) => (
                 <div className="bg-amber-600 w-full text-amber-50 hover:bg-amber-200 hover:text-black transition" key={memory.id}>
                 {memory.id}{" : "}  
                 {memory.date.getDate()}/{memory.date.getMonth()}/{memory.date.getFullYear()} 
                 {"  "}i'm {memory.mood} {checkmood(memory.mood)}
                 </div>
            ))}
        else{
           return mem.map((memory) => (
                 <div className="bg-amber-600 w-full text-amber-50 hover:bg-amber-200 hover:text-black transition" key={memory.id}>
                 {memory.id}{" : "}  
                 {memory.date.getDate()}/{memory.date.getMonth()}/{memory.date.getFullYear()} 
                 {"  "}i'm {memory.mood} {checkmood(memory.mood)}
                 </div>
            ))

        }



    }




    return(
        <div>
        <div className="flex flex-col min-h-[75vh] w-[30%] bg-[#E3DBCC]">
            <button className="bg-amber-500 hover:bg-amber-200 transition m-2" >HOME</button>
            <div className="flex flex-row flex-wrap">
                <button onClick={()=>setMood("happy")}>😊</button>
                <button onClick={()=>setMood("sad")}>😢</button>
                <button onClick={()=>setMood("fear")}>😱</button>
                <button onClick={()=>setMood("strong")}>💪</button>
                <button onClick={()=>setMood("angry")}>😡</button>
                <button onClick={()=>setMood("love")}>🥰</button>
                <button onClick={()=>setMood("joy")}>😃</button>
                <button onClick={()=>setMood("all")}>all</button>
 
                
            </div>
            { showlistMemory(mood)}
        
        </div>
        <button className="bg-blue-500 text-white h-[25vh] w-[30%] hover:bg-blue-300 hover:text-black transition"> new entry</button>
        </div>

    )
}