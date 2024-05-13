"use client";
import "../styles/globals.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faFile } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Login.module.css";
import Image from "next/image";

export default function Login() {
  const router = useRouter();

  const [credential, setCredential] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [forUserMessage, setForUserMessage] = useState("");
  const [visibleIcon, setVisibleIcon] = useState(faEye);
  const [passType, setPassType] = useState("password");

  const toggleAccessAreas = () => {
    setCredential(!credential);
    setForUserMessage("");
  };

  const toggleShowPassword = () => {
    if (visibleIcon == faEye) {
      setVisibleIcon(faEyeSlash);
      setPassType("text");
    } else {
      setVisibleIcon(faEye);
      setPassType("password");
    }
  };

  const registerUser = async () => {
    setForUserMessage("Carregando os Servidores ...");

    try {
      const req = await fetch(
        "https://apicritiflixacesso.onrender.com/register",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            userName: userName,
            password: password,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const response = await req.json();

      if (response.message == "OK") {
        setCredential(true);
      } else {
        setForUserMessage(response.message);
      }
    } catch (error) {
      setForUserMessage("Erro na requisição");
    }
  };

  const loginUser = async () => {
    setForUserMessage("Carregando os Servidores ...");

    try {
      const req = await fetch("https://apicritiflixacesso.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const response = await req.json();
      const userLogged = JSON.stringify(response);

      if (response.message == "OK") {
        router.push("/HomePage");
        sessionStorage.setItem("userKey", userLogged);
      } else {
        setForUserMessage(response.message);
      }
    } catch {
      setForUserMessage("Erro na requisição");
    }
  };

  return (
    <div className="overflow-hidden bg-gray-900 xs:overflow-y-scroll">
      {credential ? (
        <div className={`h-screen bg-gray-900 ${styles.bgImage}`}>
          <div className="flex items-center p-10 gap-4">
            <h1 className="text-cyan-500 text-2xl font-semibold xs:text-sm sm:text-xl">
              Flixorama
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mt-12 flex gap-8 flex-col items-center justify-center xs:mt-2 sm:mt-2">
              <h1 className="text-white text-4xl font-bold xs:text-xl sm:text-2xl">
                Login
              </h1>
              <p className="text-white text-md font-normal w-96 text-center xs:text-xs xs:w-64 sm:text-xs sm:w-72">
                Explore os últimos lançamentos! Assista trailers exclusivos,
                leia sinopses e descubra novas histórias. Entre agora para
                embarcar nessa jornada cinematográfica!{" "}
              </p>
            </div>
            <form
              className={`flex items-center justify-center relative top-20 flex-col gap-12 w-1/4 p-8 rounded-md ${styles.loginBox} xs:gap-7 xs:top-3 sm:top-5 sm:gap-7`}
            >
              <input
                className={`p-3 w-80 ${styles.inputStyle} xs:w-56 xs:p-1.5 xs:placeholder:text-sm xs:text-sm sm:w-64 sm:p-2 sm:text-md`}
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
              <div className="flex items-center left-2 relative">
                <input
                  className={`p-3 w-80 ${styles.inputStyle} xs:w-56 xs:p-1.5 xs:placeholder:text-sm xs:text-sm sm:w-64 sm:p-2 sm:text-md`}
                  placeholder="Senha"
                  value={password}
                  type={passType}
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleShowPassword();
                  }}
                >
                  <FontAwesomeIcon
                    className="right-8 relative text-white"
                    icon={visibleIcon}
                  />
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-6 items-center xs:mt-0 sm:mt-0 md:w-96">
                <button
                  className={`p-3 w-80 bg-cyan-500 text-white font-bold xs:p-1.5 xs:w-56 xs:text-sm sm:w-64 sm:p-2 sm:text-sm ${styles.activeBtn}`}
                  onClick={(e) => {
                    e.preventDefault();
                    loginUser();
                  }}
                >
                  Entrar
                </button>
                <h5 className="text-white text-md w-72 text-center font-semibold xs:text-xs sm:text-sm">
                  {forUserMessage}
                </h5>
                <button
                  className="font-light text-white text-md mt-12 xs:text-xs xs:mt-2 sm:mt-8 sm:text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleAccessAreas();
                  }}
                >
                  Ainda não possui uma conta ?{" "}
                  <span className="text-cyan-500 font-semibold">
                    Registre-se aqui
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={`h-screen bg-gray-900 ${styles.bgImage}`}>
          <h1 className="text-cyan-500 text-2xl font-semibold p-10 xs:text-sm sm:text-xl">
            Flixorama
          </h1>
          <div className="flex flex-col items-center justify-center">
            <div className="mt-12 flex gap-8 flex-col items-center justify-center xs:mt-2 sm:mt-2">
              <h1 className="text-white text-4xl font-bold xs:text-xl sm:text-2xl">
                Registrar
              </h1>
              <p className="text-white text-md font-light xs:text-sm sm:text-sm">
                Seja Bem vindo ao Flixorama !
              </p>
            </div>
            <form
              className={`flex items-center justify-center relative top-16 flex-col gap-12 w-1/4 p-8 rounded-md ${styles.loginBox} xs:gap-7 xs:top-3 sm:top-5 sm:gap-8`}
            >
              <input
                className={`p-3 w-80  ${styles.inputStyle} xs:w-56 xs:p-1.5 xs:placeholder:text-sm xs:text-sm sm:w-64 sm:p-2 sm:text-md`}
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
              <input
                className={`p-3 w-80  ${styles.inputStyle} xs:w-56 xs:p-1.5 xs:placeholder:text-sm xs:text-sm sm:w-64 sm:p-2 sm:text-md`}
                placeholder="Username"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              ></input>
              <div className="flex items-center left-2 relative">
                <input
                  className={`p-3 w-80  ${styles.inputStyle} xs:w-56 xs:p-1.5 xs:placeholder:text-sm xs:text-sm sm:w-64 sm:p-2 sm:text-md`}
                  placeholder="Senha"
                  value={password}
                  type={passType}
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleShowPassword();
                  }}
                >
                  <FontAwesomeIcon
                    className="right-8 relative text-white"
                    icon={visibleIcon}
                  />
                </button>
              </div>
              <div className="mt-8 flex flex-col items-center gap-12 xs:mt-0 xs:gap-8 sm:mt-0 sm:gap-8">
                <button
                  className={`p-3 w-80 bg-cyan-500 text-white font-bold xs:w-56 xs:p-1.5 xs:text-sm sm:w-64 sm:p-2 sm:text-sm ${styles.activeBtn}`}
                  onClick={(e) => {
                    e.preventDefault();
                    registerUser();
                  }}
                >
                  Registrar
                </button>
                <h5 className="text-white text-md w-72 text-center font-semibold xs:text-xs sm:text-sm">
                  {forUserMessage}
                </h5>
                <button
                  className="font-light relative  text-white text-md xs:text-xs xs:mt-0 xs:bottom-4 sm:text-sm"
                  onClick={toggleAccessAreas}
                >
                  Já possuo uma conta !{" "}
                  <span className="text-cyan-500 font-semibold">Entrar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
