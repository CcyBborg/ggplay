import { useCallback, useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollButton from '../../components/ScrollButton/ScrollButton';
import TournamentCard from './components/TournamentCard/TournamentCard';
import dotaImage from './images/dota.jpg';
import csgoImage from './images/csgo.jpg';
import styles from './tournament.module.css';
import { useHistory, useLocation } from 'react-router-dom';

function Tournament({
    user
}) {
    const history = useHistory();

    const location = useLocation();
    const [isNotification, setIsNotification] = useState(location.state?.isNotification);

    const handleRegisterClick = useCallback(game => {
        if (user.info) {
            history.push({
                pathname: `/tournament/${game}`
            });
        } else {
            localStorage.setItem('auth-redirect', `/tournament/${game}`);

            history.push({
                pathname: '/sign-in',
                state: { isTournament: true }
            })
        }
    }, [user.info]);

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
                                Более подробную информацию о&nbsp;регламенте, правилах и&nbsp;сетке турнира ищи в&nbsp;нашем&nbsp;
                                <a href='https://vk.com/ggplay_official' target='_blank' rel='noreferrer'>сообществе GGPLAY в&nbsp;ВКонтакте</a>.
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
            <Container className='d-md-flex justify-content-center mt-5'>
                <TournamentCard
                    title='Турнир Dota2 2022'
                    subtitle='19 ФЕВ — НАЧАЛО В 16:00 по МСК'
                    registeredUsers={23}
                    totalUsers={320}
                    image={dotaImage}
                    icon='/images/games/logos/dota.svg'
                    onJoin={() => handleRegisterClick('dota')}
                    isRegistered={user.info?.tournaments.includes('dota')} />
                <TournamentCard
                    title='Турнир CS:GO 2022'
                    subtitle='20 ФЕВ — НАЧАЛО В 16:00 по МСК'
                    registeredUsers={15}
                    totalUsers={320}
                    image={csgoImage}
                    icon='/images/games/logos/csgo.svg'
                    onJoin={() => handleRegisterClick('cs')}
                    isRegistered={user.info?.tournaments.includes('cs')} />
            </Container>

            <Modal size='md' show={isNotification} onHide={() => setIsNotification(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Ты участвуешь в турнире!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <p className='lead mb-5 mt-5'>
                        Переходи в наше сообщество <a href='https://vk.com/ggplay_official' target='_blank' rel='noreferrer' style={{ fontWeight: 'bold' }}>GGPLAY&nbsp;ВКонтакте</a>, где будет вся подробная информация о турнире.
                    </p>
                    <Button variant='primary' onClick={() => setIsNotification(false)}>Отлично!</Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default connect(({ user }) => ({
    user
}), {})(Tournament);
