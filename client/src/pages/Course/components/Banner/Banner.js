import { useMemo, useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import playIcon from './images/play.svg';
import lessonsIcon from './images/lessons.svg';
import studentsIcon from './images/students.svg';
import ScrollButton from '../../../../components/ScrollButton/ScrollButton';
import Trailer from '../Trailer/Trailer';
import styles from './banner.module.css';

function Banner() {
    const [isTrailer, setIsTrailer] = useState(false);
    const isDesktop = useMemo(() => window.innerWidth > 1000, window.innerWidth);

    return (
        <>
            <section className={styles.root}>
                {isDesktop ? (
                    <video className={styles.video} autoPlay muted loop>
                        <source src="/images/videos/artur_background.mp4" type="video/mp4" />
                    </video>
                ) : (
                    <div className={styles.previewMobile}>
                        <Image src='/images/course/preview-mobile.jpg' className={styles.previewMobileImage} />
                    </div>
                )}
                <Container className='position-relative'>
                    <Row>
                        <Col md='5'>
                            <h1 className={styles.title}>
                                Артур<br />
                                <span className={styles.titleBold}>illusive</span> <br />
                                Осипов
                            </h1>
                            <div className={styles.info}>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col xs='3'>
                                                <Image src={studentsIcon} height='32' width='32' />
                                            </Col>
                                            <Col className={styles.feature} xs='9'>
                                                <span>1.768</span><br />
                                                <span>учеников</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col xs='3'>
                                                <Image src={lessonsIcon} height='32' width='32' />
                                            </Col>
                                            <Col className={styles.feature} xs='9'>
                                                <span>23</span><br />
                                                <span>урока</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <p className={styles.about}>
                                    &laquo;Цена Времени&raquo;&nbsp;&mdash; это настоящая выжимка знаний от гейм-аналитика Team&nbsp;Empire.<br /><br />Сформирована огромным опытом работы с&nbsp;учениками, и&nbsp;универсальным подходом к&nbsp;разному рейтингу.<br />
                                </p>
                            </div>
                            <div>
                                <ScrollButton text='Начать обучение' href='#player' />
                                <p className={styles.ctaMeta}>
                                    Начни обучение абсолютно бесплатно
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Button
                        variant='secondary'
                        size='lg'
                        className={styles.trailerBtn}
                        onClick={() => setIsTrailer(true)}>
                        Трейлер
                        <span className={styles.trailerIcon}>
                            <Image src={playIcon} width='44' height='64' />
                        </span>
                    </Button>
                </Container>
            </section>
            {isTrailer && (
                <Trailer onHide={() => setIsTrailer(false)} />
            )}
        </>
    );
}

export default Banner;
