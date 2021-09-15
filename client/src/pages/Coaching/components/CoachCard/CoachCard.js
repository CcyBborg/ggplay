import { withRouter } from 'react-router-dom';

function CoachCard({
  id,
  title,
  status,
  price,
  history,
  reviewsLength,
  rating,
  img
}) {
  return (
    <div className='coach-card' onClick={() => history.push({ pathname: `/coaching/coach/${id}${window.location.search}` })}>
      <div className='p-3'>
        <div className='d-flex'>
          <div className='mr-3'>
            <img
              className='coach-card__img'
              src={img}
              alt={`Тренер ${title} | GGPlay`}
            />
          </div>
          <div>
            <h6 className='mb-0'>{title}</h6>
            <span className='text font-weight-bold'
            >{status}</span>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-center coach-card__footer p-3'>
      {Boolean(reviewsLength) && (
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
                <span className='text ml-2'>{rating}&nbsp;({reviewsLength}&nbsp;отзывов)</span>
              </div>
      )}
        <span className='text'>от&nbsp;{price}&nbsp;₽</span>
      </div>
    </div>
  );
}

export default withRouter(CoachCard);
