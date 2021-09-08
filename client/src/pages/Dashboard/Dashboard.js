import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchSlots } from './actions';
import Spinner from '../../components/Spinner/Spinner';
import Copier from '../../components/Copier/Copier';

function Dashboard({
    history,
    user,
    slots,
    fetchSlots
}) {
    if (!user.info) {
        history.push({ pathname: '/sign-in' });
    }

    useEffect(() => {
        fetchSlots();
    }, []);

    if (slots.isLoading) {
        return (
            <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
                <Spinner />
            </div>
        );
    }

    return (
        <div className='container pt-5'>
            <h4 className='mb-5 text-center'>Мои тренировки</h4>
            {slots.slots ? (
                <div className='slot-list d-flex flex-column align-items-center'>
                    {slots.slots.map(slot => {
                        const time = new Date(slot.timestamp);

                        return (
                            <div key={slot._id}>
                                <div className='slot-card d-flex p-3 mb-3'>
                                    <div className='slot-card__schedule pr-3 d-flex flex-column align-items-center'>
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
                                    <div className='slot-card__info pl-3 flex-fill'>
                                        <div className='text-center'>
                                            <h5>{slot.lesson.title}</h5>
                                            <a className='btn btn-link mt-2 d-flex align-items-center justify-content-center' href='#'>
                                                <img
                                                    width={25}
                                                    height={25}
                                                    className='slot-card__coach-img mr-2'
                                                    src={slot.lesson.coach.img} />
                                                <strong>{slot.lesson.coach.title}</strong>
                                            </a>
                                        </div>
                                        <div className='mt-3'>
                                            <div className='mb-3'>
                                                <p className='mb-2'>Канал для твоей тренировки:</p>
                                                <Copier text={slot.channel} />
                                            </div>
                                            <div>
                                                <p className='mb-2'>Приглашение в наш Discord-сервер:</p>
                                                <Copier text={slot.invite} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>
                    <div className='empty-placeholder pt-5 text-center'>
                        <p className='lead pb-3'>У&nbsp;тебя пока нет записей на&nbsp;тренировки.</p>
                        <a className='btn btn-hover' href='/coaching'>Найти тренировку</a>
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default connect(({ user, slots }) => ({
    user,
    slots
}), {
    fetchSlots
})(withRouter(Dashboard));
