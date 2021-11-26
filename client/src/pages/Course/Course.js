import { useState } from 'react';
import { Container, Row, Col, Button, Image, Modal } from 'react-bootstrap';
import FAQSection from './components/FAQSection/FAQSection';
import Trailer from './components/Trailer/Trailer';
import startIcon from './images/start.svg';
import playIcon from './images/play.svg';
import lessonsIcon from './images/lessons.svg';
import studentsIcon from './images/students.svg';
import progressIcon from './images/progress.svg';
import videoIcon from './images/video.svg';
import featuresForegroundImage from './images/features-foreground.png';
import styles from './course.module.css';

function Course() {
    const [isTrailer, setIsTrailer] = useState(false);

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
                                <Button variant='primary' size='lg' href='#player' className='position-relative'>
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
            <section id='player'>
                <Container>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <div className={styles.placeholder}>
                                <Image className={styles.previewImage} src='/images/player-holder.jpg' />
                                <div className={styles.previewAbout}>
                                    <div>
                                        <span className={styles.previewLabel}>
                                            урок 2/23
                                        </span>
                                        <h3 className={styles.previewTitle}>
                                            Длинное&nbsp;название второго&nbsp;урока
                                        </h3>
                                    </div>
                                    <div className={styles.previewIcon}>
                                        <Image src={playIcon} width='63' height='90' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.syllabus}>
                                <div className={styles.syllabusHeader}>
                                    <h5 className={styles.syllabusTitle}>План курса</h5>
                                    <div className={styles.progress}>
                                        <span>Прогресс<br /> 10%</span>
                                        <div>
                                            <Image src={progressIcon} width='15' height='32' />
                                        </div>
                                    </div>
                                </div>
                                <ol className={styles.lessonList}>
                                    <li className={styles.lesson}>
                                        <Image className={styles.lessonImage} src='/images/lesson1.png' />
                                        <div className={styles.lessonAbout}>
                                            <span className={styles.lessonTime}>08:13</span>
                                            <h4 className={styles.lessonTitle}>1.&nbsp;Длинное&nbsp;название первого&nbsp;урока</h4>
                                        </div>
                                    </li>
                                    <li className={styles.lesson}>
                                        <Image className={styles.lessonImage} src='/images/lesson1.png' />
                                        <div className={styles.lessonAbout}>
                                            <span className={styles.lessonTime}>08:13</span>
                                            <h4 className={styles.lessonTitle}>1.&nbsp;Длинное&nbsp;название первого&nbsp;урока</h4>
                                        </div>
                                    </li>
                                    <li className={styles.lesson}>
                                        <Image className={styles.lessonImage} src='/images/lesson2.png' />
                                        <div className={styles.lessonAbout}>
                                            <span className={styles.lessonTime}>08:13</span>
                                            <h4 className={styles.lessonTitle}>1.&nbsp;Длинное&nbsp;название первого&nbsp;урока</h4>
                                        </div>
                                    </li>
                                    <li className={styles.lesson}>
                                        <Image className={styles.lessonImage} src='/images/lesson2.png' />
                                        <div className={styles.lessonAbout}>
                                            <span className={styles.lessonTime}>08:13</span>
                                            <h4 className={styles.lessonTitle}>1.&nbsp;Длинное&nbsp;название первого&nbsp;урока</h4>
                                        </div>
                                    </li>
                                    <li className={styles.lesson}>
                                        <Image className={styles.lessonImage} src='/images/lesson2.png' />
                                        <div className={styles.lessonAbout}>
                                            <span className={styles.lessonTime}>08:13</span>
                                            <h4 className={styles.lessonTitle}>1.&nbsp;Длинное&nbsp;название первого&nbsp;урока</h4>
                                        </div>
                                    </li>
                                    <li className={styles.lesson}>
                                        <Image className={styles.lessonImage} src='/images/lesson2.png' />
                                        <div className={styles.lessonAbout}>
                                            <span className={styles.lessonTime}>08:13</span>
                                            <h4 className={styles.lessonTitle}>1.&nbsp;Длинное&nbsp;название первого&nbsp;урока</h4>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                            <div className={styles.syllabusCta}>
                                <div className='d-grid'>
                                    <Button variant='primary' size='lg'>Полный доступ</Button>
                                    <p className={styles.ctaFeaturesTitle}>Включает в себя:</p>
                                    <ul className={styles.ctaFeatures}>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={videoIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>Доступ ко всем урокам курса</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <section className={styles.features}>
                <h2 className={styles.featuresTitle}>
                    <Container>
                        <span className={styles.featuresHighlight}>Что</span>&nbsp;ты узнаешь из мастер-класса?
                    </Container>
                </h2>
                <Container>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <Row as='ol' className={styles.featuresList}>
                                <Col md='6' as='li' className={styles.featuresItem}>
                                    <div className={styles.featuresNum}>
                                        1
                                    </div>
                                    <h4 className={styles.featuresItemTitle}>Название заголовка</h4>
                                    <p className={styles.featuresItemP}>Перспективное планирование играет определяющее значение для стандартных подходов.</p>
                                </Col>
                                <Col md='6' as='li' className={styles.featuresItem}>
                                    <div className={styles.featuresNum}>
                                        2
                                    </div>
                                    <h4 className={styles.featuresItemTitle}>Название заголовка</h4>
                                    <p className={styles.featuresItemP}>Перспективное планирование играет определяющее значение для стандартных подходов.</p>
                                </Col>
                                <Col md='6' as='li' className={styles.featuresItem}>
                                    <div className={styles.featuresNum}>
                                        3
                                    </div>
                                    <h4 className={styles.featuresItemTitle}>Название заголовка</h4>
                                    <p className={styles.featuresItemP}>Перспективное планирование играет определяющее значение для стандартных подходов.</p>
                                </Col>
                                <Col md='6' as='li' className={styles.featuresItem}>
                                    <div className={styles.featuresNum}>
                                        4
                                    </div>
                                    <h4 className={styles.featuresItemTitle}>Название заголовка</h4>
                                    <p className={styles.featuresItemP}>Перспективное планирование играет определяющее значение для стандартных подходов.</p>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Image className={styles.featuresForeground} src={featuresForegroundImage} width='460' height='480' />
                        </div>
                    </div>
                </Container>
            </section>
            <section>
                <Container>
                    <div className={styles.finalCta}>
                        <p className={styles.finalCtaText}>Открой полный доступ к курсу сейчас и получи <b>тренировку по Dota2 бесплатно</b></p>
                        <Button variant='primary' size='lg' className={styles.finalCtaBtn}>Полный доступ</Button>
                    </div>
                </Container>
            </section>
            <section>
                <Container>
                    <h3 className='text-center mt-5 pt-5'>Часто задаваемые вопросы</h3>
                    <div className={styles.faqSection}>
                        <FAQSection />
                    </div>
                </Container>
            </section>
            {isTrailer && (
                <Trailer onHide={() => setIsTrailer(false)} />
            )}
        </>
    );
}

export default Course;
