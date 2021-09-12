import { withRouter } from 'react-router';

function SlotBooked({ history }) {
    return (
        <div className='banner p-5'>
            <div className='d-flex justify-content-center align-items-center flex-column'>
                <i style={{ fontSize: '40px' }} className='far fa-check-circle'></i>
                <h3>Поздравляем с успешной записью на тренировку!</h3>
                <p className='lead'>Просим не&nbsp;опаздывать на&nbsp;тренировку и&nbsp;присутствовать в&nbsp;созданном дискорд-канале в&nbsp;назначенное время. Всю информацию о&nbsp;твоих тренировках ты&nbsp;можешь узнать в&nbsp;разделе &laquo;Мои тренировки&raquo;.</p>
                <button
                    className='btn btn-hover'
                    onClick={() => history.push({ pathname: '/dashboard' })}>
                    Мои тренировки
                </button>
            </div>
        </div>
    );
}

export default withRouter(SlotBooked);
