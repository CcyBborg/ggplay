import { withRouter } from 'react-router-dom';
import ReviewCount from '../../../../components/ReviewCount/ReviewCount';

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
      <div>
        <div className='d-flex flex-column'>
          <div className='position-relative'>
            <img
              className='coach-card__img'
              src={img}
              alt={`Тренер ${title} | GGPlay`}
            />
          </div>
          <div className='pl-3 pr-3 pt-3 pb-3'>
            <h5 className='mb-0'>{title}</h5>
            <span className='text'
            >{status}</span>
          </div>
        </div>
      </div>
      <div className='p-3 d-flex justify-content-between align-items-center coach-card__footer'>
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
            <span className='text text-primary ml-2'>{rating.toFixed(1)}</span>
          </div>
        )}
        <span className='text'>от&nbsp;{price}&nbsp;₽</span>
      </div>
    </div>
  );
}

export default withRouter(CoachCard);
