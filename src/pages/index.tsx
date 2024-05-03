"use client"
import { MenuBar } from "@/components/MenuBar";
import '../styles/globals.css';
import { MoviesBox } from "@/components/MoviesBox";
import { useRouter } from 'next/router';
import { LoadingPage } from "./LoadingPage";
import { useEffect } from "react";



export default function Home() {
  const router=useRouter();

  useEffect(()=> {
      const timer=setTimeout(()=> {
        router.push('/Login');
      },3000)

      return ()=> {
        clearTimeout(timer)
      }
  });

  return (
    <div className="bg-gray-900 h-screen">
        <>
          <LoadingPage/>
        </>
    </div>
  );
}
