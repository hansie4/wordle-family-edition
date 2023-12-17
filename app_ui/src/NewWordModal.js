const NewWordModal = ({ close }) => {
    return (
        <dialog id='newWordModal' className='modal'>
            <div className='modal-box'>
                <h3 className='font-bold text-lg text-center'>
                    Click start to guess a word!
                </h3>
                <div className='modal-action flex justify-center'>
                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button
                            className='btn btn-wide btn-primary'
                            onClick={close}
                        >
                            Start
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default NewWordModal;
