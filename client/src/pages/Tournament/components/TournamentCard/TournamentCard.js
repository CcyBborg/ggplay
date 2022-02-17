import { Button, Image } from 'react-bootstrap';
import checkIcon from './images/check.svg';
import styles from './tournament-card.module.css';

function TournamentCard({
    game,
    image,
    icon,
    title,
    subtitle,
    registeredUsers,
    totalUsers,
    isRegistered,
    onJoin
}) {
    return (
        <article className={styles.root}>
            <Image src={image} className={styles.image} />
            <div className={styles.about}>
                <h4 className={styles.title}>{title}</h4>
                <span className={styles.subtitle}>{subtitle}</span>
            </div>
            <div className={styles.footer}>
                <div className='d-flex align-items-center'>
                    <Image src={icon} width='32' height='32' />
                    <span className={styles.participants}>{registeredUsers}/{totalUsers} участников</span>
                </div>
                {isRegistered ? (
                    <Button variant='secondary' size='xs' disabled>
                        <Image
                            src={checkIcon}
                            className='mr-2'
                            width='20'
                            height='20' />
                        Участвую
                    </Button>
                ) : (// onClick={onJoin}>
                    <Button
                        id={game}
                        variant='primary'
                        size='xs'
                        className={styles.footerBtn}
                        href={`/tournament/${game}`}>
                Узнать больше
            </Button>
                )}
        </div>
        </article >
    );
}

export default TournamentCard;
