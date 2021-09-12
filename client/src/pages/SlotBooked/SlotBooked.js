import { withRouter } from 'react-router';

function SlotBooked({ history }) {
    return (
        <div className='container mt-5'>
            <div className='banner p-5'>
                <div className='d-flex justify-content-center align-items-center flex-column text-center'>
                    <i style={{ fontSize: '60px' }} className='far fa-check-circle text-primary p-4'></i>
                    <h3>Поздравляем с успешной записью на тренировку!</h3>
                    <p className='lead pt-3'>Просим не&nbsp;опаздывать на&nbsp;тренировку и&nbsp;присутствовать в&nbsp;созданном дискорд-канале в&nbsp;назначенное время. Всю информацию о&nbsp;твоих тренировках ты&nbsp;можешь узнать в&nbsp;разделе &laquo;Мои тренировки&raquo;.</p>
                    <button
                        className='btn btn-hover mt-3'
                        onClick={() => history.push({ pathname: '/dashboard' })}>
                        Мои тренировки
                    </button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(SlotBooked);
