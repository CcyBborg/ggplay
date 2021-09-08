import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Copier({ text }) {
    const [isCopied, setIsCopied] = useState(false);

    return (
        <>
            <CopyToClipboard text={text}
                onCopy={() => setIsCopied(true)}>
                <div className='copier d-flex justify-content-between align-items-center'>
                    <span className='text'>{text}</span>
                    <button className='btn btn-link p-0' type='button'>
                        <i className='fas fa-clone'></i>
                    </button>
                </div>
            </CopyToClipboard>
            {isCopied && (
                <span className=''>Скопировано!</span>
            )}
        </>
    );
}

export default Copier;
