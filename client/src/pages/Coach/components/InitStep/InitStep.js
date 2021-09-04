import { useCallback, useState, useEffect } from 'react';
import LessonSelect from '../LessonSelect/LessonSelect';
import Spinner from '../../../../components/Spinner/Spinner';
import { withRouter } from 'react-router-dom';

function InitStep({
  history,
  isLoading,
  coach,
  selectedLesson,
  onSelectLesson,
  onNextStep
}) {
  const tags = coach?.game.filters[0].tags.filter(t => coach.tags.includes(t.key));

  return (
    <div className='modal'>
      <header className='modal-header d-flex justify-content-center align-items-center'>
        <h4 className='m-0 h6 text-center'>Профиль тренера</h4>
        <button className='btn-close' onClick={() => history.push({ pathname: '/coaching' })}>
          <i className='fas fa-times'></i>
        </button>
      </header>
      <div className='modal-body'>
        {isLoading ? (
          <div className='d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
            <Spinner />
          </div>
        ) : (
          <>
            <div className='coach-info pb-3 d-flex justify-content-between'>
              <div className='d-flex'>
                <img
                  className='coach-info__img'
                  src={coach.img}
                  alt={`Тренер ${coach.title} | GGPlay`} />
                <div className='ml-3'>
                  <h5>{coach.title}</h5>
                  <div class="d-flex jusitfy-content-start flex-column align-items-start coach-card__footer pt-1">
                    <span class="text text-secondary font-weight-bold"
                    >Sucker</span>
                  </div>
                </div>
              </div>
              <div>
                <div className='d-flex align-items-center mt-2 mb-2'>
                  <ul
                    class="
                    coach-rating
                    p-0
                    m-0
                    list-inline
                    text-primary
                    d-flex
                    align-items-center
                    justify-content-left
                  "
                  >
                    <li>
                      <i class="fa fa-star" aria-hidden="true"></i>
                    </li>
                  </ul>
                  <span class="text text-secondary ml-2">4.4 (36)</span>
                </div>
              </div>
            </div>
            <ul className='coach-labels__list d-flex'>
              {tags.map(t => (
                <li key={t.key} className='mr-1'>
                  <span
                    className='badge border border-secondary text-secondary'
                  >{t.label}</span>
                </li>
              ))}
            </ul>
            <div className="coach-booking pt-3 pb-3">
              <p className="text tex-secondary text-center">Выберите вид тренировки</p>
              <LessonSelect
                list={coach.lessons}
                selectedLesson={selectedLesson}
                onSelect={onSelectLesson} />
              <div className='mt-3'>
                {/* <div className="schedule-amount d-flex justify-content-between align-items-center">
                  <button
                    className={`schedule-amount__minus pl-3 pr-3 ${amount === 1 ? 'schedule-amount__disabled' : ''}`}
                    disabled={amount === 1}
                    onClick={() => handleSetAmount(amount - 1)}>
                    <i className='fas fa-minus'></i>
                  </button>
                  <span className='schedule-amount__counter pl-2 pr-2'>{amount}</span>
                  <button
                    className={`schedule-amount__plus pl-3 pr-3 ${amount === 5 ? 'schedule-amount__disabled' : ''}`}
                    disabled={amount === 5}
                    onClick={() => handleSetAmount(amount + 1)}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div> */}
                <button className='btn btn-hover btn-lg btn-schedule-coach' onClick={onNextStep}>
                  <i className='far fa-calendar-alt mr-4'></i> Запланировать урок
                </button>
              </div>
            </div>
            <div className='pt-3 mb-4'>
              <h6 className='mb-3'>О себе:</h6>
              <p>{coach.about}</p>
            </div>
            <div className='coach-reviews mt-3'>
              <h6>Отзывы:</h6>
              {coach.reviews?.length ? (
                <ul className='reviews'>
                  {coach.reviews.map(r => (
                    <li key={r['_id']} className='review-item pt-3'>
                      <ul
                        className='
                                    coach-rating
                                    p-0
                                    m-0
                                    list-inline
                                    text-primary
                                    d-flex
                                    align-items-center
                                    justify-content-left
                                  '
                      >
                        {[...Array(r.rating)].map(i => (
                          <li key={i}>
                            <i class="fa fa-star" aria-hidden="true"></i>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2">{r.review}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Пока нет отзывов. Запишись на тренировку и будь первым!</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default withRouter(InitStep);
