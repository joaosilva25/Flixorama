"use client"
import MenuBar from "@/components/MenuBar";
import '../styles/globals.css';
import { MoviesBox } from "@/components/MoviesBox";
import { useEffect,useState } from "react";
import ProtectRoute from "@/components/ProtectRoute";




export default function MoviePage() {

    const [movieTitle,setMovieTitle]=useState("");
    const [movieImage,setMovieImage]=useState("");
    const [movieGenres,setMovieGenres]=useState("");
    const [movieAvaliation,setMovieAvaliation]=useState<number>(0);
    const [movieOverview,setMovieOverview]=useState("");
    const [movieReleaseDate,setMovieReleaseDate]=useState("");
    const [movieId,setMovieId]=useState("");
    const [movieTrailer,setMovieTrailer]=useState("");
    const [forAddListMsg,setForAddListMsg]=useState("");
    const [email,setEmail]=useState("");

    useEffect(()=> {
        setMovieImage("")
        setMovieTitle("")
        setForAddListMsg("Adicionar")

        const userLogged=sessionStorage.getItem('userKey')
                
        if(userLogged) {
            const userEmail=JSON.parse(userLogged)
            setEmail(userEmail.userExists.email);
        }

        const title=sessionStorage.getItem('title');
        const image=sessionStorage.getItem('poster');
        const avaliation=sessionStorage.getItem('avaliation');
        const overview=sessionStorage.getItem('overview');
        const release_date=sessionStorage.getItem('releaseDate');
        const genres_ids=sessionStorage.getItem('genres');
        const id=sessionStorage.getItem('id');


        if(title && image && avaliation && overview && release_date && genres_ids && id) {
            setMovieTitle(title)
            setMovieImage(image)
            const toFloat:any=parseFloat(avaliation).toFixed(1)
            setMovieAvaliation(toFloat)
            setMovieOverview(overview)
            setMovieReleaseDate(release_date)
            const toObject:any=genres_ids.split(',')
            setMovieGenres(toObject[0]) 
            setMovieId(id)
        }

    },[])

    useEffect(()=> {

        const MovieReview=async()=> {
            let apiKey:string|any=process.env.NODE_ENV==='development'?process.env.NEXT_PUBLIC_API_KEY:process.env.API_KEY

            const req=await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=pt-BR`)
            const res=await req.json();
            
            if(res.results && res.results.length>0 && res.results[0].key) {
                setMovieTrailer(`https://www.youtube.com/embed/${res.results[0].key}`)
            }
            else {
                setMovieTrailer("")
            }

        }

        if(movieId) {
            MovieReview();
        }

    },[movieId])




    const addMyList=async()=> {

        try {
            const req=await fetch('https://apicritiflixacesso.onrender.com/myList', {
                method: 'PUT',
                body: JSON.stringify({
                    email:email,
                    movieTitle:movieTitle,
                    movieImage:movieImage,
                    genre:movieGenres,
                    overview:movieOverview,
                    dataRelease:movieReleaseDate,
                    id:movieId,
                    average:movieAvaliation
                }),
                headers:{'Content-Type': 'application/json'}
            })
    
            const response= await req.json();

            if(response.message) {
                setForAddListMsg(response.message);
                setTimeout(()=> {
                    setForAddListMsg("Adicionar")
                },2000)
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
        
    }

    return (
        <ProtectRoute>
            <div className="bg-gray-900 h-screen">
              <MenuBar/>
              <MoviesBox
                titleMovie={movieTitle}
                posterMovie={movieImage}
                releaseDate={movieReleaseDate}
                overviewMovie={movieOverview}
                avaliationMovie={movieAvaliation}
                addMylist={addMyList}
                forAddListMsg={forAddListMsg}
                trailerMovie={movieTrailer}
                showTrailerButton={true}
              />
            </div>
        </ProtectRoute>
      );
}