import { useCallback, useContext, useEffect, useState } from "react";
import AttemptRow from "./AttemptRow";
import Header from "./Header";
import Keyboard from "./Keyboard";
import { AppContext } from "./App";
import axios from "axios";
import NewWordModal from "./NewWordModal";

const MAX_NUM_ATTEMTPS = 7;

const Gameboard = () => {
    const { user_id } = useContext(AppContext);

    const [attempts, setAttempts] = useState([]);
    const [wordLength, setWordLength] = useState(5);
    const [roundId, setRoundId] = useState(0);

    const [currentGuessRow, setCurrentGuessRow] = useState(0);
    const [currentInput, setCurrentInput] = useState("");

    const getCurrentState = useCallback(() => {
        axios
            .get("http://localhost:5000/current-round", {
                headers: { uid: user_id },
            })
            .then((res) => {
                setWordLength(res.data.wordLength);
                setRoundId(res.data.round_id);
            })
            .catch((e) => {
                if (e.response.status === 404) {
                    document.getElementById("newWordModal").showModal();
                }
            });
    }, [user_id]);

    const createNewRound = () => {
        axios
            .post(
                "http://localhost:5000/new-round",
                {},
                {
                    headers: { uid: user_id },
                }
            )
            .then((res) => {
                if (res.data.winner) {
                    alert("TOTAL Winner!!!");
                } else if (res.data.wordCreated) {
                    getCurrentState();
                } else {
                    alert("Error generating new round");
                }
            })
            .catch((err) => console.log(err));
    };

    const getAttempts = useCallback(() => {
        axios
            .get("http://localhost:5000/attempts", {
                params: { rid: roundId },
                headers: { uid: user_id },
            })
            .then((res) => {
                setAttempts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [roundId, user_id]);

    const updateInput = (inputVal) => {
        if (inputVal === "clear") {
            setCurrentInput("");
        } else if (inputVal === "backspace" && currentInput !== "") {
            setCurrentInput(currentInput.substring(0, currentInput.length - 1));
        } else if (inputVal.length === 1) {
            setCurrentInput(currentInput + inputVal);
        }
    };

    const makeGuess = () => {
        if (currentInput.length === wordLength) {
            axios
                .post(
                    "http://localhost:5000/guess",
                    { guess: currentInput.toLowerCase() },
                    { headers: { uid: user_id }, params: { rid: roundId } }
                )
                .then((res) => {
                    console.log(res.data);
                    if (res.data.correct) {
                        window.confirm("YOU ARE CORRECT!");
                        createNewRound();
                    } else if (res.data.valid === false) {
                        alert("bad guess");
                        getAttempts();
                    } else {
                        if (currentGuessRow === MAX_NUM_ATTEMTPS + 1) {
                            window.confirm("You ran out of attemtps");
                            createNewRound();
                        } else {
                            getAttempts();
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        setCurrentGuessRow(attempts.length);
        setCurrentInput("");
    }, [attempts]);

    useEffect(() => {
        getAttempts();
    }, [roundId, getAttempts]);

    useEffect(() => {
        getCurrentState();
    }, [getCurrentState]);

    return (
        <div className='w-screen h-screen'>
            <NewWordModal startNewGame={createNewRound} />
            <Header />
            <h1>{currentGuessRow}</h1>

            {Array.from(Array(MAX_NUM_ATTEMTPS).keys()).map((A, I) => {
                const att = attempts.find((x) => x.attempt_number === I + 1);

                if (I === currentGuessRow) {
                    return (
                        <AttemptRow
                            key={I}
                            maxGuessLength={wordLength}
                            attempt={currentInput.toUpperCase()}
                            attemptCorrectMap={""}
                        />
                    );
                } else if (att) {
                    return (
                        <AttemptRow
                            key={I}
                            maxGuessLength={wordLength}
                            attempt={att.attempt_input.toUpperCase()}
                            attemptCorrectMap={att.attempt_correct_map}
                        />
                    );
                } else {
                    return (
                        <AttemptRow
                            key={I}
                            maxGuessLength={wordLength}
                            attempt={""}
                            attemptCorrectMap={""}
                        />
                    );
                }
            })}
            <Keyboard
                updateInput={updateInput}
                enterGuessEnabled={currentInput.length === wordLength}
                enterGuess={makeGuess}
            />
        </div>
    );
};

export default Gameboard;
