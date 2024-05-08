"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import '../styles/globals.css';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
    movieInput?:string;
}

const MenuBar=()=> {

    const route=useRouter();

    const [loggedUsername,setLoggedUsername]=useState("");
    const [movieSearch,setMovieSearch]=useState("");
    const [visibleMenu,setVisibleMenu]=useState(false);
    const [visibleGenres,setVisibleGenres]=useState(false);


    useEffect(()=> {

        const value=sessionStorage.getItem('userKey')
        if(value) {
            const user=JSON.parse(value);
            setLoggedUsername(user.userExists.userName)
        }

    },[]);

      const logoutUser=()=> {

        sessionStorage.removeItem('userKey')
        route.push('/Login');
        
      }


    const searchMovie=async()=> {

        let apiKey:string|any=process.env.NODE_ENV==='development'?process.env.NEXT_PUBLIC_API_KEY:process.env.API_KEY

        if(movieSearch!=="") {
            const req=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieSearch}&language=pt-BR`);
                    
            const response=await req.json();

            if(response) {
                sessionStorage.setItem('foundMovies', JSON.stringify(response));
                console.log(response);
                sessionStorage.setItem('searchedTitle',movieSearch)
                console.log(movieSearch)

                route.push('/MovieSearch')
            }

        }

    }


    const showMenu=()=> {
        setVisibleMenu(!visibleMenu);
    }

    const showGenres=()=> {
        setVisibleGenres(!visibleGenres);
    }

    return (
        <div className='sm:w-full md:w-full lg:w-full'>
            <div className="flex p-10 ml-20 justify-around sm:ml-0 md:ml-0 lg:ml-20">
                <div className='flex items-center sm:gap-2 md:gap-6 lg:gap-16 '>
                    <Link href="/HomePage">
                        <h1 className="text-cyan-500 font-semibold sm:text-md lg:text-4xl md:text-xl">Flixorama</h1>
                    </Link>
                    <div className="relative inline-block text-left">
                        <div>
                            <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-20 sm:p-1" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={showGenres}>
                                <p className="sm:text-xs">Gêneros</p>
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {visibleGenres && (
                            <div className="absolute right-0 p-4 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-32" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                                <div className="py-1 flex flex-col relative left-4 gap-3" role="none">
                                    <Link href="/Comedy">
                                        <button className="text-black text-md sm:text-sm">Comedia</button>
                                    </Link>
                                    <Link href="/Animation">
                                        <button className="text-black text-md sm:text-sm">Animação</button>
                                    </Link>
                                    <Link href="/Action">
                                        <button className="text-black text-md sm:text-sm">Ação</button>
                                    </Link>
                                    <Link href="/Suspense">
                                        <button className="text-black text-md sm:text-sm">Suspense</button>
                                    </Link>
                                    <Link href="/Fantasy">
                                        <button className="text-black text-md sm:text-sm">Fantasia</button>
                                    </Link>
                                    <Link href="/Romance">
                                        <button className="text-black text-md sm:text-sm">Romance</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex gap-4'>
                        <input
                            className='p-1 bg-transparent border-b border-white text-white outline-none sm:w-16 md:w-36 lg:w-52'
                            value={movieSearch}
                            onChange={(e)=>setMovieSearch(e.target.value)}
                        >                  
                        </input>
                        <button onClick={searchMovie}>
                                <FontAwesomeIcon  className="text-white text-md sm:relative sm:right-4" icon={faMagnifyingGlass}/>
                        </button>
                </div>
                </div>
                <div className='flex items-center gap-16'>
                    <div className="relative inline-block text-left">
                        <div>
                            <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-24 sm:p-1" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={showMenu}>
                                <p className="sm:text-xs px-2">{loggedUsername}</p>
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {visibleMenu && (
                            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-36" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                                <div className="py-1 flex flex-col relative left-4 gap-3" role="none">
                                    <Link href="/MyList">
                                        <button className="text-black text-md sm:text-sm">Minha Lista</button>
                                    </Link>
                                    <div>
                                        <button className='text-black text-md sm:text-sm' onClick={(e)=>{e.preventDefault();logoutUser()}}>Sair</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuBar;