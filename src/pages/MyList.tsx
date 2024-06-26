import { useEffect, useState } from "react";
import "../styles/globals.css";
import MenuBar from "@/components/MenuBar";
import Link from "next/link";
import styles from "../styles/HudMovies.module.css";
import movie from "../types/movie";
import ProtectRoute from "@/components/ProtectRoute";

export default function MyList() {
  const [movie, setMovie] = useState<movie[]>([]);
  const [moviePosters, setMoviePosters] = useState<string[]>([]);
  const [showMoviesList, setMoviesList] = useState(false);
  const [emptyMovieList, setEmptyMovieList] = useState(false);

  useEffect(() => {
    const userData = async () => {
      const userLoggedIn = sessionStorage.getItem("userKey");

      if (userLoggedIn) {
        const userObject = JSON.parse(userLoggedIn);
        const email = userObject.userExists.email;

        const req = await fetch(
          `https://apicritiflixacesso.onrender.com/userData?email=${email}`,
          {
            method: "GET",
          }
        );

        const response = await req.json();
        console.log(response);

        if (response) {
          setMoviesList(true);
        
          if(response.userExists.myList.length>0) {
            setMovie(response.userExists.myList);

          }
          else {
            setEmptyMovieList(true);
          }

          let posters = [];

          for (let i = 0; i < response.userExists.myList.length; i++) {
            posters.push(response.userExists.myList[i].poster);
          }

          setMoviePosters(posters);
        }
      }
    };

    userData();
  }, []);

  const sendMovieDates = (
    moviePoster: string,
    movieTitle: string,
    movieOverview: string,
    movieReleaseDate: string,
    movieId: string,
    averageMovie: number
  ) => {
    sessionStorage.setItem("poster", moviePoster);
    sessionStorage.setItem("title", movieTitle);
    sessionStorage.setItem("overview", movieOverview);
    sessionStorage.setItem("releaseDate", movieReleaseDate);
    sessionStorage.setItem("id", movieId);
    sessionStorage.setItem("avaliation", averageMovie.toString());
  };

  return (
    <ProtectRoute>
      <div className="bg-gray-900 h-screen">
        <MenuBar />
        <div className="bg-gray-900 p-24 items-center justify-center">
          <h3 className="text-white font-semibold text-2xl xs:text-xl xs:relative xs:right-8 sm:text-xl sm:relative sm:right-8 md:ml-0 lg:ml-32">
            Minha Lista
          </h3>
          {emptyMovieList &&
            <div className="flex text-center items-center justify-center h-96">
                <h1 className="font-bold text-2xl text-white xs:text-base sm:text-base">+ Lista Vazia</h1>
            </div>
          }
          <div className="flex items-center justify-center md:w-full">
            <div className="p-8 flex items-center justify-center gap-3 flex-wrap mt-38">
              {showMoviesList ? (
                <div className="p-8 flex gap-3 flex-wrap md:w-full md:mt-10 lg:mt-30 lg:w-3/4">
                  {movie.map((movie, index) => (
                    <div key={index}>
                      {moviePosters[index] && (
                        <Link href="/MoviePage">
                          <button
                            className={`h-80 w-56 bg-cover bg-center ${styles.movieSlide}`}
                            style={{
                              backgroundImage: `url(${moviePosters[index]})`,
                            }}
                            onClick={() =>
                              sendMovieDates(
                                moviePosters[index],
                                movie.title,
                                movie.overview,
                                movie.dateRelease,
                                movie.id,
                                movie.average
                              )
                            }
                          ></button>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative top-40 xs:top-12 sm:top-32">
                  <div className="text-white text-2xl font-bold xs:text-base sm:text-xl">
                    Carregando...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectRoute>
  );
}
