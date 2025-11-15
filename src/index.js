import React, { createContext } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import UserStore from './stores/UserStore';

export const Context = createContext(null)
const app = ReactDOMClient.createRoot(document.getElementById("wrapper"));

app.render(
    <Context.Provider value={{
        user: new UserStore()
    }}>
        <App />
    </Context.Provider>
)