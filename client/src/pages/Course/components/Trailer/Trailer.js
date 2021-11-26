import { Image, Button, Modal, CloseButton } from 'react-bootstrap';
import playIcon from '../../images/play.svg';
import styles from './trailer.module.css';

function Trailer({ onHide }) {
    return (
        <Modal show={true} dialogClassName={styles.dialog} contentClassName={styles.root} onHide={onHide}>
            <CloseButton variant='white' className='p-3' onClick={() => onHide()} />
            <Button
                variant='secondary'
                className={styles.playButton}>
                <Image src={playIcon} width='42' height='60' />
            </Button>
            <div className={styles.footer}>
                <div className='d-flex align-items-center'>
                    <div>
                        <Image />
                    </div>
                    <div>
                        <h4>Роман “RAMZES666” Куштаров</h4>
                        <p className='mb-0'>Очень краткое описание, кто это или что за курс</p>
                    </div>
                </div>
                <div>
                    <Button variant='primary' size='lg' href='#player' onClick={() => {
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
