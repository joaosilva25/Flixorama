import ShowMoviesGenres from "@/components/ShowMoviesGenres"
import '../styles/globals.css';
import { useState,useEffect } from "react";

export default function Action() {
    const [page,setPage]=useState<number>(1);
    const [pageNumber,setPageNumber]=useState<number>();

    useEffect(() => {
        if(pageNumber) {
            setPage(pageNumber);
        }

    },[page,pageNumber])

    const slidePage=(pageNumerate:number)=> {
        setPageNumber(pageNumerate);
    }

    return (
        <div className="h-full flex flex-col bg-gray-900">
            <ShowMoviesGenres genreCode={28} genreName="Action" genrePage={page}/>
            <div className="w-full relative bottom-24 flex justify-end p-6">
                <div className="bg-gray-900 flex w-72 gap-4">
                    <div className="h-12 w-12 border-2 border-cyan-500 first:flex justify-center items-center">
                        <button className="text-white text-xl font-semibold" onClick={()=>slidePage(1)}>1</button>
                    </div> 
                    <div className="h-12 w-12 border-2 border-cyan-500 flex justify-center items-center">
                        <button className="text-white text-xl font-semibold" onClick={()=>slidePage(2)}>2</button>
                    </div> 
                    <div className="h-12 w-12 border-2 border-cyan-500 flex justify-center items-center">
                        <button className="text-white text-xl font-semibold" onClick={()=>slidePage(3)}>3</button>
                    </div> 
                </div>
            </div>
        </div>
    )
}