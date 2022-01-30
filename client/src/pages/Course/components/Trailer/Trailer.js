import { useState, useEffect } from 'react';
import Vimeo from '@u-wave/react-vimeo';
import { Button, Modal, CloseButton } from 'react-bootstrap';
import styles from './trailer.module.css';

function Trailer({ onHide }) {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if (player) {
            player.play();
        }
    }, [player]);

    return (
        <Modal show={true} dialogClassName={styles.dialog} contentClassName={styles.root} onHide={onHide}>
            <CloseButton variant='white' className='p-3' onClick={() => onHide()} style={{ zIndex: 999 }} />
            <Vimeo
                video='671605341'
                autoplay={false}
                className={styles.player}
                onReady={setPlayer}
                responsive />
            <div className={styles.footer}>
                <div className='d-flex align-items-center'>
                    <div>
                        <h4>Артур “illusive” Осипов</h4>
                        <p className='mb-0'>Расскажет как раскрыть свой потенциал в&nbsp;Dota2.</p>
                    </div>
                </div>
                <div>
                    <Button className={styles.ctaBtn} variant='primary' size='lg' href='#player' onClick={() => {
                        onHide();
                    }}>
                        Начать обучение
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default Trailer;
