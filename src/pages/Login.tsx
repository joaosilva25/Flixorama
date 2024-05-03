"use client"
import '../styles/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash,faFile }from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Login.module.css'
import Image from 'next/image'; 




export default function Login() {

    const router=useRouter();

    const [credential, setCredential] = useState(true);
    const [email,setEmail]=useState("");
    const [password,setPassword] = useState("");
    const [userName,setUserName] = useState("");
    const [forUserMessage,setForUserMessage] = useState("");
    const [visibleIcon,setVisibleIcon] = useState(faEye);
    const [passType,setPassType] = useState('password');

    const toggleAccessAreas = () => {
        setCredential(!credential);
        setForUserMessage("");
    }

    const toggleShowPassword= ()=> {
        if(visibleIcon==faEye) {
            setVisibleIcon(faEyeSlash);
            setPassType('text');
        }
        else {
            setVisibleIcon(faEye);
            setPassType('password');
        }
    }

    const registerUser=async()=> {
        setForUserMessage("");
        try {
            const req=await fetch('https://apicritiflixacesso.onrender.com/register', {
                method: 'POST',
                body: JSON.stringify({
                    email:email,
                    userName:userName,
                    password:password
                }),     
                headers: {'Content-Type':'application/json'},
            })
        
            const response=await req.json();
            console.log(response)

            if(response.message=="OK") {
                setCredential(true);
            }
            else {
                setForUserMessage(response.message);
            }

        }
        catch (error) {
            setForUserMessage("Erro na requisição");
        }

    }

    const loginUser=async()=> {
        
        try {
            const req=await fetch('https://apicritiflixacesso.onrender.com/login', {
                method: 'POST',
                body: JSON.stringify({
                    email:email,
                    password:password
                }),
                headers:{'Content-Type':'application/json'}
            })

            const response=await req.json();
            const userLogged=JSON.stringify(response)
            console.log(userLogged)

            if (response.message=="OK") {
                router.push('/HomePage')
                sessionStorage.setItem('userKey',userLogged)
            }
            else {
                setForUserMessage(response.message);
            }
        }
        catch {
            setForUserMessage("Erro na requisição");
        }


    }



    return (
        <div>
            {credential ? (
                 <div className={`h-screen bg-gray-900 ${styles.bgImage}`}>
                    <div className='flex items-center p-10 gap-4'>
                        <h1 className="text-cyan-500 text-2xl font-semibold">Flixorama</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className='mt-12 flex gap-8 flex-col items-center justify-center'>
                            <h1 className="text-white text-4xl font-bold">Entrar</h1>
                            <p className="text-white text-md font-light">Bem vindo de volta, sentimos sua falta !</p>
                        </div>
                        <form className={`flex items-center justify-center relative top-20 flex-col gap-12 w-1/4 p-8 rounded-md ${styles.loginBox}`}>
                            <input 
                                className={`p-3 w-80 ${styles.inputStyle}`}
                                placeholder='Email'
                                value={email}
                                onChange={event=>setEmail(event.target.value)}
                            >
                            </input>
                            <div className='flex items-center left-2 relative'>
                                <input 
                                    className={`p-3 w-80 ${styles.inputStyle}`} 
                                    placeholder="Senha"
                                    value={password}
                                    type={passType}
                                    onChange={event=>setPassword(event.target.value)}
                                >
                                </input>
                                <button onClick={(e)=>{e.preventDefault();toggleShowPassword()}}>
                                    <FontAwesomeIcon className='right-8 relative text-white' icon={visibleIcon} />
                                </button>
                            </div>
                            <div className='mt-8 flex flex-col gap-6 items-center'>
                                <button className='p-3 w-80 bg-cyan-500 text-white font-bold' onClick={(e)=>{e.preventDefault();loginUser()}}>Entrar</button>
                                <h5 className='text-white text-md w-72 text-center font-semibold'>{forUserMessage}</h5>
                                <button className='font-light text-white text-md mt-12' onClick={(e)=>{e.preventDefault();toggleAccessAreas()}}>Ainda não possui uma conta ? <span className='text-cyan-500 font-semibold'>Registre-se aqui</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className={`h-screen bg-gray-900 ${styles.bgImage}`}>
                    <h1 className="text-cyan-500 text-2xl font-semibold p-10">Flixorama</h1>
                    <div className="flex flex-col items-center justify-center">
                        <div className='mt-12 flex gap-8 flex-col items-center justify-center'>
                            <h1 className="text-white text-4xl font-bold">Registrar</h1>
                            <p className="text-white text-md font-light">Seja Bem vindo ao CritiFlix!</p>
                        </div>
                        <form className={`flex items-center justify-center relative top-16 flex-col gap-12 w-1/4 p-8 rounded-md ${styles.loginBox}`}>
                            <input 
                                className={`p-3 w-80  ${styles.inputStyle}`}
                                placeholder='Email'
                                value={email}
                                onChange={event=>setEmail(event.target.value)}
                            >
                            </input>
                            <input
                                className={`p-3 w-80  ${styles.inputStyle}`}
                                placeholder="Username"
                                value={userName}
                                onChange={event=>setUserName(event.target.value)}
                            >
                            </input>
                            <div className='flex items-center left-2 relative'>
                                <input
                                    className={`p-3 w-80  ${styles.inputStyle}`}
                                    placeholder="Senha"
                                    value={password}
                                    type={passType}
                                    onChange={event=>setPassword(event.target.value)}
                                >
                                </input>
                                <button onClick={(e)=>{e.preventDefault();toggleShowPassword()}}>
                                    <FontAwesomeIcon className='right-8 relative text-white' icon={visibleIcon} />
                                </button>
                            </div>
                            <div className='mt-8 flex flex-col gap-12'>
                                <button className='p-3 w-80  bg-cyan-500 text-white font-bold' onClick={(e)=>{e.preventDefault();registerUser()}}>Registrar</button>
                                <h5 className='text-white text-md w-72 text-center font-semibold'>{forUserMessage}</h5>
                                <button className='font-light text-white text-md' onClick={toggleAccessAreas}>Já possuo uma conta ! <span className='text-cyan-500 font-semibold'>Entrar</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
