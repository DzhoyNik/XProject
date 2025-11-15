import Auth from "./pages/auth/Auth";
import Company from "./pages/Company/Company";
import News from "./pages/news/News";
import Notes from "./pages/notes/Notes";
import Chapter from "./pages/notes/Chapter";
import Note from "./pages/notes/Note";
import Projects from "./pages/projects/Projects";
import Settings from "./pages/settings/Settings";
import { AUTH_ROUTE, COMPANY_ROUTE, LOGOUT_ROUTE, NEWS_ROUTE, NOTES_ROUTE, PROJECTS_ROUTE, SETTINGS_ROUTE } from "./utils/consts";

export const authRoutes = [
    {  path: NEWS_ROUTE, Component: News },
    {  path: NOTES_ROUTE, Component: Notes },
    {  path: NOTES_ROUTE + "/:chapterId", Component: Chapter },
    {  path: NOTES_ROUTE + "/:chapterId/:noteId", Component: Note },
    {  path: COMPANY_ROUTE, Component: Company },
    {  path: PROJECTS_ROUTE, Component: Projects },
    {  path: SETTINGS_ROUTE, Component: Settings },
    {  path: LOGOUT_ROUTE, Component: News }
]

export const publicRoutes = [
    { path: AUTH_ROUTE, Component: Auth },
]