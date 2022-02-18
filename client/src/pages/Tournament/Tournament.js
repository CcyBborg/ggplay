import { useState } from 'react';
import { Container, Row, Col, Button, Modal, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import TournamentCard from './components/TournamentCard/TournamentCard';
import dotaImage from './images/dota.jpg';
import csgoImage from './images/csgo.jpg';
import akImage from './images/ak.png';
import robotImage from './images/robot.png';
import sharkImage from './images/shark.png';
import cupImage from './images/cup.png';
import penguinImage from './images/penguin.png';
import styles from './tournament.module.css';
import { useLocation } from 'react-router-dom';

function Tournament({
    user
}) {
    const location = useLocation();
    const [isNotification, setIsNotification] = useState(location.state?.isNotification);

    return (
        <>
            <div className={styles.banner}>
                <Container>
                    <Row>
                        <Col md='4'>
                            <div className={styles.bannerContent}>
                                <h1 className={styles.title}>
                                    <span>ggplay</span> <span className={styles.titleHighlight}>league</span>
                                </h1>
                                <p className={styles.intro}>
                                    Подготовим тебя и&nbsp;твоих друзей к&nbsp;участию в&nbsp;наших ежемесячных турнирах с&nbsp;возможностью выиграть до&nbsp;100 тысяч рублей.
                                </p>
                                <div className={styles.introBtns}>
                                    <Button
                                        className={styles.bannerBtn}
                                        variant='primary'
                                        href='#tournaments'>
                                        Турниры
                                    </Button>
                                    <Button
                                        className={styles.bannerBtn}
                                        variant='outline-secondary'
                                        href='#info'>
                                        Узнать больше
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <section className={styles.about} id='info'>
                <div className={styles.smContainer}>
                    <div className={styles.aboutContent}>
                        <h2 className={styles.highlight}>ggplay&nbsp;&mdash; кто&nbsp;мы?</h2>
                        <p className={styles.aboutP}>Образовательно-развлекательная платформа для геймеров. Мы&nbsp;отбираем лучших тренеров и&nbsp;киберспортсменов, чтобы прокачать именно те&nbsp;скилы, которые помогут тебе побеждать и&nbsp;наслаждаться игрой.</p>
                        <p className={styles.aboutP}>В&nbsp;перерывах между тренировками очень важно использовать полученные навыки и&nbsp;знания. Наша лига с&nbsp;денежными (и&nbsp;не&nbsp;только) призами, отсмотрами скаутов и&nbsp;многим другим была создана специально для этого.</p>
                    </div>
                </div>
            </section>
            <section className={styles.qas}>
                <div className={styles.smContainer}>
                    <Row>
                        <Col md='6'>
                            <Image src={akImage} width={655} className={styles.akImage} />
                        </Col>
                        <Col md='6' className='d-flex align-items-center'>
                            <div>
                                <h3 className={styles.question}><span className={styles.highlight}>Что</span>&nbsp;<span className='mt-3'>нужно для<br />участия</span></h3>
                                <p className={styles.answer}>Пройти регистрацию и&nbsp;внести взнос за&nbsp;участие.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ order: 'last', span: '12' }} md={{ order: 'first', span: '6' }} className='d-flex align-items-center'>
                            <div>
                                <h3 className={styles.question}><span className={styles.highlight}>Почему</span>&nbsp;<span className='mt-3'>вы платити<br />за участие?</span></h3>
                                <p className={styles.answer}>Мы&nbsp;хотим, чтобы у&nbsp;турнира был призовой фонд. Поскольку GGplay является новой платформой, своих средств для ежемесячных турниров у&nbsp;нас пока нет. Но&nbsp;мы&nbsp;обещаем, что с&nbsp;развитием платформы наши турниры станут бесплатными.</p>
                            </div>
                        </Col>
                        <Col md='6'>
                            <Image src={robotImage} width={587} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <Image src={sharkImage} width={626} className={styles.akImage} />
                        </Col>
                        <Col md='6' className='d-flex align-items-center'>
                            <div>
                                <h3 className={styles.question}><span className={styles.highlight}>Как</span>&nbsp;<span className='mt-3'>часто проходят<br />турниры?</span></h3>
                                <p className={styles.answer}>Мы&nbsp;проводим турниры каждый месяц (а&nbsp;у&nbsp;вас есть возможность поучаствовать в&nbsp;нескольких турнирах одновременно!)</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ order: 'last', span: '12' }} md={{ order: 'first', span: '6' }} className='d-flex align-items-center'>
                            <div>
                                <h3 className={styles.question}><span className={styles.highlight}>Что</span>&nbsp;<span className='mt-3'>можно<br />выиграть?</span></h3>
                                <p className={styles.answer}>Призовой фонд наших турниров от&nbsp;50&nbsp;до&nbsp;100 тысяч рублей. Помимо денег разыгрываются скины в&nbsp;играх, тренировки, а&nbsp;также наш курс.</p>
                            </div>
                        </Col>
                        <Col md='6'>
                            <Image src={cupImage} width={490} className={styles.cupImage} />
                        </Col>
                    </Row>
                </div>
            </section>
            <section className={styles.joinTerms}>
                <div className={styles.smContainer}>
                    <Row>
                        <Col md='6' className='text-center'>
                            <div className={`${styles.joinTermsContainer} ${styles.joinTermsContainerFirst}`}>
                                <h4 className={styles.highlight}>Участвуй один</h4>
                                <p className={styles.joinTermsP}>
                                    Мы&nbsp;подберём команду под твой уровень игры и&nbsp;дадим вам время сыграться (7-10&nbsp;дней). Состав команды будет выслан на&nbsp;почту и&nbsp;в&nbsp;телеграмм.
                                </p>
                            </div>
                        </Col>
                        <Col md='6' className='text-center'>
                            <div className={`${styles.joinTermsContainer} ${styles.joinTermsContainerSecond}`}>
                                <h4 className={styles.highlight}>Участвуй с друзьями</h4>
                                <p className={styles.joinTermsP}>
                                    Собирай команду вместе с&nbsp;друзьями. Каждая команда турнира состоит из&nbsp;5&nbsp;игроков. Если вас будет меньше, мы&nbsp;подберём недостающих людей в&nbsp;команду с&nbsp;учётом ваших позиций и&nbsp;ранга.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            <section className={styles.tournaments} id='tournaments'>
                <Container>
                    <h2 className={`${styles.highlight} text-center`}>Предстоящие турниры</h2>
                    <div className='d-md-flex justify-content-center mt-5'>
                        <TournamentCard
                            game='dota'
                            title='Турнир Dota2 2022'
                            subtitle='3 МАР — НАЧАЛО В 16:00 по МСК'
                            registeredUsers={68}
                            totalUsers={320}
                            image={dotaImage}
                            icon='/images/games/logos/dota.svg'
                            isRegistered={user.info?.tournaments.includes('dota')} />
                        <TournamentCard
                            game='cs'
                            title='Турнир CS:GO 2022'
                            subtitle='4 МАР — НАЧАЛО В 16:00 по МСК'
                            registeredUsers={53}
                            totalUsers={320}
                            image={csgoImage}
                            icon='/images/games/logos/csgo.svg'
                            isRegistered={user.info?.tournaments.includes('cs')} />
                    </div>
                </Container>
            </section>
            <section className={styles.social}>
                <div className={styles.smContainer}>
                    <Row>
                        <Col>
                            <div className={styles.socialAbout}>
                                <h4 className={styles.socialTitle}>Подпишитесь на&nbsp;нас вконтакте</h4>
                                <p className={styles.socialP}>Следите за&nbsp;новостями лиги в&nbsp;нашем сообществе ВКонтакте. Там&nbsp;же публикуется сетка турнира и&nbsp;победители.</p>
                                <Button variant='outline-secondary' href='https://vk.com/ggplay_official' target='_blank'>
                                    Подписаться
                                </Button>
                            </div>
                        </Col>
                        <Col xs={{ order: 'first', span: '12' }} md={{ order: 'last', span: '6' }} className='position-relative'>
                            <Image src={penguinImage} className={styles.penguinImage} width={465} />
                        </Col>
                    </Row>
                </div>
            </section>

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
