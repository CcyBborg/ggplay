import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Image } from 'react-bootstrap';
import copyIcon from './images/copy.svg';
import styles from './copier.module.css';

function Copier({ text }) {
    const [isCopied, setIsCopied] = useState(false);

    return (
        <>
            <CopyToClipboard text={text}
                onCopy={() => setIsCopied(true)}>
                <div className={styles.copier}>
                    <span className='text'>{text}</span>
                    <button className='btn btn-link p-0' type='button'>
                        <Image src={copyIcon} />
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
