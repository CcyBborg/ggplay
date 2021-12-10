import { Badge, Image } from 'react-bootstrap';
import Copier from '../../../../components/Copier/Copier';
import starIcon from './images/star.svg';
import coachAvatar from './images/coach-avatar.jpg';
import styles from './workout-card.module.css';

function WorkoutCard() {
    return (
        <div>
            <div className='d-flex'>
                <div className={styles.dateCaption}>
                    <div className={styles.date}>
                        <span className={styles.dateDay}>27</span>
                        <br />
                        <span className={styles.dateMonth}>ноября</span>
                    </div>
                    <div className={styles.time}>12:30</div>
                </div>
                <div className={styles.aboutCaption}>
                    <h4 className={styles.title}>Индивидуальная тренировка - 1 час</h4>
                    <Badge bg='secondary'>Dota2</Badge>&nbsp;
                    <Badge bg='primary'>через 2 дня</Badge>
                    <div className='d-flex justify-content-between align-items-center mt-4'>
                        <div className={styles.coach}>
                            <Image src={coachAvatar} className={styles.coachAvatar} width='32' height='32' />
                            <span>Arthur</span>
                        </div>
                        <div className={styles.rating}>
                            <Image src={starIcon} className={styles.starIcon} width='20' height='20' />
                            <span>4.0</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.slotCaption}>
                <div className='mb-3'>
                    <p className='mb-2'>Канал для твоей тренировки:</p>
                    <Copier text='CcyBborg 6137' />
                </div>
                <div>
                    <p className='mb-2'>Приглашение в наш Discord-сервер:</p>
                    <Copier text='https://discord.gg/fjh6ArgTyj' />
                </div>
            </div>
        </div>
    );
}

export default WorkoutCard;
