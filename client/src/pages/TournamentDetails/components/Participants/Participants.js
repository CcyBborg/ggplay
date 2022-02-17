import { Image } from 'react-bootstrap';
import csImage from '../../images/csgo.svg';
import styles from './participants.module.css';

function Participants() {
    return (
        <div className='d-flex'>
            <div>
                <Image src={csImage} width={48} height={48} />
            </div>
            <div className='d-flex flex-column'>
                <span className={styles.label}>участников</span>
                <span className={styles.counter}>128/200</span>
            </div>
        </div>
    );
}

export default Participants;
