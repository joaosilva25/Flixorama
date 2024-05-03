"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';


export const MenuBar=()=> {

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

        if(movieSearch!=="") {
            const req=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=23e36f1698459eaf0b278eb6a5a008b1&query=${movieSearch}&language=pt-BR`);
                    
            const response=await req.json();
            console.log(response)

            sessionStorage.setItem('foundMovies', JSON.stringify(response));
            sessionStorage.setItem('searchedTitle',movieSearch)
        }

    }

    const showMenu=()=> {
        setVisibleMenu(!visibleMenu);
        console.log(visibleMenu)

    }

    const showGenres=()=> {
        setVisibleGenres(!visibleGenres);
        console.log(visibleMenu)

    }

    return (
        <>
            <div className="flex p-10 ml-20 font-sans justify-around">
                <div className='flex gap-16 items-center'>
                    <h1 className="text-cyan-500 text-3xl font-semibold">Flixorama</h1>
                    <Link href="/HomePage">
                        <button className="text-white text-md">Home</button>
                    </Link>
                        <div className="relative inline-block text-left">
                        <div>
                            <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={showGenres}>
                                Genres
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {visibleGenres && (
                            <div className="absolute right-0 p-4 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div className="py-1 flex flex-col relative left-4 gap-3 " role="none">
                                    <Link href="/Comedy">
                                        <button className="text-black text-md">Comedy</button>
                                    </Link>
                                    <Link href="/Animation">
                                        <button className="text-black text-md">Animation</button>
                                    </Link>
                                    <Link href="/Action">
                                        <button className="text-black text-md">Action</button>
                                    </Link>
                                    <Link href="/Suspense">
                                        <button className="text-black text-md">Suspense</button>
                                    </Link>
                                    <Link href="/Fantasy">
                                        <button className="text-black text-md">Fantasy</button>
                                    </Link>
                                    <Link href="/Romance">
                                        <button className="text-black text-md">Romance</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link href="/MyList">
                        <button className="text-white text-md">My List</button>
                    </Link>
                    <div className='flex gap-4'>
                        <input
                            className='p-1 w-52 bg-transparent border-b border-white text-white outline-none'
                            value={movieSearch}
                            onChange={(e)=>setMovieSearch(e.target.value)}
                        >                  
                        </input>
                        <Link href="/MovieSearch">
                            <button onClick={searchMovie}>
                                <FontAwesomeIcon  className="text-white text-md" icon={faMagnifyingGlass}/>
                            </button>
                        </Link>
                </div>
                </div>
                <div className='flex items-center gap-16'>
                    <h3 className='text-cyan-500 relative left-10'>{loggedUsername}</h3>
                    <div className="relative inline-block text-left">
                        <div>
                            <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={showMenu}>
                                Menu
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {visibleMenu && (
                            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div className="py-1" role="none">
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Minha Conta</a>
                                    <button className='text-black relative left-4' onClick={(e)=>{e.preventDefault();logoutUser()}}>Sair</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}