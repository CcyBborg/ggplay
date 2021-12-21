import { Container, Row, Col, Image } from 'react-bootstrap';
import PromoCarousel from '../../components/PromoCarousel/PromoCarousel';
import ScrollButton from '../../components/ScrollButton/ScrollButton';
import TournamentCard from './components/TournamentCard/TournamentCard';
import workoutIcon from './images/workout.svg';
import courseIcon from './images/course.svg';
import dotaImage from './images/dota.jpg';
import csgoImage from './images/csgo.jpg';
import styles from './tournament.module.css';

function Tournament() {
    return (
        <>
            <div className={styles.banner}>
                <Container>
                    <Row>
                        <Col md='4'>
                            <h1>участвуй в&nbsp;турнирах gg&nbsp;play</h1>
                            <p>Структура организации представляет собой интересный эксперимент проверки направлений прогрессивного развития. Дальнейшее развитие различных форм деятельности позволяет оценить значение новых предложений. </p>
                            <ScrollButton text='Узнать больше' href='#' />
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
                    about='Равным образом рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям.'
                    registeredUsers={128}
                    totalUsers={200}
                    image={dotaImage}
                    icon='/images/games/logos/dota.svg' />
                <TournamentCard
                    title='Турнир CS:GO 2021'
                    subtitle='16 ДЕК — НАЧАЛО В 18:00'
                    about='Равным образом рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям.'
                    registeredUsers={48}
                    totalUsers={50}
                    image={csgoImage}
                    icon='/images/games/logos/csgo.svg' />
            </Container>
        </>
    );
}

export default Tournament;
