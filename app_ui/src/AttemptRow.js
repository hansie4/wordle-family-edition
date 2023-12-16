import LetterSquare from "./LetterSquare";

const AttemptRow = ({ maxGuessLength, attempt, attemptCorrectMap }) => {
    return (
        <div className='flex justify-center gap-1 my-1 w-full'>
            {Array.from(Array(maxGuessLength).keys()).map((x, I) => {
                return (
                    <LetterSquare
                        key={I}
                        value={attempt.charAt(x) ? attempt.charAt(x) : " "}
                        color={
                            attempt ? parseInt(attemptCorrectMap.charAt(x)) : 0
                        }
                    />
                );
            })}
        </div>
    );
};

export default AttemptRow;
