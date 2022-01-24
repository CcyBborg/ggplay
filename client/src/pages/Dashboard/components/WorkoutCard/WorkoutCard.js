import classNames from 'classnames';
import { useMemo } from 'react';
import { Badge, Image } from 'react-bootstrap';
import Copier from '../../../../components/Copier/Copier';
import ReviewForm from '../ReviewForm/ReviewForm';
import styles from './workout-card.module.css';

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function WorkoutCard({
    slotId,
    title,
    timestamp,
    invite,
    channel,
    coach,
    past,
    review
}) {
    const date = useMemo(() => new Date(timestamp), [timestamp]);
    const dateCaption = classNames(styles.dateCaption, {
        [styles.pastDate]: past
    })

    return (
        <div>
            <div className='d-flex'>
                <div className={dateCaption}>
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
                    <Badge bg='secondary'>{coach.game.title}</Badge>
                    <div className='mt-4'>
                        <div className={styles.coach}>
                            <Image
                                src={coach.img}
                                className={styles.coachAvatar}
                                width='32'
                                height='32' />
                            <span>{coach.title}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.slotCaption}>
                {past ? (
                    <ReviewForm slotId={slotId} review={review} />
                ) : (
                    <>
                        <div className='mb-3'>
                            <p className='mb-2'>Канал для твоей тренировки:</p>
                            <Copier text={channel} />
                        </div>
                        <div>
                            <p className='mb-2'>Приглашение в наш Discord-сервер:</p>
                            <Copier text={invite} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default WorkoutCard;
