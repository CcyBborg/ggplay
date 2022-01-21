import { Image, Button, Modal, CloseButton } from 'react-bootstrap';
import playIcon from './images/play.svg';
import styles from './trailer.module.css';

function Trailer({ onHide }) {
    return (
        <Modal show={true} dialogClassName={styles.dialog} contentClassName={styles.root} onHide={onHide}>
            <CloseButton variant='white' className='p-3' onClick={() => onHide()} />
            <Button
                variant='outline-secondary'
                className={styles.playButton}>
                <Image src={playIcon} width='42' height='60' />
            </Button>
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
