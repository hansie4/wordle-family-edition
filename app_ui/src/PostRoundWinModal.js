const PostRoundWinModal = ({ close, wordDetails }) => {
    return (
        <dialog id='postRoundWinModal' className='modal'>
            {wordDetails ? (
                <div className='modal-box p-0'>
                    <div className='card card-side bg-base-100 shadow-xl'>
                        <div className='avatar'>
                            <div className='w-36 h-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ml-4 mt-4 mb-4'>
                                <img
                                    src={
                                        wordDetails.f_name
                                            ? wordDetails.f_name
                                            : ""
                                    }
                                    alt='stuff'
                                />
                            </div>
                        </div>
                        <div className='card-body'>
                            <h2 className='card-title'>
                                {wordDetails.word?.toUpperCase()}
                            </h2>
                            <p>{wordDetails.body}</p>
                            <div className='card-actions justify-end'>
                                <button
                                    className='btn btn-primary'
                                    onClick={close}
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
                                            d='M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </dialog>
    );
};

export default PostRoundWinModal;
