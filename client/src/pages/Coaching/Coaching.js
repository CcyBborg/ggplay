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
      <section className='content'>
        <div className='banner-bg pt-3 pb-5 mb-5'>
          <div className='banner-container'>
            <div className='d-flex justify-content-center flex-column-reverse flex-md-row'>
              <div>
                <h3 className='text-white mb-4 pt-5' style={{ fontSize: '35px' }}>Тренировки с&nbsp;профессионалами</h3>
                <p className='lead text-white'>Онлайн-тренировки и&nbsp;разборы реплеев.<br />
                  Командная игра с&nbsp;опытными тренерами.</p>
                <button className='btn btn-hover mt-3 btn-banner btn-lg' onClick={() => history.push('/sign-up')}>Начать обучение</button>
              </div>
              <div>
                <img width='340' src='/images/coaching.png' alt='Тренировки у лучших киберспортсменов | GGPlay' />
              </div>
            </div>
            <ul className='features-list pt-5'>
              <li>
                <h6>Проверенные тренеры</h6>
                <p>Из ТОП 1% игроков</p>
              </li>
              <li>
                <h6>Запись всех уроков</h6>
                <p>Доступ к просмотру всегда</p>
              </li>
              <li>
                <h6>Связь с тренерами 24/7</h6>
                <p>Пообщайся прямо сейчас</p>
              </li>
            </ul>
          </div>
        </div>
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
      </section>
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
