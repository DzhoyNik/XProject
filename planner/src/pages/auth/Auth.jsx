import React, { useContext, useEffect, useState } from "react"
import { IoLockClosed, IoMail, IoPerson } from "react-icons/io5"
import "./auth.css"
import logo from "../../assets/logo.png"
import { observer } from "mobx-react-lite"
import { NavLink, useNavigate, useSearchParams } from "react-router-dom"
import { AUTH_ROUTE, NEWS_ROUTE } from "../../utils/consts"
import { toast } from "react-toastify"
import { signIn, signUp } from "../../api/userAPI"
import { Context } from "../.."

const Auth = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams()
    const page = searchParams.get("page")
    const stage = searchParams.get("stage")

    const [ firstName, setFirstName ] = useState("")
    const [ name, setName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ login, setLogin ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    useEffect(() => {
        document.title = "XProject | planner"
    }, [])

    const handleNextStage = () => {
        if (!firstName || !name || !lastName) {
            toast.warn("Заполните поля")
            return 0
        }
        navigate(`${AUTH_ROUTE}?page=signup&stage=2`)
    }

    const handleSignUp = async () => {
        if (!login || !email || !password) {
            toast.warn("Заполните поля")
            return 0
        }

        let data
        const payload = { firstName, name, lastName, login, email, password }

        try {
            data = await signUp({ payload })
            user.setUser(data)
            user.setIsAuth(true)
            navigate(NEWS_ROUTE)
        } catch (e) {
            toast.error(e.message)
            return 0
        }
    }

    const handleSignIn = async () => {
        if (!login || !password) {
            toast.warn("Заполните поля!")
            return 0
        }

        const payload = { login, password }
        try {
            await signIn({ payload }).then(data => {
                user.setUser(data)
                user.setIsAuth(true)
                navigate(NEWS_ROUTE)
            })
        } catch (e) {
            toast.error(e.message)
            return 0
        }
    }

    console.log(user)

    return(
        <div className="auth">
            <div className="auth-sidebar">
                {page === "signup" ? (
                    stage === "1" ? (
                        <div className="auth-form">
                            <h1>Как вас зовут?</h1>
                            <div className="input-section">
                                <input type="text" placeholder="Введите фамилию" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ paddingLeft: "1rem" }} />
                            </div>
                            <div className="input-section">
                                <input type="text" placeholder="Введите имя" value={name} onChange={(e) => setName(e.target.value)} style={{ paddingLeft: "1rem" }} />
                            </div>
                            <div className="input-section">
                                <input type="text" placeholder="Введите отчество" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ paddingLeft: "1rem" }} />
                            </div>
                            <button type="button" onClick={handleNextStage}>Далее</button>
                            <p><NavLink to={AUTH_ROUTE}>Войти в аккаунт</NavLink></p>
                        </div>
                    ) : (
                        <div className="auth-form" style={{ textAlign: "center" }}>
                            <h1>Данные для входа</h1>
                            <div className="input-section">
                                <input type="text" placeholder="Введите логин" value={login} onChange={(e) => setLogin(e.target.value)} />
                                <IoPerson />
                            </div>
                            <div className="input-section">
                                <input type="email" placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <IoMail />
                            </div>
                            <div className="input-section">
                                <input type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <IoLockClosed />
                            </div>
                            <button type="button" onClick={handleSignUp}>Создать аккаунт</button>
                            <p><NavLink to={AUTH_ROUTE}>Войти в аккаунт</NavLink></p>
                        </div>
                    )
                ) : (
                    <div className="auth-form">
                        <h1>Добро пожаловать</h1>
                        <div className="input-section">
                            <input type="text" placeholder="Введите логин" value={login} onChange={(e) => setLogin(e.target.value)} />
                            <IoPerson />
                        </div>
                        <div className="input-section">
                            <input type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <IoLockClosed />
                        </div>
                        <button type="button" onClick={handleSignIn}>Войти</button>
                        <p><NavLink to={AUTH_ROUTE + "?page=signup&stage=1"}>Нет аккаунта?</NavLink> или <NavLink to="">забыли пароль?</NavLink></p>
                    </div>
                )}
            </div>
            <div className="auth-footage">
                <div className="auth-overlay">
                    <img src={logo} alt="Логотип компании" />
                </div>
                <video autoPlay loop muted playsInline>
                    <source src="/videos/intro.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    )
})

export default Auth