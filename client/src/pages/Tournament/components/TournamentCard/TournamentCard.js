import { Row, Col, Button, Image } from 'react-bootstrap';
import styles from './tournament-card.module.css';

function TournamentCard({
    image,
    icon,
    title,
    subtitle,
    about,
    registeredUsers,
    totalUsers,
    onJoin
}) {
    return (
        <article className={styles.root}>
            <Image src={image} className={styles.image} />
            <div className={styles.about}>
                <h4>{title}</h4>
                <span>{subtitle}</span>
                <p>{about}</p>
            </div>
            <div className={styles.meta}>
                <Row>
                    <Col>
                    </Col>
                </Row>
            </div>
            <div className={styles.footer}>
                <div className='d-flex align-items-center'>
                    <Image src={icon} width='32' height='32' />
                    <span className={styles.participants}>{registeredUsers}/{totalUsers} участников</span>
                </div>
                <Button
                    variant='primary'
                    size='xs'
                    className='text-capitalize'
                    onClick={onJoin}>
                    Присоединиться
                </Button>
            </div>
        </article>
    );
}

export default TournamentCard;
