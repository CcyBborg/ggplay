import LessonSelect from '../LessonSelect/LessonSelect';
import Spinner from '../../../../components/Spinner/Spinner';

function InitStep({
  isLoading,
  coach,
  selectedLesson,
  onSelectLesson,
  onNextStep
}) {
  const tags = coach?.game.filters[0].tags.filter(t => coach.tags.includes(t.key));

  return (
    <>
      {isLoading ? (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
          <Spinner />
        </div>
      ) : (
        <>
          <div className='coach-info pb-3 d-flex'>
            <img
              className='coach-info__img'
              src={coach.img}
              alt={`Тренер ${coach.title} | GGPlay`} />
            <div className='ml-3 flex-fill'>
              <div className='d-flex justify-content-between align-items-start'>
                <div>
                  <h5>{coach.title}</h5>
                  <div className='pt-1 text text-secondary font-weight-bold'>
                    {coach.status}
                  </div>
                </div>
                <div className='d-flex align-items-center'>
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
                    <li>
                      <i className='fa fa-star' aria-hidden='true'></i>
                    </li>
                  </ul>
                  <span className='text text-secondary ml-2'>4.4 (36 отзывов)</span>
                </div>
              </div>
              <ul className='coach-labels__list d-flex mt-1 flex-wrap'>
                {tags.map(t => (
                  <li key={t.key} className='mr-1'>
                    <span
                      className='badge border border-secondary text-secondary'
                    >{t.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='coach-booking pt-3 pb-3'>
            <p className='text tex-secondary text-center'>Выберите вид тренировки</p>
            <LessonSelect
              list={coach.lessons}
              selectedLesson={selectedLesson}
              onSelect={onSelectLesson} />
            <button className='btn btn-hover btn-lg btn-schedule-coach mt-3' onClick={onNextStep}>
              <i className='far fa-calendar-alt mr-4'></i> Запланировать урок
            </button>
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
                          <i className='fa fa-star' aria-hidden='true'></i>
                        </li>
                      ))}
                    </ul>
                    <p className='mt-2'>{r.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Пока нет отзывов. Запишись на тренировку и будь первым!</p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default InitStep;
