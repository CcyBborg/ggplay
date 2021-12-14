import { useState } from 'react';
import styles from './messenger.module.css';

function Messenger() {
    const [isOpened, setIsOpened] = useState();

    return (
        <div>
            <button className={styles.button} onClick={() => setIsOpened(!isOpened)}>
                Мессенджер
            </button>
        </div>
    );
}

export default Messenger;
