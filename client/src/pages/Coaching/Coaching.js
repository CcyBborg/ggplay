import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';
import { fetchGames, fetchCoaches } from './actions';
import GameSelect from '../../components/GameSelect/GameSelect';
import Spinner from '../../components/Spinner/Spinner';
import CoachCard from './components/CoachCard/CoachCard';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import rocketIcon from './images/rocket.svg';
import foregroundImage from './images/coaching-foreground.png';
import styles from './coaching.module.css';
import ArrowIcon from '../../components/icons/Arrow/Arrow';

function Coaching({
  games,
  coaches,
  user,
  match,
  history,
  fetchGames,
  fetchCoaches
}) {
  const [selectedGameId, setSelectedGame] = useState(null);
  let selectedGame = null;

  const query = new URLSearchParams(window.location.search);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    if (games.gameList && !selectedGameId) {
      if (query.has('game')) {
        setSelectedGame(query.get('game'));
      } else if (user.info) {
        setSelectedGame(user.info.profile.game['_id']);
      }
    }
  }, [games.gameList]);

  useEffect(() => {
    if (selectedGameId) {
      fetchCoaches({
        game: selectedGameId
      });
    }
  }, [selectedGameId, fetchCoaches]);

  if (games.isLoading) {
    return (
      <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
        <Spinner />
      </div>
    );
  }

  if (games.gameList && selectedGameId) {
    selectedGame = games.gameList.find(g => g['_id'] === selectedGameId);
  }

  return (
    <>
      <div className={styles.banner}>
        <Container>
          <Row>
            <Col md='5' className={styles.bannerContent}>
              <h1 className={styles.bannerHeader}>Тренировки&nbsp;с<br />профессионалами</h1>
              <div className='d-flex'>
                <Image className={styles.bannerRocket} src={rocketIcon} width='19' height='42' alt='GGPlay | Тренировки' />
                <p className={styles.bannerParagraph}>
                  Начни свой путь в&nbsp;киберспорт с&nbsp;лучшими индивидуальными и&nbsp;групповыми тренировками
                </p>
              </div>
              <ul className={styles.bannerList}>
                <li>Онлайн занятия</li>
                <li>Связь с тренерами 24/7</li>
                <li>Запись всех тренировок</li>
              </ul>
              <Button variant='primary' size='lg' href='#coachList'>Начать обучение</Button>
              <p className={styles.bannerSubscript}>Не понравилась тренировка? Напиши нам и мы вернем деньги.</p>
            </Col>
            <Col md='7' className='position-relative'>
              <Image
                src={foregroundImage}
                className={styles.foregroundImage}
                alt='GGPlay | Начни свой путь в киберспорт с лучшими индивидуальными и групповыми тренировками' />
            </Col>
          </Row>
        </Container>
      </div>
      <Container id='coachList' className='mt-3'>
        {selectedGameId ? (
          <>
            <div className={styles.selectGame} onClick={() => setSelectedGame(null)}>
              <h4>Выбери игру</h4>
              <Image src={selectedGame.logo} width='32' height='32' className='mx-3' />
              <ArrowIcon variant='down' />
            </div>
            <div className='d-flex'>
              <div>
                <Image
                  src={selectedGame.banner}
                  width='296'
                  height='500'
                  alt={`${selectedGame.title} | GGPlay`}
                  className={styles.selectedGameBanner} />
              </div>
              {coaches.isLoading ? (
                <Spinner />
              ) : (
                <Row className={styles.coachList}>
                  {coaches.coachList.slice(0, 6).map(coach => (
                    <Col md='4'>
                      <CoachCard
                        id={coach['_id']}
                        title={coach.title}
                        price={coach.price}
                        rating={coach.rating}
                        status={coach.status}
                        reviewsLength={coach.reviewsLength}
                        about={coach.about}
                        img={coach.img} />
                    </Col>
                  ))}
                </Row>
              )
              }
            </div>
          </>
        ) : (
          <>
            <h4>Выбери игру</h4>
            <GameSelect gameList={games.gameList} onSelect={setSelectedGame} />
          </>
        )}
      </Container>
      <div className={styles.cta}>
        <Container className='d-flex flex-column align-items-center'>
          <h2 className='h1'>Уже готов</h2>
          <h3>Освоить новый уровень игры?</h3>
          <Button className={styles.ctaButton} variant='primary' size='lg' onClick={e => {
            e.preventDefault();
            alert('Флоу регистрации');
          }}>
            Начать обучение
          </Button>
        </Container>
      </div>
    </>
  );
}

export default connect(({ coaching, user }) => ({
  games: coaching.games,
  coaches: coaching.coaches,
  user
}), {
  fetchGames,
  fetchCoaches
})(withRouter(Coaching));
