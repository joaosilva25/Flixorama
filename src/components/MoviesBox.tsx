import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faThumbsUp,
  faThumbsDown,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faStar, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import "../styles/globals.css";
import styles from "../styles/HudMovies.module.css";

type Props = {
  titleMovie: string;
  posterMovie: string;
  releaseDate: string;
  overviewMovie: string;
  genresMovie?: string;
  avaliationMovie: number;
  addMylist: () => void;
  forAddListMsg: string;
  trailerMovie?: string;
  showTrailerButton?: boolean;
};

export const MoviesBox = ({
  titleMovie,
  posterMovie,
  releaseDate,
  overviewMovie,
  genresMovie,
  avaliationMovie,
  forAddListMsg,
  addMylist,
  trailerMovie,
  showTrailerButton,
}: Props) => {
  const [movieDescription, setMovieDescription] = useState(false);
  const [movieShowTrailer, setMovieShowTrailer] = useState(false);
  const [showIcon, setShowIcon] = useState(faEye);

  const showMovieDescription = () => {
    setMovieDescription(!movieDescription);
    setMovieShowTrailer(false);

    if (showIcon == faEye) {
      setShowIcon(faEyeSlash);
    } else {
      setShowIcon(faEye);
    }
  };

  const showMovieTrailer = () => {
    setMovieShowTrailer(!movieShowTrailer);

    setMovieDescription(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 xs:flex-col sm:flex-col md:flex-col lg:flex-row">
      <div className="p-20">
        {posterMovie && (
          <div
            className="bg-cover bg-center h-96 w-96 flex items-center justify-center xs:w-movieBoxMobile xs:h-movieBoxMobile sm:w-movieBoxMobile sm:h-movieBoxMobile md:w-movieBoxMdAndLgDevices md:h-movieBoxMdAndLgDevices lg:w-movieBoxMdAndLgDevices lg:h-movieBoxMdAndLgDevices"
            style={{ backgroundImage: `url(${posterMovie})` }}
          >
            <div className="btnMovies flex gap-2 mt-6 relative top-52 xs:top-36 sm:top-36">
              {showTrailerButton && (
                <button
                  className={`p-3 w-32 bg-black font-bold text-white flex justify-center items-center ${styles.movieButton} xs:w-24 xs:h-10 sm:w-24 sm:h-10`}
                  onClick={showMovieTrailer}
                >
                  <FontAwesomeIcon
                    className="text-white mr-2 xs:text-xs sm:text-xs"
                    icon={faPlay}
                  />
                  <p className="text-sm xs:text-xs sm:text-xs">Trailer</p>
                </button>
              )}
              <button
                className={`bg-cyan-500 text-white p-3 w-32 font-bold  flex justify-center items-center ${styles.movieButton} xs:w-24 xs:h-10 sm:w-24 sm:h-10`}
                onClick={showMovieDescription}
              >
                <FontAwesomeIcon
                  className="text-white mr-2 xs:text-xs sm:text-xs"
                  icon={showIcon}
                />
                <p className="text-sm xs:text-xs sm:text-xs">Detalhes</p>
              </button>
              <button
                className={`p-3 w-32 bg-yellow-600 font-bold text-white flex justify-center items-center ${styles.movieButton} xs:w-24 xs:h-10 sm:w-24 sm:h-10`}
                onClick={() => addMylist()}
              >
                <FontAwesomeIcon className="mr-2 xs:text-xs sm:text-xs" icon={faPlus} />
                <p className="text-sm xs:text-xs sm:text-xs">{forAddListMsg}</p>
              </button>
            </div>
          </div>
        )}
      </div>
      {movieDescription && (
        <div className="p-24 flex items-center justify-center bg-gray-900 lg:w-1/2 md:w-full md:relative bottom-12">
          <div className="justify-center items-center">
            <h3 className="text-white font-black text-2xl mb-4">
              {titleMovie}
            </h3>
            <p className="text-cyan-500 font-semibold text-2xl mb-4">
              {avaliationMovie}
            </p>
            <p className="text-white font-bold mb-4 text-lg">{releaseDate}</p>
            <p className="text-white w-18 text-lg text-justify xs:text-sm xs:text-left xs:w-72 sm:text-sm sm:text-left sm:w-72">
              {overviewMovie}
            </p>
          </div>
        </div>
      )}
      {movieShowTrailer && trailerMovie !== "" ? (
        <div className="flex justify-center items-center xs:p-12 sm:p-24 md:p-24">
          <iframe
            className="bg-black xs:w-movieBoxMobile xs:h-60 sm:w-movieBoxMobile sm:h-60"
            src={trailerMovie}
            width={500}
            height={400}
          />
        </div>
      ) : (
        movieShowTrailer &&
        trailerMovie == "" && (
          <div className="flex justify-center items-center xs:p-24 sm:p-24 md:p-24">
            <h1 className="text-white text-2xl font-bold text-center xs:text-sm sm:text-sm sm:w-80">
              Trailer Indisponível no momento
            </h1>
          </div>
        )
      )}
    </div>
  );
};
