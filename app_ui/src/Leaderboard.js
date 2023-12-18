import { useCallback, useContext, useEffect, useState } from "react";
import Header from "./Header";
import { AppContext, BASE_URL } from "./App";
import axios from "axios";

const mapLeaderboard = (leaderboard) => {
    let newLeaderboard = leaderboard.sort((a, b) => {
        if (b.score === a.score) {
            return b.username.localeCompare(a.username);
        } else {
            return b.score - a.score;
        }
    });

    let currentRank = 1;
    newLeaderboard = newLeaderboard.map((P, I, people) => {
        const lastScore = I > 0 ? people[I - 1].score : P.score;
        const newRank = P.score === lastScore ? currentRank : currentRank + 1;
        currentRank = newRank;

        return {
            ...P,
            rank: currentRank,
        };
    });

    return newLeaderboard;
};

const capitalizeFirst = (name) => {
    return name.charAt(0).toUpperCase() + name.substring(1, name.length);
};

const Leaderboard = ({ closeLeaderboard }) => {
    const { username, user_id, updateUsername, updateUserId } =
        useContext(AppContext);

    const [leaderboard, setLeaderboard] = useState([]);

    const getLeaderboard = useCallback(() => {
        axios
            .get(BASE_URL + "/leaderboard")
            .then(({ data }) => {
                setLeaderboard(data);
            })
            .catch((err) => [console.log(err)]);
    }, []);

    useEffect(() => {
        getLeaderboard();
    }, [getLeaderboard]);

    return (
        <div className='w-screen h-screen bg-secondary'>
            <Header
                currentlyOnLeaderboard={true}
                signedIn={username && user_id}
                redirectToLeaderboard={() => {
                    closeLeaderboard();
                }}
                logout={() => {
                    updateUsername("");
                    updateUserId("");
                }}
                login={() => {
                    closeLeaderboard();
                }}
            />
            <div className='overflow-auto bg-rose-100 h-full'>
                <table className='table table-zebra'>
                    {/* head */}
                    <thead className='bg-success'>
                        <tr>
                            <th className='text-lg text-black'>Rank</th>
                            <th className='text-lg text-black'>Name</th>
                            <th className='text-lg text-black'>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mapLeaderboard(leaderboard).map((P, I) => {
                            return (
                                <tr>
                                    <th>{P.rank}</th>
                                    <td className='flex'>
                                        <div className='avatar mr-2'>
                                            <div className='w-10 rounded-full'>
                                                <img
                                                    src={P.avatar_link}
                                                    alt='Tailwind-CSS-Avatar-component'
                                                />
                                            </div>
                                        </div>
                                        <p className='text-black text-lg '>
                                            {capitalizeFirst(P.username)}
                                        </p>
                                    </td>
                                    <td className='font-black text-accent'>
                                        <div className='badge badge-accent'>
                                            {P.score}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
