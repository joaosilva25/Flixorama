import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faThumbsUp, faThumbsDown,faPlay } from '@fortawesome/free-solid-svg-icons';
import { faStar, faEye,faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import '../styles/globals.css';
import styles from "../styles/HudMovies.module.css"


type Props = {
    titleMovie:string;
    posterMovie:string;
    releaseDate:string;
    overviewMovie:string;
    genresMovie?:string;
    avaliationMovie:number;
    addMylist:()=>void;
    forAddListMsg:string;
    trailerMovie?:string;
    showTrailerButton?:boolean;
}

export const MoviesBox = ({titleMovie,posterMovie,releaseDate,overviewMovie,genresMovie,avaliationMovie,forAddListMsg,addMylist,trailerMovie,showTrailerButton}:Props) => {
    const [movieDescription, setMovieDescription] = useState(false);
    const [movieShowTrailer, setMovieShowTrailer] = useState(false);
    const [showIcon,setShowIcon] = useState(faEye);

    const showMovieDescription=()=> {
        setMovieDescription(!movieDescription)
        setMovieShowTrailer(false)

        if(showIcon==faEye) {
            setShowIcon(faEyeSlash)
        }
        else {
            setShowIcon(faEye)
        }
    }

    const showMovieTrailer=()=> {
        setMovieShowTrailer(!movieShowTrailer)

        setMovieDescription(false)
    }




    return (
        <div className='flex items-center justify-center'>
            <div className='p-20 '>
                {posterMovie && (
                    <div className={`bg-cover bg-center flex items-center justify-center ${styles.boxMovies}`} style={{backgroundImage:`url(${posterMovie})`}}>
                        <div className="btnMovies flex gap-2 mt-6 relative top-52">
                            {showTrailerButton &&
                                <button className={`p-3 w-32 bg-black font-bold text-white ${styles.movieButton}`} onClick={showMovieTrailer}>
                                    <FontAwesomeIcon className='text-white mr-2' icon={faPlay} />
                                    Trailer
                                </button>
                            }
                            <button className={`bg-cyan-500 text-white p-3 w-32 font-bold ${styles.movieButton}`} onClick={showMovieDescription}>
                                <FontAwesomeIcon className='text-white mr-2' icon={showIcon}/>
                                Detalhes
                            </button>
                            <h3 className="text-white">{forAddListMsg}</h3>
                            <button className={`p-3 w-32 bg-yellow-400 font-bold text-black ${styles.movieButton}`} onClick={()=>addMylist()}>
                                <FontAwesomeIcon className='mr-2' icon={faPlus}/>
                                My List
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {movieDescription &&
            <div className='p-24 w-1/2 flex items-center justify-center'>
                <div className='justify-center items-center'>
                    <h3 className="text-white font-black text-2xl mb-4">{titleMovie}</h3>
                    <p className="text-cyan-500 font-semibold text-2xl mb-4">{avaliationMovie}</p>
                    <p className="text-white font-bold mb-4 text-lg">{releaseDate}</p>
                    <p className="text-white w-18 text-lg text-justify">{overviewMovie}</p>
                </div>
            </div>
            }    
            {movieShowTrailer &&     
                <iframe className="bg-black" src={trailerMovie} width={500} height={400}/>
            }
        </div>
    );
};