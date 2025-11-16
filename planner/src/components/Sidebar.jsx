import React from "react";
import "../styles/sidebar.css"
import Logo from "../assets/logo.png"
import {
    IoNewspaper,
    IoFolderOpen,
    IoBusiness,
    IoGrid,
    IoSettings,
    IoNewspaperOutline,
    IoFolderOpenOutline,
    IoBusinessOutline,
    IoGridOutline,
    IoSettingsOutline,
    IoLogOutOutline
} from "react-icons/io5"
import { NavLink } from "react-router-dom";
import { COMPANY_ROUTE, LOGOUT_ROUTE, NEWS_ROUTE, NOTES_ROUTE, PROJECTS_ROUTE, SETTINGS_ROUTE } from "../utils/consts";

const Sidebar = () => {
    return(
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={Logo} alt="Логотип" />
            </div>
            <div className="sidebar-nav">
                <div className="sidebar-section">
                    <NavLink to={NEWS_ROUTE}>
                        {({ isActive }) => (
                            <div>
                                {isActive ? <IoNewspaper /> : <IoNewspaperOutline />}
                                <span>Новости</span>
                            </div>
                        )}
                    </NavLink>
                </div>
                <div className="sidebar-section">
                    <NavLink to={NOTES_ROUTE}>
                        {({ isActive }) => (
                            <div>
                                {isActive ? <IoFolderOpen /> : <IoFolderOpenOutline />}
                                <span>Заметки</span>
                            </div>
                        )}
                    </NavLink>
                </div>
                <div className="sidebar-section">
                    <NavLink to={COMPANY_ROUTE}>
                        {({ isActive }) => (
                            <div>
                                {isActive ? <IoBusiness /> : <IoBusinessOutline />}
                                <span>Компания</span>
                            </div>
                        )}
                    </NavLink>
                </div>
                <div className="sidebar-section">
                    <NavLink to={PROJECTS_ROUTE}>
                        {({ isActive }) => (
                            <div>
                                {isActive ? <IoGrid /> : <IoGridOutline />}
                                <span>Проекты</span>
                            </div>
                        )}
                    </NavLink>
                </div>
                <div className="sidebar-section">
                    <NavLink to={SETTINGS_ROUTE}>
                        {({ isActive }) => (
                            <div>
                                {isActive ? <IoSettings /> : <IoSettingsOutline />}
                                <span>Настройки</span>
                            </div>
                        )}
                    </NavLink>
                </div>
                <div className="sidebar-section">
                    <NavLink to={LOGOUT_ROUTE}>
                        <div>
                            <IoLogOutOutline />
                            <span>Выйти</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar