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
  }, [selectedGameId]);

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
        <div className='container pt-4 pb-5'>
          <div className='banner p-3 pl-sm-5 pr-sm-5 pt-sm-4 pb-sm-4 mb-5 d-sm-flex justify-content-between align-items-center'>
            <div>
              <h1 className='h3 text-white mb-3'>Обучение от&nbsp;топовых тренеров</h1>
              <p className='mt-2 mb-4 lead' style={{ maxWidth: '700px' }}>Лучшие проверенные тренеры, которые помогли более чем 1000 ученикам реализовать свои цели в&nbsp;играх.</p>
            </div>
            <div>
              <img width='280' src='/images/coaching.png' />
            </div>
          </div>
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
              <h4 className='mt-4 mb-4'>Тренера по {selectedGame.title}</h4>
              <div className='coach-list-block position-relative pt-1'>
                <div className='trending-custom-tab'>
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
                  <div className='pt-4'>
                    <div className='row'>

                      {coachList?.length ? coachList.map(coach => (
                        <div className='col-xs-12 col-md-auto mb-4' key={coach['_id']}>
                          <CoachCard
                            id={coach['_id']}
                            title={coach.title}
                            price={coach.price}
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
