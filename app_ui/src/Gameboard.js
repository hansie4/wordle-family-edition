import { useCallback, useContext, useEffect, useState } from "react";
import AttemptRow from "./AttemptRow";
import Header from "./Header";
import Keyboard from "./Keyboard";
import { AppContext } from "./App";
import axios from "axios";
import NewWordModal from "./NewWordModal";
import PostRoundWinModal from "./PostRoundWinModal";
import PostRoundLoseModal from "./PostRoundLoseModal";
import RunOutOfWordsModal from "./RunOutOfWordsModal";
import { BASE_URL } from "./App";

const MAX_NUM_ATTEMTPS = 7;

const AlertIcon = () => (
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
);

const SuccessIcon = () => (
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
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        />
    </svg>
);

const InfoIcon = () => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='stroke-current shrink-0 w-6 h-6'
    >
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        ></path>
    </svg>
);

const WarningIcon = () => (
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
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        />
    </svg>
);

const openRunOutOfWordsModal = () => {
    document.getElementById("runOutOfWordsModal").showModal();
};
const openPostRoundWinModal = () => {
    document.getElementById("postRoundWinModal").showModal();
};
const openPostRoundLoseModal = () => {
    document.getElementById("postRoundLoseModal").showModal();
};
const openNewWordModal = () => {
    document.getElementById("newWordModal").showModal();
};

