import { useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import Player from './components/Player/Player';
import Comments from './components/Comments/Comments';
import FAQSection from './components/FAQSection/FAQSection';
import Trailer from './components/Trailer/Trailer';
import playIcon from './images/play.svg';
import lessonsIcon from './images/lessons.svg';
import studentsIcon from './images/students.svg';
import progressIcon from './images/progress.svg';
import coachingIcon from './images/coaching.svg';
import communityIcon from './images/community.svg';
import cupIcon from './images/cup.svg';
import lessonIcon from './images/lesson.svg';
import featuresForegroundImage from './images/features-foreground.png';
import LESSONS from './lessons';
import styles from './course.module.css';
import { withRouter } from 'react-router';
import ScrollButton from '../../components/ScrollButton/ScrollButton';

function Course({
    history
}) {
    const [isTrailer, setIsTrailer] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(0);

    return (
        <>
            <section className={styles.banner}>
                {window.innerWidth >1000 ? (
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
                            <h1 className={styles.mainTitle}>
                                Артур<br />
                                <span className={styles.mainTitleBold}>illusive</span> <br />
                                Осипов
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
            <section id='player'>
                {/* <Container>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <div className={styles.playerComments}>
                                <Player
                                    num={selectedLesson + 1}
                                    total={LESSONS.length}
                                    video={LESSONS[selectedLesson].vimeoId}
                                    title={LESSONS[selectedLesson].title}
                                    previewImage={LESSONS[selectedLesson].previewImage} />
                                <Comments />
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
                                    {LESSONS.map((l, i) => (
                                        <li
                                            key={i}
                                            className={`${styles.lesson} ${i === selectedLesson ? styles.selectedLesson : ''}`}
                                            onClick={() => setSelectedLesson(i)}>
                                            <Image className={styles.lessonImage} src={l.previewImage} />
                                            <div className={styles.lessonAbout}>
                                                <span className={styles.lessonTime}>08:13</span>
                                                <h4 className={styles.lessonTitle}>{l.title}</h4>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            <div className={styles.syllabusCta}>
                                <div className='d-grid'>
                                    <Button
                                        variant='primary'
                                        size='lg'
                                        onClick={() => history.push({ pathname: '/course/full-access' })}>
                                        Полный доступ
                                    </Button>
                                    <p className={styles.ctaFeaturesTitle}>Включает в себя:</p>
                                    <ul className='mb-0'>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={lessonIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>Доступ ко всем урокам курса</span>
                                        </li>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={coachingIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>
                                                Бесплатная тренировка по Dota&nbsp;2
                                            </span>
                                        </li>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={cupIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>
                                                Участие в ежемесячных турнирах
                                            </span>
                                        </li>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={communityIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>
                                                Доступ в сообщество GG play
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container> */}
            </section>
            <section className={styles.features}>
                <h2 className={styles.featuresTitle}>
                    <Container>
                        <span className={styles.featuresHighlight}>Что</span>&nbsp;ты узнаешь из мастер-класса?
                    </Container>
                </h2>
                <Container>
                    <div className='d-flex flex-column flex-md-row justify-content-between'>
                        <div>
                            <Row as='ol' className={styles.featuresList}>
                                <Col md='6' as='li' className={styles.featuresItem}>
                                    <div className={styles.featuresNum}>
                                        1
                                    </div>
                                    <h4 className={styles.featuresItemTitle}>Микро</h4>
                                    <p className={styles.featuresItemP}>Самые важные тонкости механики, эффективное использование каждой секунды, которая ведёт к&nbsp;победе.</p>
                                </Col>
                                <Col md='6' as='li' className={styles.featuresItem}>
                                    <div className={styles.featuresNum}>
                                        2
                                    </div>
                                    <h4 className={styles.featuresItemTitle}>Макро</h4>
                                    <p className={styles.featuresItemP}>Полное понимание каждого участка на&nbsp;карте, которое исключит спонтанные и&nbsp;бесполезные замесы, удерживающие вас на&nbsp;одном рейтинге.</p>
                                </Col>
                                <Col md='6' as='li' className={styles.featuresItem}>
                                    <div className={styles.featuresNum}>
                                        3
                                    </div>
                                    <h4 className={styles.featuresItemTitle}>Психология</h4>
                                    <p className={styles.featuresItemP}>Редкий случай, когда это рассказывается не&nbsp;сухо, а&nbsp;мысли прошли через самого игрока, и&nbsp;рассказаны простым языком.</p>
                                </Col>
                                <Col md='6' as='li' className={styles.featuresItem}>
                                    <div className={styles.featuresNum}>
                                        4
                                    </div>
                                    <h4 className={styles.featuresItemTitle}>Новый взгляд</h4>
                                    <p className={styles.featuresItemP}>Никто не&nbsp;верит, что несколько часов способны на&nbsp;корню поменять виденье игры. Парадокс&nbsp;&mdash; вы&nbsp;сами этого захотите, ведь это и&nbsp;снимет наручники вашего рейтинга.</p>
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
                        <p className={styles.finalCtaText}>Открой полный доступ и получи<br /><b>бесплатную тренировку по Dota&nbsp;2</b></p>
                        <Button
                            variant='primary'
                            size='lg'
                            className={styles.finalCtaBtn}
                            onClick={() => history.push({ pathname: '/course/full-access' })}>
                            Полный доступ
                        </Button>
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

export default withRouter(Course);
