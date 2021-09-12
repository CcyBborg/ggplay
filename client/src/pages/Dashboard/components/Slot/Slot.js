import { withRouter } from 'react-router-dom'
import Copier from '../../../../components/Copier/Copier';

function Slot({
    timestamp,
    lesson,
    review,
    channel,
    invite,
    history
}) {
    const time = new Date(timestamp);

    return (
        <div className='slot-card d-flex p-3 mb-3'>
            <div className='slot-card__schedule pr-2 pr-md-3 d-flex flex-column align-items-center'>
                <div className='d-flex justify-content-between flex-column align-items-center'>
                    <span className='slot-card__date'>
                        {time.toLocaleString('ru', {
                            day: 'numeric'
                        })}
                    </span>
                    <span className='slot-card__month'>
                        {time.toLocaleString('ru', {
                            month: 'long'
                        })}
                    </span>
                </div>
                <div className='pt-3 font-weight-normal lead'>
                    {time.toLocaleString('ru', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>
            <div className='slot-card__info pl-2 pl-md-3 flex-fill'>
                <div className='text-center'>
                    <h5>{lesson.title}</h5>
                    <button
                        style={{
                            margin: '0 auto'
                        }}
                        className='btn btn-link mt-2 d-flex align-items-center justify-content-center'
                        onClick={() => history.push({ pathname: `/dashboard/coach/${lesson.coach._id}` })}>
                        <img
                            width={25}
                            height={25}
                            className='slot-card__coach-img mr-2'
                            src={lesson.coach.img} />
                        <strong>{lesson.coach.title}</strong>
                    </button>
                </div>
                <div className='mt-3'>
                    {review ? (
                        <div>
                            <h6>Твоя оценка:</h6>
                            <ul
                                className='
coach-rating
p-0
mt-2
mb-1
list-inline
text-primary
d-flex
align-items-center
justify-content-left
'
                            >
                                {[...Array(review.rating)].map(i => (
                                    <li key={i}>
                                        <i className='fa fa-star' aria-hidden='true'></i>
                                    </li>
                                ))}
                            </ul>
                            <p>{review.comment}</p>
                        </div>
                    ) : (
                        <>
                            <div className='mb-3'>
                                <p className='mb-2'>Канал для твоей тренировки:</p>
                                <Copier text={channel} />
                            </div>
                            <div>
                                <p className='mb-2'>Приглашение в наш Discord-сервер:</p>
                                <Copier text={invite} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withRouter(Slot);
