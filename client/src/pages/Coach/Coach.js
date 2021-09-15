import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCoach, paySlot } from './actions';
import CalendarStep from './components/CalendarStep/CalendarStep';
import ConfirmStep from './components/ConfirmStep/ConfirmStep';
import InitStep from './components/InitStep/InitStep';
import Modal from '../../components/Modal/Modal';

const steps = {
  INIT: 'INIT',
  SCHEDULE: 'SCHEDULE',
  CONFIRM: 'CONFIRM'
};

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
  const [step, setStep] = useState(steps.INIT);

  useEffect(() => {
    if(step === steps.SCHEDULE && !user.info) {
      history.push({ pathname: '/sign-in' });
    }
  }, [step, user.info]);

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
      {step === steps.INIT && (
        <Modal title='Профиль тренера' onClose={history.goBack}>
          <InitStep
            coach={coach}
            isLoading={isLoading}
            selectedLesson={selectedLesson}
            onSelectLesson={setLesson}
            onNextStep={() => setStep(steps.SCHEDULE)} />
        </Modal>
      )}
      {step === steps.SCHEDULE && (
        <Modal title='Выбери дату тренировки' size='sm' onBack={() => setStep(steps.INIT)} onClose={history.goBack}>
          <CalendarStep
            slots={coach.lessons[selectedLesson].slots?.filter(slot => !slot.user && new Date(slot.timestamp) - new Date() > 15)}
            onNextStep={slot => {
              setSelectedSlot(slot);
              setStep(steps.CONFIRM);
            }} />
        </Modal>
      )}
      {step === steps.CONFIRM && (
        <Modal title='Подтверджение тренировки' size='sm' onBack={() => setStep(steps.SCHEDULE)} onClose={history.goBack}>
          <ConfirmStep
            selectedSlot={selectedSlot}
            coach={coach}
            selectedLesson={selectedLesson}
            onConfirm={() => {
              paySlot(selectedSlot.source['_id']);
            }}
            onPrevStep={() => setStep(steps.SCHEDULE)} />
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
