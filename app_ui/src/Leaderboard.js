import { useContext } from "react";
import Header from "./Header";
import { AppContext } from "./App";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
    const navigate = useNavigate();
    const { username, user_id } = useContext(AppContext);

    return (
        <div className='w-screen h-screen bg-primary '>
            <Header
                currentlyOnLeaderboard={true}
                signedIn={username && user_id}
                redirectToLeaderboard={() => {
                    navigate("/");
                }}
            />
            Hello leaderboard
        </div>
    );
};

export default Leaderboard;
