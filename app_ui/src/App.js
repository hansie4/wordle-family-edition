import { createContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Gameboard from "./Gameboard";
import Login from "./Login";
import Leaderboard from "./Leaderboard";

export const AppContext = createContext({
    username: null,
    user_id: null,
});

export const BASE_URL = process.env.REACT_APP_BASE_URL
    ? process.env.REACT_APP_BASE_URL
    : "http://localhost:5000";

function App() {
    const [username, setUsername] = useState(
        localStorage.getItem("username")
            ? localStorage.getItem("username")
            : null
    );

    const [user_id, setUserId] = useState(
        localStorage.getItem("uid") ? localStorage.getItem("uid") : null
    );

    useEffect(() => {
        if (username) {
            localStorage.setItem("username", username);
        } else {
            localStorage.removeItem("username");
        }
    }, [username]);

    useEffect(() => {
        if (user_id) {
            localStorage.setItem("uid", user_id);
        } else {
            localStorage.removeItem("uid");
        }
    }, [user_id]);

    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <Gameboard />,
            },
            {
                path: "/leaderboard",
                element: <Leaderboard />,
            },
            {
                path: "/login",
                element: (
                    <Login
                        login={(uname, uid) => {
                            setUsername(uname);
                            setUserId(uid);
                        }}
                    />
                ),
            },
        ],
        {
            basename: "/ui",
        }
    );

    return (
        <AppContext.Provider
            value={{
                username: username,
                updateUsername: (e) => setUsername(e),
                user_id: user_id,
                updateUserId: (e) => setUserId(e),
            }}
        >
            <RouterProvider router={router} />
        </AppContext.Provider>
    );
}

export default App;
