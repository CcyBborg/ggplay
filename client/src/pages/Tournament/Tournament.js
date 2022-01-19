import { useCallback, useState } from 'react';
import { Container, Row, Col, Image, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PromoCarousel from '../../components/PromoCarousel/PromoCarousel';
import ScrollButton from '../../components/ScrollButton/ScrollButton';
import TournamentCard from './components/TournamentCard/TournamentCard';
import workoutIcon from './images/workout.svg';
import courseIcon from './images/course.svg';
import dotaImage from './images/dota.jpg';
import csgoImage from './images/csgo.jpg';
import unavailableImage from './images/unavailable.png';
import styles from './tournament.module.css';
import DotaRegister from './components/DotaRegister/DotaRegister';
import CSRegister from './components/CSRegister/CSRegister';

function Tournament({
    user
}) {
    const [isDota, setIsDota] = useState(false);
    const [isCS, setIsCS] = useState(false);
    const [isUnavailable, setIsUnavailable] = useState(false);

    const handleRegisterClick = useCallback(open => {
        if (user.info) {
            if (user.info.course || user.info.slots.present.length || user.info.slots.past.length) {
                open(true);
            } else {
                setIsUnavailable(true)
            }
        } else {
            window.open('/sign-in', '_self');
        }
    }, [user.info, user.info?.slots, user.info?.course]);

    console.log(user.info?.tournaments.includes('dota'));

    return (
        <>
            <div className={styles.banner}>
                <Container>
                    <Row>
                        <Col md='4'>
                            <h1 className={styles.title}>участвуй в&nbsp;турнирах <span className={styles.highlight}>gg&nbsp;play</span></h1>
                            <p className={styles.intro}>
                                Прими участие в&nbsp;ежемесячном турнире по&nbsp;CS или Dota 2&nbsp;с призовым фондом.<br />
                                За&nbsp;финалом турнира следят скауты профессиональных команд.<br />
                                Более подробную информацию о&nbsp;регламенте, правилах и&nbsp;сетке турнира ищи в&nbsp;нашем сообществе GGPLAY в&nbsp;ВКонтакте
                            </p>
                            <ScrollButton text='Узнать больше' href='#prize' />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={styles.prizeSection} id='prize'>
                <Container>
                    <div className={styles.prizeTotal}>
                        <div className={styles.prizeHeader}>Общий призовой фонд</div>
                        <div className={styles.prizeBody}>100&nbsp;000&nbsp;₽</div>
                    </div>
                    <Row>
                        <Col md='4'>
                            <div className={styles.prizeHeader}>1&nbsp;место</div>
                            <div className={styles.prizeBody}>50&nbsp;000&nbsp;₽</div>
                        </Col>
                        <Col md='4'>
                            <div className={styles.prizeHeader}>2&nbsp;место</div>
                            <div className={styles.prizeBody}>30&nbsp;000&nbsp;₽</div>
                        </Col>
                        <Col md='4'>
                            <div className={styles.prizeHeader}>3&nbsp;место</div>
                            <div className={styles.prizeBody}>20&nbsp;000&nbsp;₽</div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container className='mt-5'>
                <Row>
                    <Col md='9'>
                        <PromoCarousel />
                    </Col>
                    <Col md='3'>
                        <div className={styles.terms}>
                            <h4 className={styles.termsTitle}>Условия участия</h4>
                            <p className={styles.termsP}>
                                Получи возможность участвовать в&nbsp;ежемесячных турнирах при покупке:
                                <ul className='mt-2'>
                                    <li>
                                        <Image src={courseIcon} width='24' height='24' />
                                        <span className={styles.term}>Мастер-класса</span>
                                    </li>
                                    <li>
                                        <Image src={workoutIcon} width='24' height='24' />
                                        <span className={styles.term}>Любой тренировки</span>
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className='d-md-flex justify-content-center mt-5'>
                <TournamentCard
                    title='Турнир Dota2 2021'
                    subtitle='22 ДЕК — НАЧАЛО В 18:00'
                    registeredUsers={128}
                    totalUsers={200}
                    image={dotaImage}
                    icon='/images/games/logos/dota.svg'
                    onJoin={() => handleRegisterClick(setIsDota)}
                    isRegistered={user.info?.tournaments.includes('dota')} />
                <TournamentCard
                    title='Турнир CS:GO 2021'
                    subtitle='16 ДЕК — НАЧАЛО В 18:00'
                    registeredUsers={48}
                    totalUsers={50}
                    image={csgoImage}
                    icon='/images/games/logos/csgo.svg'
                    onJoin={() => handleRegisterClick(setIsCS)}
                    isRegistered={user.info?.tournaments.includes('cs')} />
            </Container>
            <Modal size='md' show={isUnavailable} contentClassName={styles.unavailable} onHide={() => setIsUnavailable(false)}>
                <Modal.Body>
                    <div className={styles.unavailableContent}>
                        <h4 className={styles.unavailableTitle}>Запись на турнир недоступна</h4>
                        <p className={styles.unavailableP}>Получите возможность поучаствовать в&nbsp;турнире, купив наш <a href='/course'>курс</a> или любую из&nbsp;<a href='/coaching'>тренировок</a>.</p>
                        <Button variant='primary' onClick={() => setIsUnavailable(false)}>Хорошо</Button>
                    </div>
                </Modal.Body>
                <Image
                    className={styles.unavailableImage}
                    src={unavailableImage}
                    width={248}
                    height={258} />
            </Modal>
            <DotaRegister
                isShow={isDota}
                onHide={() => setIsDota(false)} />
            <CSRegister
                isShow={isCS}
                onHide={() => setIsCS(false)} />
        </>
    );
}

export default connect(({ user }) => ({
    user
}), {})(Tournament);
