import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.js";
import "./styles/style.css"
import "./styles/fonts.css"
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "./index.js";
import { check } from "./api/userAPI.js";

const App = observer(() => {
    const { user } = useContext(Context)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            user.setIsAuth(false)
            setLoading(false)
            return
        }

        check()
            .then(data => {
                user.setUser(data)
                user.setIsAuth(true)
            })
            .catch(() => {
                localStorage.removeItem("token")
                user.setIsAuth(false)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }

    return(
        <BrowserRouter>
            <AppRouter />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />
        </BrowserRouter>
    )
})

export default App