const Gameboard = ({ showLeaderboard }) => {
    const { user_id, updateUsername, updateUserId } = useContext(AppContext);

    const [loading, setLoading] = useState(false);

    const [attempts, setAttempts] = useState([]);
    const [wordLength, setWordLength] = useState(5);
    const [roundId, setRoundId] = useState(0);

    const [currentGuessRow, setCurrentGuessRow] = useState(0);
    const [currentInput, setCurrentInput] = useState("");

    const defaultMessage = `Guess a ${wordLength} letter word!`;
    const [alertMessage, setAlertMessage] = useState(defaultMessage);
    const [alertType, setAlertType] = useState("standard");

    const [perfectLetters, setPerfectLetters] = useState(new Set());
    const [goodLetters, setGoodLetters] = useState(new Set());
    const [badLetters, setBadLetters] = useState(new Set());

    const [wordDetails, setWordDeatils] = useState(null);

    const closePostRoundWinModal = () => {
        setWordDeatils(null);
        document.getElementById("postRoundWinModal").close();
        openNewWordModal();
    };
    const closePostRoundLoseModal = () => {
        document.getElementById("postRoundLoseModal").close();
        openNewWordModal();
    };
    const closeNewWordModal = () => {
        createNewRound();
        document.getElementById("newWordModal").close();
    };

    const getCurrentState = useCallback(() => {
        axios
            .get(BASE_URL + "/current-round", {
                headers: { uid: user_id },
            })
            .then((res) => {
                setWordLength(res.data.wordLength);
                setRoundId(res.data.round_id);
            })
            .catch((e) => {
                if (e.response.status === 404) {
                    openNewWordModal();
                }
            });
    }, [user_id]);

    const createNewRound = () => {
        setLoading(true);
        axios
            .post(
                BASE_URL + "/new-round",
                {},
                {
                    headers: { uid: user_id },
                }
            )
            .then((res) => {
                if (res.data.winner) {
                    openRunOutOfWordsModal();
                } else if (res.data.wordCreated) {
                    getCurrentState();
                } else {
                    alertMessage("Error generating new round.");
                    alertType("error");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getAttempts = useCallback(() => {
        setLoading(true);
        axios
            .get(BASE_URL + "/attempts", {
                params: { rid: roundId },
                headers: { uid: user_id },
            })
            .then((res) => {
                setAttempts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [roundId, user_id]);

    const updateInput = (inputVal) => {
        if (inputVal === "clear") {
            setCurrentInput("");
        } else if (inputVal === "backspace" && currentInput !== "") {
            setCurrentInput(currentInput.substring(0, currentInput.length - 1));
        } else if (inputVal.length === 1 && currentInput.length < wordLength) {
            setCurrentInput(currentInput + inputVal);
        }
    };

    const makeGuess = () => {
        if (currentInput.length === wordLength) {
            setLoading(true);
            axios
                .post(
                    BASE_URL + "/guess",
                    { guess: currentInput.toLowerCase() },
                    { headers: { uid: user_id }, params: { rid: roundId } }
                )
                .then((res) => {
                    console.log(res.data);
                    if (res.data.correct) {
                        setAlertMessage("You correctly guessed the word!");
                        setAlertType("success");
                        getAttempts();
                        //setWordDeatils(res.data.word_details);
                        console.log(res.data.word_details);
                        openPostRoundWinModal();
                    } else if (res.data.valid === false) {
                        setAlertType("warning");
                        setAlertMessage(
                            `"${currentInput}" was not a valid guess.`
                        );
                        getAttempts();
                    } else {
                        setAlertMessage(defaultMessage);
                        setAlertType("standard");
                        if (currentGuessRow === MAX_NUM_ATTEMTPS - 1) {
                            openPostRoundLoseModal();
                        } else {
                            getAttempts();
                        }
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        setCurrentGuessRow(attempts.length);
        setCurrentInput("");

        const a = new Set();
        const b = new Set();
        const c = new Set();

        attempts.forEach((x) => {
            for (let i = 0; i < x.attempt_input.length; i++) {
                const correctVal = x.attempt_correct_map.charAt(i);
                const charVal = x.attempt_input.charAt(i);

                if (correctVal === "2") {
                    a.add(charVal);
                } else if (correctVal === "1") {
                    b.add(charVal);
                } else {
                    c.add(charVal);
                }
            }
        });

        setPerfectLetters(a);
        setGoodLetters(b);
        setBadLetters(c);
    }, [attempts]);

    useEffect(() => {
        getAttempts();
    }, [roundId, getAttempts]);

    useEffect(() => {
        getCurrentState();
    }, [getCurrentState]);

    return (
        <div className='w-screen h-screen'>
            <NewWordModal close={closeNewWordModal} />
            <PostRoundWinModal
                close={closePostRoundWinModal}
                wordDetails={wordDetails}
            />
            <PostRoundLoseModal close={closePostRoundLoseModal} />
            <RunOutOfWordsModal navigateToLeaderboard={showLeaderboard} />
            <Header
                logout={() => {
                    updateUsername("");
                    updateUserId("");
                }}
                redirectToLeaderboard={showLeaderboard}
                currentlyOnLeaderboard={false}
                signedIn={true}
            />

            <div className='h-[42rem]'>
                <div className='p-2'>
                    <div
                        role='alert'
                        className={
                            alertType === "standard"
                                ? "flex border-black alert bg-white text-black"
                                : alertType === "success"
                                ? "flex border-black alert alert-success"
                                : alertType === "warning"
                                ? "flex border-black alert alert-warning"
                                : "flex border-black alert alert-error"
                        }
                    >
                        {alertType === "standard" ? (
                            <InfoIcon />
                        ) : alertType === "success" ? (
                            <SuccessIcon />
                        ) : alertType === "warning" ? (
                            <WarningIcon />
                        ) : (
                            <AlertIcon />
                        )}
                        <span>{alertMessage}</span>
                    </div>
                </div>

                {Array.from(Array(MAX_NUM_ATTEMTPS).keys()).map((A, I) => {
                    const att = attempts.find(
                        (x) => x.attempt_number === I + 1
                    );

                    if (I === currentGuessRow) {
                        return (
                            <AttemptRow
                                key={I}
                                maxGuessLength={wordLength}
                                attempt={currentInput.toUpperCase()}
                                attemptCorrectMap={""}
                                currentlyGuessing={true}
                            />
                        );
                    } else if (att) {
                        return (
                            <AttemptRow
                                key={I}
                                maxGuessLength={wordLength}
                                attempt={att.attempt_input.toUpperCase()}
                                attemptCorrectMap={att.attempt_correct_map}
                                currentlyGuessing={false}
                            />
                        );
                    } else {
                        return (
                            <AttemptRow
                                key={I}
                                maxGuessLength={wordLength}
                                attempt={""}
                                attemptCorrectMap={""}
                                currentlyGuessing={false}
                            />
                        );
                    }
                })}
            </div>

            <Keyboard
                updateInput={updateInput}
                enterGuessEnabled={
                    currentInput.length === wordLength && !loading
                }
                enterGuess={makeGuess}
                perfectLetters={perfectLetters}
                goodLetters={goodLetters}
                badLetters={badLetters}
                loading={loading}
            />
        </div>
    );
};

export default Gameboard;
