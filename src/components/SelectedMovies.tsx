import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "../styles/globals.css";
import styles from "../styles/HudMovies.module.css";
import { Container } from "postcss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import movie from "../types/movie";

const SelectedMoviesCard = () => {
  const [genresCode, setGenresCode] = useState<string[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<movie[]>([]);
  const [recommendedMoviesPoster, setRecommendedMoviesPoster] = useState<any>(
    []
  );
  const [cordinateXMove, setCordinateXMove] = useState(0);

  const scrollArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userLogged = sessionStorage.getItem("userKey");

    if (userLogged) {
      const objectUser = JSON.parse(userLogged);

      const updateUserLogged = async () => {
        const req = await fetch(
          `https://apicritiflixacesso.onrender.com/userData?email=${objectUser.userExists.email}`,
          {
            method: "GET",
          }
        );

        const res = await req.json();

        const userToString = JSON.stringify(res);

        sessionStorage.setItem("userKey", userToString);

        const myUserUpdated = sessionStorage.getItem("userKey");

        if (myUserUpdated) {
          const myUserUpdatedToObject = JSON.parse(myUserUpdated);

          for (
            let i = 0;
            i < myUserUpdatedToObject.userExists.myList.length;
            i++
          ) {
            setGenresCode((prev) => [
              ...prev,
              myUserUpdatedToObject.userExists.myList[i].genre,
            ]);
          }
        }
      };

      updateUserLogged();
    }
  }, []);

  useEffect(() => {
    let apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const recommendMovies = async () => {
      const genresCodeToString = genresCode.join(",");

      const req = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&with_genres=${genresCodeToString}&sort_by=popularity.desc&vote_average.gte=6`
      );
      const res = await req.json();

      if (res.results && res.results.length > 0) {
        setRecommendedMovies(res.results);
      }
    };

    recommendMovies();
  }, [genresCode]);

  useEffect(() => {
    let posters = [];

    for (let i = 0; i < recommendedMovies.length; i++) {
      posters.push(
        `https://image.tmdb.org/t/p/original/${recommendedMovies[i].poster_path}`
      );
    }

    setRecommendedMoviesPoster(posters.splice(0, 11));
  }, [recommendedMovies]);

  const slideToLeft = () => {
    const scrollSpace = scrollArea.current;

    if (scrollSpace) {
      scrollSpace.scrollTo({
        left: (scrollSpace.scrollLeft -= 40),
        behavior: "smooth",
      });
    }
  };

  const slideToRight = () => {
    const scrollSpace = scrollArea.current;

    if (scrollSpace) {
      scrollSpace.scrollTo({
        left: (scrollSpace.scrollLeft += 40),
        behavior: "smooth",
      });
    }
  };

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
    <div className="flex gap-10 bg-gray-900 xs:w-full xs:justify-center">
      <button className="text-white" onClick={slideToLeft}>
        <FontAwesomeIcon
          className={`${styles.iconSlideShow}`}
          icon={faAngleLeft}
        />
      </button>
      <div
        className="flex gap-2 h-3/3 p-2 mt-10 overflow-x-hidden overscroll-y-none items-center justify-center"
        ref={scrollArea}
      >
        <div className={`h-96 flex gap-2 ${styles.movieScrollArea}`}>
          {recommendedMovies.map((movie, index) => (
            <div key={index}>
              {recommendedMoviesPoster[index] && (
                <Link href="/MoviePage">
                  <div
                    className={`h-80 w-52 bg-cover bg-center ${styles.selectedMovieSlide} xs:h-72 sm:h-72`}
                    style={{
                      backgroundImage: `url(${recommendedMoviesPoster[index]})`,
                    }}
                    onClick={() =>
                      sendMovieDates(
                        recommendedMoviesPoster[index],
                        movie.original_title,
                        movie.vote_average,
                        movie.overview,
                        movie.release_date,
                        movie.genre_ids,
                        movie.id
                      )
                    }
                  ></div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <button className="text-white" onClick={slideToRight}>
        <FontAwesomeIcon
          className={`${styles.iconSlideShow}`}
          icon={faAngleRight}
        />
      </button>
    </div>
  );
};

export default SelectedMoviesCard;
