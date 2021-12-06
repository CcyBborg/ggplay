import { connect } from 'react-redux';
import { Container, Row, Col, ProgressBar, Carousel, Button, Image } from 'react-bootstrap';
import logoutIcon from './images/logout.svg';
import editIcon from './images/edit.svg';
import rockerIcon from './images/rocket.svg';
import styles from './dashboard.module.css';

function Dashboard({
    user
}) {
    return (
        <Container>
            <Row>
                <Col md='3'>
                    <div className={styles.profile}>
                        <Image className={styles.profileAvatar} src={user.info.profile.avatar} width='92' height='92' />
                        <div className={styles.profileNickname}>{user.info.nickname}</div>
                        <div className={styles.settingButtons}>
                            <Button className={styles.settingButton}>
                                <Image src={editIcon} width='16' />
                            </Button>
                            <Button className={styles.settingButton}>
                                <Image src={logoutIcon} width='16' />
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col md='9'>
                    <Carousel controls={false}>
                        <Carousel.Item>
                            <div className={styles.bg1} />
                            <Carousel.Caption>
                                <h3 className={styles.captionTitle}>Мастер-класс:<br />Цена времени в&nbsp;Dota2</h3>
                                <p className={styles.captionAbout1}>&laquo;Цена Времени&raquo;&nbsp;&mdash; это настоящая выжимка знаний. Сформирована огромным опытом работы с&nbsp;учениками, и&nbsp;универсальным подходом к&nbsp;разному рейтингу.</p>
                                <Button
                                    href='/course'
                                    variant='outline-primary'
                                    className={styles.button1}>
                                    Узнать больше
                                </Button>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className={styles.bg2} />
                            <Carousel.Caption>
                                <h3 className={styles.captionTitle}>Тренировки с&nbsp;профессионалами</h3>
                                <p className={styles.captionAbout2}>Начни свой путь в&nbsp;киберпорт с&nbsp;лучшими групповыми и&nbsp;индивидуальными тренировками</p>
                                <Button
                                    href='/coaching'
                                    variant='outline-primary'
                                    className={styles.button2}>
                                    Узнать больше
                                </Button>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <section className='mt-5'>
                <h3>Мои курсы</h3>
                <Row>
                    <Col md='3'>
                        <div className={styles.courseCard}>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h4>Артур ILLUSIVE Осипов</h4>
                                </div>
                                <div>
                                    <button type='button'>
                                        <Image/>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.courseCardFooter}>
                                <div>
                                    <Image src={rockerIcon} width='15' />
                                </div>
                                <div className='flex-fill'>
                                    <div className='d-flex justify-content-between'>
                                        <span>прогресс</span>
                                        <span>9%</span>
                                    </div>
                                    <ProgressBar now={15} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </Container>
    );
}

export default connect(({ user }) => ({
    user
}), {
})(Dashboard);

