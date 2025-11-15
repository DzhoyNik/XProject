import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "..";

const AppRouter = () => {
    const location = useLocation()
    const { user } = useContext(Context)

    return(
        <Routes location={location} key={location.pathname}>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}

            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
        </Routes>
    )
}

export default AppRouter