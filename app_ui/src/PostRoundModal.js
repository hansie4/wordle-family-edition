const PostRoundModal = ({ close }) => {
    return (
        <dialog id='postRoundModal' className='modal'>
            <div className='modal-box'>
                <h3 className='font-bold text-lg'>POST ROUND MODAL!</h3>
                <p className='py-4'>
                    Press ESC key or click the button below to close
                </p>
                <div className='modal-action'>
                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className='btn' onClick={close}>
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default PostRoundModal;
