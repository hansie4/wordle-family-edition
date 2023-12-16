const LetterSquare = ({ value, color }) => {
    const c =
        color === 2
            ? "bg-green-400"
            : color === 1
            ? "bg-yellow-400"
            : "bg-white";

    return (
        <div
            className={
                `w-1/2 h-11 rounded-lg flex items-center justify-center shadow-lg border-2 border-black text-4xl font-normal text-black ` +
                c
            }
        >
            {value}
        </div>
    );
};

export default LetterSquare;
