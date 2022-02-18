import { Image } from 'react-bootstrap';
import styles from './participants.module.css';

function Participants({
    total,
    current,
    icon
}) {
    return (
        <div className='d-flex'>
            <div className='d-flex align-items-center mr-2'>
                <Image src={icon} width={48} height={48} />
            </div>
            <div className='d-flex flex-column'>
                <span className={styles.label}>участников</span>
                <span className={styles.counter}>{current}/{total}</span>
            </div>
        </div>
    );
}

export default Participants;
