import { useState } from 'react';
import { Image } from 'react-bootstrap';
import Vimeo from '@u-wave/react-vimeo';
import playIcon from './images/play.svg';
import styles from './player.module.css';

function Player({
    num,
    total,
    title,
    video
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState(null);

    return (
        <>
            <Vimeo
                video={video}
                autoplay={false}
                onReady={setPlayer}
                responsive />
            <div className={`${styles.placeholder} ${isPlaying ? styles.placeholderDisabled : ''}`} onClick={() => {
                setIsPlaying(true);
                player.play();
            }}>
                <Image className={styles.previewImage} src='/images/player-holder.jpg' />
                <div className={styles.previewAbout}>
                    <div>
                        <span className={styles.previewLabel}>
                            урок {num}/{total}
                        </span>
                        <h3 className={styles.previewTitle}>
                            {title}
                        </h3>
                    </div>
                    <div className={styles.previewIcon}>
                        <Image src={playIcon} width='63' height='90' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Player;
