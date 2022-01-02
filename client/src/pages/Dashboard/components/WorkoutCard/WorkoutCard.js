import { Badge, Image } from 'react-bootstrap';
import Copier from '../../../../components/Copier/Copier';
import starIcon from './images/star.svg';
import styles from './workout-card.module.css';

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function WorkoutCard({
    title,
    timestamp,
    invite,
    channel,
    coach
}) {
    const date = new Date(timestamp);

    return (
        <div>
            <div className='d-flex'>
                <div className={styles.dateCaption}>
                    <div className={styles.date}>
                        <span className={styles.dateDay}>{date.getDate()}</span>
                        <br />
                        <span className={styles.dateMonth}>{MONTHS[date.getMonth()]}</span>
                    </div>
                    <div className={styles.time}>
                        {date.toLocaleString('ru', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </div>
                <div className={styles.aboutCaption}>
                    <h4 className={styles.title}>{title}</h4>
                    <Badge bg='secondary'>Dota2</Badge>&nbsp;
                    <Badge bg='primary'>через 2 дня</Badge>
                    <div className='d-flex justify-content-between align-items-center mt-4'>
                        <div className={styles.coach}>
                            <Image src={coach.img} className={styles.coachAvatar} width='32' height='32' />
                            <span>{coach.title}</span>
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
                    <Copier text={channel} />
                </div>
                <div>
                    <p className='mb-2'>Приглашение в наш Discord-сервер:</p>
                    <Copier text={invite} />
                </div>
            </div>
        </div>
    );
}

export default WorkoutCard;
