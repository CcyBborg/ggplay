import { useState } from 'react';
import { Container, Row, Col, Image, Modal, Form, Button } from 'react-bootstrap';
import PromoCarousel from '../../components/PromoCarousel/PromoCarousel';
import ScrollButton from '../../components/ScrollButton/ScrollButton';
import TournamentCard from './components/TournamentCard/TournamentCard';
import workoutIcon from './images/workout.svg';
import courseIcon from './images/course.svg';
import dotaImage from './images/dota.jpg';
import csgoImage from './images/csgo.jpg';
import styles from './tournament.module.css';

function Tournament() {
    const [isModal, setIsModal] = useState(false);
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
                            <ScrollButton text='Узнать больше' href='#' />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={styles.prizeSection}>
                <Container>
                    <div className={styles.prizeTotal}>
                        <div className={styles.prizeHeader}>Общий призовой фонд</div>
                        <div className={styles.prizeBody}>100&nbsp;000&nbsp;₽</div>
                    </div>
                    <Row>
                        <Col>
                            <div className={styles.prizeHeader}>1&nbsp;место</div>
                            <div className={styles.prizeBody}>50&nbsp;000&nbsp;₽</div>
                        </Col>
                        <Col>
                            <div className={styles.prizeHeader}>2&nbsp;место</div>
                            <div className={styles.prizeBody}>30&nbsp;000&nbsp;₽</div>
                        </Col>
                        <Col>
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
            <Container className='d-flex justify-content-center mt-5'>
                <TournamentCard
                    title='Турнир Dota2 2021'
                    subtitle='22 ДЕК — НАЧАЛО В 18:00'
                    registeredUsers={128}
                    totalUsers={200}
                    image={dotaImage}
                    icon='/images/games/logos/dota.svg'
                    onJoin={() => setIsModal(true)} />
                <TournamentCard
                    title='Турнир CS:GO 2021'
                    subtitle='16 ДЕК — НАЧАЛО В 18:00'
                    registeredUsers={48}
                    totalUsers={50}
                    image={csgoImage}
                    icon='/images/games/logos/csgo.svg'
                    onJoin={() => setIsModal(true)} />
            </Container>
            <Modal size='md' show={isModal} onHide={() => setIsModal(false)}>
                <Modal.Header closeButton>
                    <div>
                        <h4 className={styles.modalTitle}>Турнир Dota2 2021</h4>
                        <span className={styles.modalSub}>16 ДЕК — НАЧАЛО В 18:00</span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <p className={styles.legend}>Для участия в&nbsp;турнире заполните регистрационную форму</p>
                        <Form.Control
                            type='text'
                            placeholder='Логин'
                            className={styles.input} />
                        <Form.Control
                            type='email'
                            placeholder='Электронная почта'
                            className={styles.input} />
                        <Form.Control
                            type='url'
                            placeholder='Ссылка на аккаунт в Steam'
                            className={styles.input} />
                        <Form.Control
                            type='url'
                            placeholder='Ссылка на аккаунт в социальной сети'
                            className='mb-4' />
                        <div className={styles.divider} />
                        <Form.Group className='mt-5'>
                            <Form.Label>Теущий ранг</Form.Label>
                            <Form.Select aria-label='Ранг'>
                                <option>Выберите ранг</option>
                                <option value='1'>One</option>
                                <option value='2'>Two</option>
                                <option value='3'>Three</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Label>Выберите 3&nbsp;предпочтительные роли в&nbsp;игре</Form.Label>
                            <div className='select-tabs'>
                                <Form.Check
                                    inline
                                    label='Керри'
                                    name='check-1'
                                    type='checkbox'
                                    id='check-1'
                                />
                                <Form.Check
                                    inline
                                    label='Мид'
                                    name='check-2'
                                    type='checkbox'
                                    id='check-2'
                                />
                                <Form.Check
                                    inline
                                    label='Хардлейн'
                                    type='checkbox'
                                    id='check-3'
                                />
                                <Form.Check
                                    inline
                                    label='Частичная поддержка'
                                    type='checkbox'
                                    id='check-4'
                                />
                                <Form.Check
                                    inline
                                    label='Полная поддержка'
                                    type='checkbox'
                                    id='check-5'
                                />
                            </div>
                        </Form.Group>
                        <Button
                            className='mt-3'
                            size='lg'
                            variant='primary'
                            type='submit'>
                            Записаться на турнир
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Tournament;
