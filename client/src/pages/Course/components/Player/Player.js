import { useEffect, useState, useCallback } from 'react';
import { Image, Button } from 'react-bootstrap';
import Vimeo from '@u-wave/react-vimeo';
import playIcon from './images/play.svg';
import styles from './player.module.css';

function Player({
    num,
    total,
    history,
    isFullAccessed,
    lesson: {
        vimeoId,
        lockedVimeoId,
        isLocked,
        title,
        previewImage
    }
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState(null);
    const [isLockScreen, setIsLockScreen] = useState(false);

    useEffect(() => setIsPlaying(false), [vimeoId]);
    useEffect(() => {
        setIsLockScreen(false);
    }, [vimeoId]);

    const handlePreviewClick = useCallback(() => {
        if (player) {
            setIsPlaying(true);
            player.play();
        }
    }, [player]);

    return (
        <>
            {isLockScreen ? (
                <div className={styles.locked}>
                    <h3 className='mb-4'>Весь урок доступен при полном доступе</h3>
                    <Button
                        variant='primary'
                        size='lg'
                        onClick={() => history.push({ pathname: '/course/full-access' })}>
                        Полный доступ
                    </Button>
                </div>
            ) : (
                <Vimeo
                    video={isLocked && !isFullAccessed ? lockedVimeoId : vimeoId}
                    autoplay={false}
                    onReady={setPlayer}
                    onEnd={() => {
                        if (isLocked) {
                            setIsLockScreen(true);
                        }
                    }}
                    responsive />
            )}
            <div className={`${styles.placeholder} ${isPlaying ? styles.placeholderDisabled : ''}`} onClick={handlePreviewClick}>
                <Image className={styles.previewImage} src={previewImage} />
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
