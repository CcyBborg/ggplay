import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import featuresForegroundImage from './images/features-foreground.png';
import FAQSection from '../FAQSection/FAQSection';
import styles from './info-section.module.css';

function InfoSection({ history }) {
    return (
        <>
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
        </>
    );
}

export default InfoSection;
