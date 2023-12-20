import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./App";

const Login = ({ login, showLeaderboard }) => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const [errMessage, setErrMessage] = useState(null);

    const validateUsername = () => {
        if (username.length > 0) {
            setLoading(true);
            axios
                .post(BASE_URL + "/login", {
                    username: username.toLowerCase(),
                })
                .then((res) => {
                    login(res.data.username, res.data.id);
                    setLoading(false);
                })
                .catch((err) => {
                    setErrMessage("Invalid login credentials.");
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        setErrMessage(null);
    }, [username]);

    return (
        <div className='w-screen h-screen bg-primary grid place-content-center'>
            <div className='card w-96 bg-base-100 shadow-xl'>
                <figure>
                    <img
                        src='https://drive.google.com/uc?export=view&id=1qB2wXneNhRdhFzrra35BtnwxBft3QrUD'
                        alt='Lloyd family'
                    />
                </figure>
                <div className='card-body'>
                    <h2 className='card-title'>Enter your username:</h2>
                    <input
                        type='text'
                        placeholder='Type here'
                        className='input input-bordered input-md w-full max-w-xs'
                        value={username}
                        onChange={(a) => setUsername(a.target.value)}
                    />
                    {errMessage ? (
                        <div role='alert' className='alert alert-error flex'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='stroke-current shrink-0 h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                            </svg>
                            <span>{errMessage}</span>
                        </div>
                    ) : null}
                    <div className='card-actions justify-between'>
                        <button
                            className='btn btn-primary'
                            disabled={loading}
                            onClick={showLeaderboard}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                                />
                            </svg>
                        </button>
                        <button
                            className='btn btn-primary'
                            onClick={() => validateUsername()}
                            disabled={username.length === 0 || loading}
                        >
                            {loading ? (
                                <span className='loading loading-spinner'></span>
                            ) : null}
                            Play!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
