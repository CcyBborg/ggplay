import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';
import Select from 'react-select'
import { fetchGames, fetchCoaches } from './actions';
import GameSelect from './components/GameSelect/GameSelect';
import Spinner from '../../components/Spinner/Spinner';
import CoachCard from './components/CoachCard/CoachCard';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import rocketIcon from './images/rocket.svg';
import foregroundImage from './images/coaching-foreground.png';
import styles from './coaching.module.css';

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

  let coachList = null;

  const [selectedTags, setSelectedTags] = useState(null);

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
      } else {
        history.push({ search: `game=${games.gameList[0]['_id']}` })
        setSelectedGame(games.gameList[0]['_id']);
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

  if (!coaches.isLoading) {
    coachList = selectedTags ? (
      coaches.coachList?.filter(c => selectedTags.every(t => c.tags.includes(t.value)))
    ) : (coaches.coachList);
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
              <Button variant='primary' size='lg'>Начать обучение</Button>
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
        {/* <section className='content'>
        <div className='container pb-5'>
          <GameSelect
            selectedGame={selectedGameId}
            gameList={games.gameList}
            onSelect={setSelectedGame}
            openOnFocus={true}
            autofocus={true} />
          {coaches.isLoading ? (
            <div className='d-flex align-items-center justify-content-center' style={{ height: '400px' }}>
              <Spinner />
            </div>
          ) : (
            <>
              <div className='mt-4 mb-4 row align-items-center'>
                <div className='col-sm col-12'>
                  <h4 className='mb-3 m-md-0'>Тренеры по {selectedGame.title}</h4>
                </div>
                <div className='col-sm col-12'>
                  {selectedGame?.filters?.[0] && (
                    <div style={{
                      maxWidth: '600px',
                      width: '100%'
                    }}>
                      <Select
                        className='react-select-container'
                        classNamePrefix='react-select'
                        isMulti
                        openMenuOnFocus={true}
                        placeholder={selectedGame.filters[0].name}
                        options={selectedGame.filters[0].tags.map(f => ({
                          value: f.key,
                          label: f.label
                        }))}
                        noOptionsMessage={() => 'Нет вариантов'}
                        onChange={setSelectedTags} />
                    </div>
                  )}
                </div>
              </div>
              <div className='coach-list-block position-relative pt-1'>
                <div className='trending-custom-tab'>
                  <div className='pt-4'>
                    <div className='row'>

                      {coachList?.length ? coachList.map(coach => (
                        <div className='col-xs-12 col-md-auto mb-4' key={coach['_id']}>
                          <CoachCard
                            id={coach['_id']}
                            title={coach.title}
                            price={coach.price}
                            rating={coach.rating}
                            status={coach.status}
                            reviewsLength={coach.reviewsLength}
                            img={coach.img} />
                        </div>
                      )) : (
                        <div className='banner p-4'>
                          <p className='lead p-3'>Таких тренеров пока нет</p>
                          <p className='text text-primary'>Но мы уже их ищем</p>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section> */}
      </div>
      <Container>
        <GameSelect gameList={games.gameList} />
      </Container>
      <div className={styles.cta}>
        <Container className='d-flex flex-column align-items-center'>
          <h2 className='h1'>Уже готов</h2>
          <h3>Освоить новый уровень игры</h3>
          <Button className={styles.ctaButton} variant='primary' size='lg'>
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
