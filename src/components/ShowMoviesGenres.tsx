import { useState } from "react";
import { useEffect } from "react";
import MenuBar from "./MenuBar";
import Link from "next/link";
import "../styles/globals.css";
import styles from "../styles/HudMovies.module.css";
import movie from "../types/movie";

type Props = {
  genreCode: number;
  genreName: string;
  genrePage: number;
};

const ShowMoviesGenres = ({ genreCode, genreName, genrePage }: Props) => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const [movies, setMovies] = useState<movie[]>([]);
  const [moviePosters, setMoviePosters] = useState<string[]>([]);

  useEffect(() => {
    let apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const MovieRequest = async () => {
      try {
        const req = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&with_genres=${genreCode}&page=${genrePage}`
        );

        if (req.ok) {
          const response = await req.json();

          if (response) {
            setMovieTitle(response.original_title);
            setMovies(response.results);

            let posters = [];

            if (response.results.backdrop_path != null) {
              posters = response.results.map(
                (movie: movie) =>
                  `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
              );
            } else {
              posters = response.results.map(
                (movie: movie) =>
                  `https://image.tmdb.org/t/p/original/${movie.poster_path}`
              );
            }

            setMoviePosters(posters);
          }
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    MovieRequest();
  }, [genreCode, genrePage]);

  const sendMovieDates = (
    moviePoster: string,
    movieTitle: string,
    movieAvaliation: string,
    movieOverview: string,
    movieReleaseDate: string,
    movieGenres: string,
    movieId: string
  ) => {
    sessionStorage.setItem("poster", moviePoster);
    sessionStorage.setItem("title", movieTitle);
    sessionStorage.setItem("avaliation", movieAvaliation);
    sessionStorage.setItem("overview", movieOverview);
    sessionStorage.setItem("releaseDate", movieReleaseDate);
    sessionStorage.setItem("genres", movieGenres);
    sessionStorage.setItem("id", movieId);
  };

  return (
    <div className="bg-gray-900">
      <MenuBar />
      <div className="bg-gray-900 p-24 items-center justify-center">
        <h3 className="text-white font-semibold text-2xl xs:text-xl xs:relative xs:right-8 xs:bottom-8 sm:text-xl sm:relative sm:right-8 sm:bottom-8 md:ml-0 lg:ml-32">
          {genreName}
        </h3>
        <div className="flex items-center justify-center">
          <div className="p-8 flex gap-3 flex-wrap lg:mt-30 lg:w-3/4 md:w-full md:mt-10">
            {movies.map((movie, index) => (
              <div key={index} className="flex flex-col items-center">
                {" "}
                {/* Adicionado um container flexível para alinhar o título e a imagem verticalmente */}
                {moviePosters[index] && (
                  <Link href="/MoviePage">
                    <button
                      className={`h-80 w-56 bg-cover bg-center ${styles.movieSlide}`}
                      style={{ backgroundImage: `url(${moviePosters[index]})` }}
                      onClick={() =>
                        sendMovieDates(
                          moviePosters[index],
                          movie.original_title,
                          movie.vote_average,
                          movie.overview,
                          movie.release_date,
                          movie.genre_ids,
                          movie.id
                        )
                      }
                    ></button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMoviesGenres;
