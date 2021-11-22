import { useEffect, useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import keyboardIcon from '../../images/keyboard.png';
import arrowRightIcon from './images/arrow-right.svg';
import arrowLeftIcon from './images/arrow-left.svg';
import styles from './calendar-select.module.css';

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
  slots,
  lessonTitle,
  selectedSlot,
  onNextStep,
  onChangeLesson,
  onSetSelectedDate
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
    <>
      <div className={styles.lessonType}>
        <div className='d-flex'>
          <div>
            <Image className={styles.lessonIcon} src={keyboardIcon} width='28px' />
          </div>
          <div>
            <h4 className={styles.lessonTypeTitle}>Тип тренировки</h4>
            <p className={styles.lessonTitle}>{lessonTitle}</p>
          </div>
        </div>
        <Button variant='link' className={styles.changeLesson} onClick={onChangeLesson}>
          Изменить
        </Button>
      </div>
      <div className={styles.divider} />
      <div className='mt-5'>
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
        onClickDay={date => {
          onSetSelectedDate();
          setSelectedDate(date);
        }}
        nextLabel={(
          <Image src={arrowRightIcon} width='32' height='32' />
        )}
        prevLabel={(
          <Image src={arrowLeftIcon} width='32' height='32' />
        )} />
        </div>
      {timeSlots && !selectedSlot && (
        <>
        <div className={styles.divider} />
        <div className='mt-5'>
          <p className={styles.timeText}>Время доступное на <span className='text-white text-bold'>{selectedDate.toLocaleString('ru', {
            month: 'long',
            day: 'numeric'
          })}</span></p>
          <div className='list-unstyled d-flex'>
            {timeSlots.sort(compareTime).map(slot => (
              <li key={slot._id}>
                <Button variant='secondary' size='sm' onClick={() => onNextStep(slot)}>
                  {checkTime(slot.hours)}:{checkTime(slot.minutes)}
                </Button>
              </li>
            ))}
          </div>
        </div>
        </>
      )}
    </>
  );
}

export default CalendarStep;
