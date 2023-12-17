const LetterSquare = ({ value, color, currentlyGuessing }) => {
    const c =
        color === 2
            ? "bg-success"
            : color === 1
            ? "bg-warning"
            : value && !currentlyGuessing
            ? "bg-slate-400"
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
