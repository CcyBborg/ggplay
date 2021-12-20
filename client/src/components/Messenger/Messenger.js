import { useState } from 'react';
import { CloseButton, Image } from 'react-bootstrap';
import icon from './images/icon.svg';
import styles from './messenger.module.css';

function Messenger() {
    const [isOpened, setIsOpened] = useState();

    return (
        <>
            {isOpened ? (
                <div className={styles.root}>
                    <div className={styles.header}>
                        <span>Чаты</span>
                        <CloseButton onClick={() => setIsOpened(false)} />
                    </div>
                    <div className={styles.body}>
                        <ul>
                            <li className={styles.chatItem}>
                                <div>
                                    <Image
                                        src='/images/small-logo.png'
                                        width='45'
                                        height='45'
                                        className={styles.logo} />
                                </div>
                                <div className={styles.chatTitle}>
                                    GGPlay - поддержка
                                </div>
                            </li>
                            <li className={styles.chatItem}>
                                <div>
                                    <Image
                                        src='https://i.ibb.co/ZdFTs80/PHOTO.png'
                                        width='45'
                                        height='45'
                                        className={styles.logo} />
                                </div>
                                <div className={styles.chatTitle}>
                                   illusive
                                </div>
                            </li>
                            <li className={styles.chatItem}>
                                <div>
                                    <Image
                                        src='https://i.ibb.co/D5XYfdC/PHOTO-2.png'
                                        width='45'
                                        height='45'
                                        className={styles.logo} />
                                </div>
                                <div className={styles.chatTitle}>
                                    airu
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <button className={styles.button} onClick={() => setIsOpened(true)}>
                    <Image src={icon} width='28' height='28' />
                </button>
            )}
        </>
    );
}

export default Messenger;
