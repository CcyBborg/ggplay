import { useCallback } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import Participants from './components/Participants/Participants';
import { useParams, useHistory } from 'react-router-dom';
import csFooterImage from './images/cs-footer.png';
import dotaFooterImage from './images/dota-footer.png';
import pistolImage from './images/pistol.png';
import knifeImage from './images/knife.png';
import csIcon from './images/csgo.svg';
import dotaIcon from './images/dota.svg';
import styles from './tournament-details.module.css';
import classNames from 'classnames';

function TournamentDetails({ user }) {
    const { game } = useParams();
    const className = classNames({
        [styles.dota]: game === 'dota'
    });

    const history = useHistory();

    const handleRegisterClick = useCallback(() => {
        if (user.info) {
            history.push({
                pathname: `/tournament/${game}/register`
            });
        } else {
            localStorage.setItem('auth-redirect', `/tournament/${game}/register`);

            history.push({
                pathname: '/sign-up',
                state: { selectedGame: game === 'dota' ? '6110f38fa9258e24cce20f65' : '61112a5ed319f2ded84b1e42', isTournament: true }
            });
        }
    }, [user.info, game]);

    return (
        <div className={className}>
            <section className={styles.banner}>
                <Container>
                    <Row>
                        <Col md='8'>
                            <h1 className={styles.bannerTitle}>командный турнир {
                                game === 'dota' ? 'dota2' : 'cs:go'
                            }</h1>
                            <div className={styles.bannerContent}>
                                <p className={styles.highlight}>{game === 'dota' ? '3' : '4'}&nbsp;марта 2022&nbsp;&mdash; начало в&nbsp;16:00 по&nbsp;мск</p>
                                <p className={styles.bannerP}>
                                    Турнир по&nbsp;системе Single Elimination&nbsp;&mdash; вылет команды после первого поражения. Все матчи, кроме полуфинальных и&nbsp;финальных, будут проходить по&nbsp;системе BO1 (до&nbsp;одной победы). Полуфинальные и&nbsp;финальные в&nbsp;формате BO3.
                                </p>
                            </div>
                        </Col>
                        <Col md='4' className='d-flex flex-column justify-content-end align-items-end'>
                            <Button
                                variant='primary'
                                size='lg'
                                className='mb-4'
                                onClick={handleRegisterClick}>
                                Принять участие
                            </Button>
                            <Participants
                                icon={game === 'dota' ? dotaIcon : csIcon}
                                current={game === 'dota' ? 68 : 53}
                                total={320} />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className={styles.terms}>
                <Container>
                    <Row>
                        <Col md='7' className='d-flex text-center align-items-center'>
                            <div className={styles.termsContent}>
                                <div className='d-flex align-items-center justify-content-center mb-4'>
                                    <span className={styles.termsPrice}>299</span>
                                    <div className='d-flex flex-column align-items-start'>
                                        <span className={styles.termsLabelPrimary}>рублей</span>
                                        <span className={styles.termsLabelSecondary}>стоимость</span>
                                    </div>
                                </div>
                                <p className={styles.termsP}>
                                    Перед началом турнира не&nbsp;забудьте ознакомиться с
                                    <a href={game === 'dota' ? 'https://vk.com/doc151163500_623537427?hash=ee635b9da02041b901&dl=d171fb74503a6f06bf' : 'https://vk.com/doc151163500_623537422?hash=511df782d5b0f100f7&dl=5beb08fec49ce6c2b6'} target='_blank'>&nbsp;регламентом и&nbsp;правилами</a>
                                </p>
                            </div>
                        </Col>
                        <Col md='5' className='position-relative' xs={{ order: 'first', span: '12' }} md={{ order: 'last', span: '5' }}>
                            <Image src={game === 'dota' ? knifeImage : pistolImage} width={600} className={styles.pistolImage} />
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className={styles.prizeSection}>
                <Container>
                    <div className={styles.prizeTotal}>
                        <div className={styles.prizeHeader}>Общий призовой фонд</div>
                        <div className={styles.prizeBody}>50&nbsp;000&nbsp;₽</div>
                    </div>
                    <Row>
                        <Col md='3'>
                            <div className={styles.prizeHeader}>1&nbsp;место</div>
                            <div className={styles.prizeBody}>25&nbsp;000&nbsp;₽</div>
                        </Col>
                        <Col md='3'>
                            <div className={styles.prizeHeader}>2&nbsp;место</div>
                            <div className={styles.prizeBody}>15&nbsp;000&nbsp;₽</div>
                        </Col>
                        <Col md='3'>
                            <div className={styles.prizeHeader}>3&nbsp;место</div>
                            <div className={styles.prizeBody}>10&nbsp;000&nbsp;₽</div>
                        </Col>
                        <Col md='3'>
                            <div className={styles.prizeHeader}>4&nbsp;&mdash;&nbsp;7&nbsp;место</div>
                            <div className={`${styles.prizeBody} ${styles.prizeBodySmall}`}>
                                Тренировка GGplay + курс &laquo;Цена Времени&raquo;
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <section>
                <Container>
                    <div className={styles.footer}>
                        <Row>
                            <Col md='6'>
                                <h3 className={styles.footerTitle}>успей <span className={styles.highlight}>зарегистрироваться</span> до&nbsp;закрытия набора.</h3>
                                <p className={styles.footerP}>После приёма всех заявок на&nbsp;турнир команда GGplay опубликует турнирную сетку и&nbsp;составы команд в&nbsp;нашем сообществе Вконтакте.</p>
                                <Row className='flex-column flex-md-row'>
                                    <Col>
                                        <Participants
                                            icon={game === 'dota' ? dotaIcon : csIcon}
                                            current={game === 'dota' ? 68 : 53}
                                            total={320} />
                                    </Col>
                                    <Col className='d-flex' xs={{ order: 'first', span: '6' }} md={{ order: 'last', span: '6' }}>
                                        <Button
                                            variant='primary'
                                            className={styles.footerBtn}
                                            onClick={handleRegisterClick}>
                                            Принять участие
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {game === 'dota' ? (
                            <Image className={styles.dotaFooterImage} src={dotaFooterImage} width={800} />
                        ) : (
                            <Image className={styles.footerImage} src={csFooterImage} width={1000} />
                        )}
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default connect(({ user }) => ({
    user
}), {})(TournamentDetails);
