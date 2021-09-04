import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { withRouter } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

function compareTime(a, b) {
  if (a.hours < b.hours) {
    return -1;
  } else if (a.hours > b.hours) {
    return 1;
  } else {
    return a.minutes < b.minutes ? -1 : 1;
  }
}

function CalendarStep({
  history,
  slots,
  amount,
  onPrevStep,
  onNextStep
}) {
  const formattedSlots = slots.map(s => {
    const date = new Date(s.timestamp);

    return {
      source: s,
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes()
    };
  });

  const [selectedDate, setSelectedDate] = useState();
  const [timeSlots, setTimeSlots] = useState();

  useEffect(() => {
    if (selectedDate) {
      setTimeSlots(formattedSlots.filter(t => (
        t.year === selectedDate.getFullYear() &&
        t.month === selectedDate.getMonth() &&
        t.date === selectedDate.getDate()
      )));
    }
  }, [selectedDate]);

  return (
    <div className='modal modal-sm' style={{
      height: selectedDate ? '800px' : '588px'
    }}>
      <header className='modal-header d-flex justify-content-center align-items-center'>
        <button className='modal__btn-back' onClick={onPrevStep}>
          <i className='fas fa-arrow-left'></i>
        </button>
        <h4 className='m-0 h6 text-center'>Выберите {amount === 1 ? 'дату тренировоки' : 'даты тренировок'}</h4>
        <button className='btn-close' onClick={() => history.push({ pathname: '/coaching' })}>
          <i className='fas fa-times'></i>
        </button>
      </header>
      <div className='modal-body'>
        <Calendar
          className='calendar'
          locale='ru'
          maxDetail='month'
          defaultView='month'
          showNeighboringMonth={false}
          prev2Label={null}
          next2Label={null}
          minDate={new Date()}
          tileDisabled={({ date }) => (
            !formattedSlots.find(
              t => (
                t.year === date.getFullYear() &&
                t.month === date.getMonth() &&
                t.date === date.getDate()
              )
            )
          )}
          onClickDay={date => setSelectedDate(date)}
          nextLabel={(
            <i className='fas fa-chevron-right'></i>
          )}
          prevLabel={(
            <i className='fas fa-chevron-left'></i>
          )} />
        {timeSlots && (
          <div className='mt-3 mb-3'>
            <h5 className='mb-2'>Выберите время</h5>
            <p>Доступное время на <span className='font-weight-bold text-white'>{selectedDate.toLocaleString('ru', {
              month: 'long',
              day: 'numeric'
            })}</span></p>
            <ul className='list-unstyled d-flex'>
              {timeSlots.sort(compareTime).map(slot => (
                <li className='mr-1'>
                  <button className='btn-secondary' onClick={() => onNextStep(slot)}>
                    {checkTime(slot.hours)}:{checkTime(slot.minutes)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(CalendarStep);
