const PostRoundLoseModal = ({ close }) => {
    return (
        <dialog id='postRoundLoseModal' className='modal'>
            <div className='modal-box'>
                <h3 className='font-bold text-lg'>BETTER LUCK NEXT TIME</h3>
                <p className='py-4'>Press the arrow button to keep playing!</p>
                <div className='modal-action'>
                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className='btn' onClick={close}>
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
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default PostRoundLoseModal;
