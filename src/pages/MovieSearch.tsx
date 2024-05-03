import { useEffect, useState } from "react";
import Link from 'next/link';
import { MenuBar } from "@/components/MenuBar";
import styles from "../styles/HudMovies.module.css"

export default function MovieSearch() {

    const [movies,setMovies]=useState<any[]>([]);
    const [moviePosters,setMoviesPosters]=useState<string[]>([]);
    const [titleFound,setTitleFound]=useState("");
    const [forUserMsg,setForUserMsg]=useState(false);


    useEffect(()=> {

        const moviesFounded=sessionStorage.getItem('foundMovies')
        console.log(moviesFounded);
        const titleFounded=sessionStorage.getItem('searchedTitle')
        
        setForUserMsg(false)
        
        if(moviesFounded && titleFounded) {

            const moviesFoundedObject=JSON.parse(moviesFounded);
        
            if (moviesFoundedObject.results.length>0 && titleFounded!=="") {

                setTitleFound(titleFounded)

                const moviesObject=JSON.parse(moviesFounded);
                console.log(moviesObject)
                


                let posters=[];

                if (moviesObject.results.backdrop_path !=null) {
                    posters = moviesObject.results.map(movie =>
                        `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                    )
                }

                else {
                    posters = moviesObject.results.map(movie =>
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
        
    },[]);

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
        <div className='p-24 items-center justify-center'>
            <h3 className="text-white font-bold text-2xl ml-24">{titleFound}</h3>
            <div className='flex items-center justify-center'>
                <div className="p-8 flex gap-3 flex-wrap mt-38 w-3/4"> 
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
    )
}