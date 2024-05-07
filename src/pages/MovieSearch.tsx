import { useEffect, useState } from "react";
import Link from 'next/link';
import MenuBar from "@/components/MenuBar";
import '../styles/globals.css';
import styles from "../styles/HudMovies.module.css"
import movie from "../types/movie"
import ProtectRoute from "@/components/ProtectRoute";

export default function MovieSearch() {

    const [movies,setMovies]=useState<any[]>([]);
    const [moviePosters,setMoviesPosters]=useState<string[]>([]);
    const [titleFound,setTitleFound]=useState("");
    const [forUserMsg,setForUserMsg]=useState(false);

    const moviesFounded:any|string=sessionStorage.getItem('foundMovies')
    const titleFounded:any|string=sessionStorage.getItem('searchedTitle')

    useEffect(()=> {
        
        setForUserMsg(false)
        
        if(moviesFounded && titleFounded) {

            const moviesFoundedObject=JSON.parse(moviesFounded);
        
            if (moviesFoundedObject.results.length>0 && titleFounded!=="") {

                setTitleFound(titleFounded)

                const moviesObject=JSON.parse(moviesFounded);


                let posters=[];

                if (moviesObject.results.backdrop_path !=null) {
                    posters = moviesObject.results.map((movie:movie) =>
                        `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                    )
                }

                else {
                    posters = moviesObject.results.map((movie:movie) =>
                        `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                    )
                }
        
                setMovies(moviesObject.results);
                setMoviesPosters(posters);
            }

            else {
                setTitleFound(titleFounded)
                setForUserMsg(true)
                setMoviesPosters([])
                setMovies([])
            }

        }
        else {
            setForUserMsg(true)
        }
        
    },[moviesFounded,titleFounded]);

    const sendMovieDates=(moviePoster:string,movieTitle:string,movieAvaliation:string,movieOverview:string,movieReleaseDate:string,movieId:string)=> {
        sessionStorage.setItem('poster',moviePoster)
        sessionStorage.setItem('title',movieTitle)
        sessionStorage.setItem('avaliation',movieAvaliation)
        sessionStorage.setItem('overview',movieOverview)
        sessionStorage.setItem('releaseDate',movieReleaseDate)
        sessionStorage.setItem('id',movieId)
    }


    return (
        <ProtectRoute>
            <div className="bg-gray-900 h-screen">
                <MenuBar/>
                <div className='bg-gray-900 p-24 items-center justify-center'>
                    <h3 className="text-white font-bold text-2xl lg:ml-32 md:ml-0">{titleFound}</h3>
                    <div className='flex items-center justify-center'>
                        <div className="p-8 flex gap-3 flex-wrap lg:mt-30 lg:w-3/4 md:w-full md:mt-10"> 
                        {movies.map((movie, index) => (
                            <div key={index} className="flex flex-col items-center"> {/* Adicionado um container flexível para alinhar o título e a imagem verticalmente */}
                        {moviePosters[index] ? (
                            <Link href="/MoviePage">
                                <button className={`h-80 w-56 bg-cover bg-center ${styles.movieSlide}`} style={{ backgroundImage: `url(${moviePosters[index]})`}}   onClick={()=>sendMovieDates(moviePosters[index], movie.original_title, movie.vote_average,movie.overview,movie.release_date,movie.id)}></button>
                            </Link>
                        ): null}
                </div>
                        ))}
                        </div>
                    </div>
                </div>
                {forUserMsg && 
                    <div className="bg-gray-900 flex items-center justify-center">
                        <h1 className="text-white text-2xl">Filme não encontrado</h1>
                    </div>
                }
            </div>
        </ProtectRoute>
    )
}