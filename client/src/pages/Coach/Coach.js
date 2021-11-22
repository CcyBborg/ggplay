import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCoach, paySlot } from './actions';
import { Modal, Button } from 'react-bootstrap';
import CalendarStep from './components/CalendarStep/CalendarStep';
import InitStep from './components/InitStep/InitStep';
import styles from './coach.module.css';

function Coach({
  coach,
  isLoading,
  isError,
  match,
  fetchCoach,
  paymentUrl,
  paySlot,
  history,
  user
}) {
  useEffect(() => {
    fetchCoach(match.params.id);
  }, []);

  const [selectedSlot, setSelectedSlot] = useState(null);

  const [selectedLesson, setLesson] = useState(0);
  const [dateStep, setDateStep] = useState(false);

  const selectedDate = selectedSlot && new Date(selectedSlot.source.timestamp);

  if (paymentUrl) {
    window.open(paymentUrl, '_self');
  }

  if (isError) {
    return (
      <p>У нас неполадки - мы уже работаем над их исправлением.</p>
    );
  }

  return (
    <>
      {!dateStep ? (
        <Modal size='lg' show={true} onHide={history.goBack}>
          <Modal.Header closeButton>
            <Modal.Title>Профиль тренера</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InitStep
              coach={coach}
              isLoading={isLoading}
              selectedLesson={selectedLesson}
              onSelectLesson={setLesson}
              onNextStep={() => setDateStep(true)} />
          </Modal.Body>
        </Modal>
      ) : (
        <Modal size='md' show={true} onHide={() => setDateStep(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Выбери дату тренировки</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CalendarStep
              slots={coach.lessons[selectedLesson].slots?.filter(slot => !slot.user && new Date(slot.timestamp) - new Date() > 15)}
              lessonTitle={coach.lessons[selectedLesson].title}
              selectedSlot={selectedSlot}
              onNextStep={slot => {
                setSelectedSlot(slot);
              }}
              onSetSelectedDate={() => setSelectedSlot(null)}
              onChangeLesson={() => {
                setSelectedSlot(null);
                setDateStep(false);
              }} />
          </Modal.Body>
          {selectedSlot && (
            <Modal.Footer className='d-flex justify-content-between'>
              <div>
                <p className={styles.selectedDate}>Четверг, 11 ноября 2021</p>
                <p className={styles.selectedTime}>12:30</p>
              </div>
              <Button variant='primary' onClick={() => paySlot(selectedSlot.source['_id'])}>
                Подтвердить запись
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      )}
    </>
  );
}

export default connect(({ coach, user }) => ({
  isLoading: coach.isLoading,
  isError: coach.isError,
  coach: coach.coach,
  paymentUrl: coach.paymentUrl,
  user
}), {
  fetchCoach,
  paySlot
})(withRouter(Coach));
