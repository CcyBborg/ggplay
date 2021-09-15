import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchSlots } from './actions';
import Spinner from '../../components/Spinner/Spinner';
import Slot from './components/Slot/Slot';

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

    const isEmptySlots = !slots.slots.present.length && !slots.slots.past.length;

    return (
        <div className='container pt-5'>
            {isEmptySlots ? (
                <div className='banner p-5 text-center'>
                    <p className='lead pb-3'>У&nbsp;тебя пока нет записей на&nbsp;тренировки.</p>
                    <a className='btn btn-hover' href='/coaching'>Найти тренировку</a>
                </div>
            ) : (
                <div className='row'>
                    <div className='col mb-4'>
                        <h4 className='mb-3 mb-md-5'>Предстоящие тренировки</h4>
                        {slots.slots.present.length ? (
                            <div className='slot-list d-flex flex-column align-items-stretch'>
                                {slots.slots.present.map(slot => (
                                    <div key={slot._id}>
                                        <Slot
                                            timestamp={slot.timestamp}
                                            invite={slot.invite}
                                            channel={slot.channel}
                                            lesson={slot.lesson} />
                                    </div >
                                )
                                )}
                            </div>
                        ) : (
                            <div className='text-center'>
                                <p className='lead pb-3'>У&nbsp;тебя нет предстоящих записей на&nbsp;тренировки. Найди свою тренировку в&nbsp;разделе &laquo;Тренировки&raquo;.</p>
                                <a className='btn btn-hover' href='/coaching'>Найти тренировку</a>
                            </div>
                        )
                        }
                    </div>


                    {slots.slots.past?.length && (
                        <div className='col mb-4'>
                            <h4 className='mb-3 mb-md-5'>Пройденные тренировки</h4>
                            <div className='slot-list d-flex flex-column align-items-stretch'>
                                {slots.slots.past.map(slot => (
                                    <div key={slot._id}>
                                        <Slot
                                            timestamp={slot.timestamp}
                                            review={slot.review}
                                            lesson={slot.lesson} />
                                    </div >
                                ))}
                            </div>
                        </div>
                    )}
                </div >
            )}
        </div>);
}

export default connect(({ user, slots }) => ({
    user,
    slots
}), {
    fetchSlots
})(withRouter(Dashboard));
