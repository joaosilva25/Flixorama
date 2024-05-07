import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"


type Props= {
    children:ReactNode
}

const ProtectRoute=({children}:Props)=> {
    const route=useRouter()

    useEffect(()=> {
        const userLogged=sessionStorage.getItem('userKey')

        if(!userLogged) {
            route.push('/Login')
        }

    },[])

    return children
}

export default ProtectRoute;