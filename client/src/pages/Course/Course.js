import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import startIcon from './images/start.svg';
import playIcon from './images/play.svg';
import lessonsIcon from './images/lessons.svg';
import studentsIcon from './images/students.svg';
import styles from './course.module.css';

function Course() {
    return (
        <>
            <section className={styles.banner}>
                <video className={styles.video} autoPlay muted loop>
                    <source src="/images/videos/artur_background.mp4" type="video/mp4" />
                </video>
                <Container className='position-relative'>
                    <Row>
                        <Col md='5'>
                            <h1 className={styles.mainTitle}>
                                Роман<br />
                                <span className={styles.mainTitleBold}>Ramzes666</span> <br />
                                Куштаров
                            </h1>
                            <div className={styles.bannerInfo}>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col sm='3'>
                                                <Image src={studentsIcon} height='32' width='32' />
                                            </Col>
                                            <Col className={styles.feature} sm='9'>
                                                <span>1.768</span><br />
                                                <span>учеников</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col sm='3'>
                                                <Image src={lessonsIcon} height='32' width='32' />
                                            </Col>
                                            <Col className={styles.feature} sm='9'>
                                                <span>23</span><br />
                                                <span>урока</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <p className={styles.about}>
                                    Идейные соображения высшего порядка, а также укрепление и развитие структуры играет важную роль в формировании существенных финансовых и административных условий.
                                </p>
                            </div>
                            <div>
                                <Button variant='primary' size='lg' className='position-relative'>
                                    Начать обучение
                                    <span className='btn-icon'>
                                        <Image src={startIcon} height='21' width='25' />
                                    </span>
                                </Button>
                                <p className={styles.ctaMeta}>
                                    Начни обучение абсолютно бесплатно
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Button variant='secondary' size='lg' className={styles.trailerBtn}>
                        Трейлер
                        <span className={styles.trailerIcon}>
                            <Image src={playIcon} width='44' height='64' />
                        </span>
                    </Button>
                </Container>
            </section>
            <section>
                <Container>
                    <div className={styles.finalCta}>
                        <p>Открой полный доступ к курсу сейчас и получи тренировку по Dota2 бесплатно</p>
                        <Button variant='primary'>Полный доступ</Button>
                    </div>
                </Container>
            </section>
        </>
    );
}

export default Course;
