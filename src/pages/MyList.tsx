import { useEffect, useState } from "react"
import '../styles/globals.css';
import { MenuBar } from "@/components/MenuBar";
import Link from "next/link";
import styles from "../styles/HudMovies.module.css"
import movie from "../types/movie"


export default function MyList() {

    const [movie,setMovie]=useState<movie[]>([]);
    const [moviePosters,setMoviePosters]=useState<string[]>([]);
    const [showMoviesList,setMoviesList]=useState(false);

    
    useEffect(()=> {
        const userData=async()=> {
            const userLoggedIn=sessionStorage.getItem('userKey');
            if(userLoggedIn) {
                const userObject=JSON.parse(userLoggedIn)
                const email=userObject.userExists.email
                    
                const req=await fetch(`https://apicritiflixacesso.onrender.com/userData?email=${email}`, {
                    method:'GET',
                })

                const response=await req.json();

                if(response) {
                    setMoviesList(true)

                    setMovie(response.userExists.myList)
                    console.log(response.userExists.myList)

                    let posters=[];

                    for(let i=0; i<response.userExists.myList.length;i++) {
                       posters.push(response.userExists.myList[i].poster)
                    }

                    console.log(posters)
                    setMoviePosters(posters)
                }
            }
        }
        
        userData()

    },[])

    const sendMovieDates=(moviePoster:string,movieTitle:string,movieAvaliation:string,movieOverview:string,movieReleaseDate:string,movieId:string)=> {
        sessionStorage.setItem('poster',moviePoster)
        sessionStorage.setItem('title',movieTitle)
        sessionStorage.setItem('avaliation',movieAvaliation)
        sessionStorage.setItem('overview',movieOverview)
        sessionStorage.setItem('releaseDate',movieReleaseDate)
        sessionStorage.setItem('id',movieId)
    }



    return (
        <div className="bg-gray-900 h-screen">
            <MenuBar/>
            <div className='bg-gray-900 p-24 items-center justify-center'>
                <h3 className="text-white font-semibold text-2xl ml-24">My List</h3>
                <div className='flex items-center justify-center'>
                    <div className="p-8 flex items-center justify-center gap-3 flex-wrap mt-38 w-3/4"> 
                    {showMoviesList ? 
                        <div className="p-8 flex gap-3 flex-wrap mt-38">
                            {movie.map((movie,index)=> (
                                <div key={index}>
                                    {moviePosters[index] && (
                                        <Link href="/MoviePage">
                                          <button className={`h-80 w-56 bg-cover bg-center ${styles.movieSlide}`} style={{ backgroundImage: `url(${moviePosters[index]})`}}   onClick={()=>sendMovieDates(moviePosters[index],movie.title,"zero",movie.overview,movie.dateRelease,movie.id)}></button>
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                        :   
                        <div className="relative top-64">
                            <div className="text-white text-3xl font-bold">Carregando...</div>
                        </div>
                        }
                    </div>
                </div>        
            </div>
        </div>
    )
}