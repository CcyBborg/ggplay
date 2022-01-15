import { Row, Col, Button, Image } from 'react-bootstrap';
import groupIcon from './images/group.svg';
import cupIcon from './images/cup.svg';
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
                <h4 className={styles.title}>{title}</h4>
                <span className={styles.subtitle}>{subtitle}</span>
                <p className={styles.p}>{about}</p>
            </div>
            <div className={styles.meta}>
                <Row>
                    <Col>
                        <span className={styles.attrtitle}>Формат участия</span>
                        <div className='d-flex align-items-center'>
                            <Image src={groupIcon} width='32' height='32' />
                            <span className={styles.attrcontent}>Командный</span>
                        </div>
                    </Col>
                    <Col>
                        <span className={styles.attrtitle}>Призовой фонд</span>
                        <div className='d-flex align-items-center'>
                            <Image src={cupIcon} width='32' height='32' />
                            <span className={styles.attrcontent}>100 000 RUB</span>
                        </div>
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
