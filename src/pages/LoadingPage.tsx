import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';



export const LoadingPage=()=> {
    const [letter,setLetter]=useState('text-cyan-500')
    const [showAllLetter,setShowAllLetter] = useState(true)
    const [showLoading,setShowLoading] = useState(false)

    useEffect(()=> {
        const toggleShow=()=> {
            const timer1=setTimeout(()=> {
                setShowAllLetter(false)
                setLetter('text-white text-8xl')
                setShowLoading(true)
            },800)
            const timer2=setTimeout(()=> {
                setShowAllLetter(true)
            },1400)

            
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            }
        }

        toggleShow()
    },[]);

    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col">
                <h1 className="text-cyan-500 text-7xl font-semibold mb-5" style={{transition:'1s ease-in'}}><span className={`${letter} animate-pulse`}>Flixo</span>
                {showAllLetter && 'rama'}</h1>
                {showLoading && (<FontAwesomeIcon  className="text-2xl text-white animate-spin mt-5" icon={faSpinner}/>)}
            </div>
        </div>
    )
}