"use client"
import MenuBar from "@/components/MenuBar";
import '../styles/globals.css';
import { MoviesBox } from "@/components/MoviesBox";
import SelectedMoviesCard from "@/components/SelectedMovies";
import { useEffect,useState } from "react";
import ProtectRoute from "@/components/ProtectRoute";




export default function HomePage() {

  const [movieTitle, setMovieTitle] = useState('');
  const [movieImage, setMovieImage] = useState('');
  const [movieAvaliation, setMovieAvaliation] = useState(0);
  const [overview, setOverview] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genres, setGenres] = useState("");
  const [email, setEmail] = useState();
  const [forAddListMsg, setForAddListMsg] = useState("");
  const [movieId, setMovieId] = useState("");
  const [favoritesGenres, setFavoritesGenres] = useState([]);
  let [movieIndex, setMovieIndex] = useState(0)

    


  useEffect(() => {
    

    const MovieRequest = async () => {
        setForAddListMsg("Adicionar");
        try {
            
            let apiKey=process.env.NEXT_PUBLIC_API_KEY

            const req= await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc`);
            
            if (req.ok) {
                const data = await req.json();

                setMovieTitle(data.results[movieIndex].original_title);
                setMovieAvaliation(data.results[movieIndex].vote_average.toFixed(1));
                setOverview(data.results[movieIndex].overview);
                setReleaseDate(data.results[movieIndex].release_date);
                setFavoritesGenres(data.results[movieIndex].genre_ids[0])
                setReleaseDate(data.results[movieIndex].release_date);
                setMovieId(data.results[movieIndex].id)

                let listGenres=[];
                for (let i=0;i<data.results[movieIndex].genre_ids.length;i++) {
                    listGenres.push(data.results[movieIndex].genre_ids[i]);
                }

                let stringListGenres=listGenres.join(' / ');
                setGenres(stringListGenres);

                if (data.results[movieIndex].poster_path) {
                    const imageUrl = `https://image.tmdb.org/t/p/w500${data.results[movieIndex].poster_path}`;
                    setMovieImage(imageUrl);
                }

                if(movieIndex<19) {
                    setMovieIndex(movieIndex+1)
                }
                else {
                    setMovieIndex(0)
                }
            }
            } catch (error) {
                console.error('Error:', error);
            }
    };


    const movieInterval=setTimeout(()=> {
        MovieRequest()
    },3000)

    return () => {
        clearTimeout(movieInterval);
    };

}, [movieIndex]);


const addMyList=async()=> {
            
    const userLogged=sessionStorage.getItem('userKey')
                
    if(userLogged) {
        const userEmail=JSON.parse(userLogged)
        setEmail(userEmail.userExists.email)
    }

    try {
        const req=await fetch('https://apicritiflixacesso.onrender.com/myList', {
            method: 'PUT',
            body: JSON.stringify({
                email:email,
                movieTitle:movieTitle,
                movieImage:movieImage,
                genre:genres,
                overview:overview,
                dataRelease:releaseDate,
                id:movieId,
                average:movieAvaliation
            }),
            headers:{'Content-Type': 'application/json'}
        })

        const response= await req.json();

        if(response.message) {
            setForAddListMsg(response.message);

            setTimeout(()=> {
                setForAddListMsg("Adicionar");
            },2000)
        }
    }
    catch (error) {
        console.error('Error:', error);
    }

}



    return (
        <ProtectRoute>
            <div className="bg-gray-900 h-screen sm:h-full">
                <>
                <MenuBar/>
                <MoviesBox
                    titleMovie={movieTitle}
                    posterMovie={movieImage}
                    releaseDate={releaseDate}
                    overviewMovie={overview}
                    genresMovie={genres}
                    avaliationMovie={movieAvaliation}
                    addMylist={addMyList}
                    forAddListMsg={forAddListMsg}
                    showTrailerButton={false}
                />
                </>
                <div className="bg-gray-900 h-3/4 gap-10 flex flex-col items-center">
                    <h1 className="text-white font-bold mt-12 sm:text-xl md:text-3xl lg:text-4xl">O que selecionamos para você !</h1>
                    <h2 className="text-white text-center font-light sm:text-sm sm:w-80  md:w-3/4 md:text-xl lg:w-1/3 lg:text-xl">Levando em consideração os seus gostos pessoais
                        nos escolhemos estes filmes que possívelmente você adoraria conhecer
                    </h2>
                    <SelectedMoviesCard/>
                </div>
            </div>
        </ProtectRoute>
      );
}