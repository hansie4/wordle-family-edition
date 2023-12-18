import { createContext, useEffect, useState } from "react";

import Gameboard from "./Gameboard";
import Login from "./Login";
import Leaderboard from "./Leaderboard";

export const AppContext = createContext({
    username: null,
    user_id: null,
});

export const BASE_URL = process.env.REACT_APP_BASE_URL
    ? process.env.REACT_APP_BASE_URL
    : "";

function App() {
    const [username, setUsername] = useState(
        localStorage.getItem("username")
            ? localStorage.getItem("username")
            : null
    );

    const [user_id, setUserId] = useState(
        localStorage.getItem("uid") ? localStorage.getItem("uid") : null
    );

    const [leaderboardShown, setLeaderboardShown] = useState(false);

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

    return (
        <AppContext.Provider
            value={{
                username: username,
                updateUsername: (e) => setUsername(e),
                user_id: user_id,
                updateUserId: (e) => setUserId(e),
            }}
        >
            {leaderboardShown ? (
                <Leaderboard
                    closeLeaderboard={() => setLeaderboardShown(false)}
                />
            ) : username && user_id ? (
                <Gameboard showLeaderboard={() => setLeaderboardShown(true)} />
            ) : (
                <Login
                    login={(uname, u_id) => {
                        setUsername(uname);
                        setUserId(u_id);
                    }}
                    showLeaderboard={() => setLeaderboardShown(true)}
                />
            )}
        </AppContext.Provider>
    );
}

export default App;
