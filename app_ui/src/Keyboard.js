const ROW_ONE = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const ROW_TWO = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const ROW_THREE = ["Z", "X", "C", "V", "B", "N", "M"];

const Keyboard = ({
    updateInput,
    enterGuessEnabled,
    enterGuess,
    perfectLetters,
    goodLetters,
    badLetters,
}) => {
    return (
        <div className='flex justify-center w-screen fixed bottom-0 left-0 z-20 w-full bg-accent'>
            <div className='w-96'>
                <div className='flex justify-center gap-1 my-1 w-full'>
                    {ROW_ONE.map((K, I) => {
                        let c;

                        if (perfectLetters.has(K.toLowerCase())) {
                            c = "kbd bg-success";
                        } else if (goodLetters.has(K.toLowerCase())) {
                            c = "kbd bg-warning";
                        } else if (badLetters.has(K.toLowerCase())) {
                            c = "kbd bg-slate-400";
                        } else {
                            c = "kbd";
                        }

                        return (
                            <kbd
                                className={c}
                                key={I}
                                onClick={() => updateInput(K)}
                            >
                                {K}
                            </kbd>
                        );
                    })}
                </div>
                <div className='flex justify-center gap-1 my-1 w-full'>
                    {ROW_TWO.map((K, I) => {
                        let c;

                        if (perfectLetters.has(K.toLowerCase())) {
                            c = "kbd bg-success";
                        } else if (goodLetters.has(K.toLowerCase())) {
                            c = "kbd bg-warning";
                        } else if (badLetters.has(K.toLowerCase())) {
                            c = "kbd bg-slate-400";
                        } else {
                            c = "kbd";
                        }

                        return (
                            <kbd
                                className={c}
                                key={I}
                                onClick={() => updateInput(K)}
                            >
                                {K}
                            </kbd>
                        );
                    })}
                </div>
                <div className='flex justify-center gap-1 my-1 w-full'>
                    <kbd className='kbd' onClick={() => updateInput("clear")}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='w-5 h-5'
                        >
                            <path
                                fillRule='evenodd'
                                d='M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </kbd>
                    {ROW_THREE.map((K, I) => {
                        let c;

                        if (perfectLetters.has(K.toLowerCase())) {
                            c = "kbd bg-success";
                        } else if (goodLetters.has(K.toLowerCase())) {
                            c = "kbd bg-warning";
                        } else if (badLetters.has(K.toLowerCase())) {
                            c = "kbd bg-slate-400";
                        } else {
                            c = "kbd";
                        }

                        return (
                            <kbd
                                className={c}
                                key={I}
                                onClick={() => updateInput(K)}
                            >
                                {K}
                            </kbd>
                        );
                    })}
                    <kbd
                        className='kbd'
                        onClick={() => updateInput("backspace")}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='w-5 h-5'
                        >
                            <path
                                fillRule='evenodd'
                                d='M7.22 3.22A.75.75 0 017.75 3h9A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17h-9a.75.75 0 01-.53-.22L.97 10.53a.75.75 0 010-1.06l6.25-6.25zm3.06 4a.75.75 0 10-1.06 1.06L10.94 10l-1.72 1.72a.75.75 0 101.06 1.06L12 11.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L12 8.94l-1.72-1.72z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </kbd>
                </div>
                <div className='flex justify-center gap-1 my-1 w-full'>
                    <kbd
                        className='kbd w-full'
                        onClick={() => {
                            if (enterGuessEnabled) {
                                enterGuess();
                            }
                        }}
                    >
                        ENTER
                    </kbd>
                </div>
            </div>
        </div>
    );
};

export default Keyboard;
