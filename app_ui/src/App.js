import { createContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Gameboard from "./Gameboard";

export const AppContext = createContext({
    username: null,
    user_id: null,
});

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Gameboard />,
        },
        {
            path: "/leaderboard",
            element: <div>Leaderboard</div>,
        },
        {
            path: "/login",
            element: <div>Login Page</div>,
        },
    ],
    {
        basename: "/ui",
    }
);

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
