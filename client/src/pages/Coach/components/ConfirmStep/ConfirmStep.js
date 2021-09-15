function ConfirmStep({
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
        <>
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
        </>
    );
}

export default ConfirmStep;
