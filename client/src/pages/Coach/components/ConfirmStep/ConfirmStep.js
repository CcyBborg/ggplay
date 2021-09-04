import { withRouter } from 'react-router-dom';

function ConfirmStep({
    history,
    coach,
    selectedSlot,
    selectedLesson,
    onPrevStep,
    onConfirm
}) {
    const selectedDate = new Date(selectedSlot.source.timestamp);

    const dateDisplayProps = {
        hour: '2-digit',
        minute: '2-digit',
        month: 'long',
        day: 'numeric',
    };

    if (selectedDate.getFullYear() !== new Date().getFullYear()) {
        dateDisplayProps.year = 'numeric';
    }

    return (
        <div className='modal modal-sm' style={{
            height: '400px'
        }}>
        <header className='modal-header d-flex justify-content-center align-items-center'>
          <button className='modal__btn-back' onClick={onPrevStep}>
            <i className='fas fa-arrow-left'></i>
          </button>
          <h4 className='m-0 h6 text-center'>Подтвердите запись на тренировку</h4>
          <button className='btn-close' onClick={() => history.push({ pathname: '/coaching' })}>
            <i className='fas fa-times'></i>
          </button>
        </header>
        <div className='modal-body'>
            <div className='text-center'>
                <i className='confirm__icon text-primary far fa-calendar-check'></i>
                <p className='h6 font-weight-normal mt-3'>
                    {coach.lessons[selectedLesson].title}&nbsp;|&nbsp;{coach.title}
                </p>
                <h4>{selectedDate.toLocaleString('ru', dateDisplayProps)}</h4>
            </div>
            <div className='mt-4 row'>
                <div className='col'>
                    <button
                        className='btn-secondary btn-block'
                        onClick={onPrevStep}>
                        Изменить
                    </button>
                </div>
                <div className='col'>
                    <button
                        className='btn btn-hover btn-block'
                        onClick={onConfirm}>
                        Оплатить
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
}

export default withRouter(ConfirmStep);
