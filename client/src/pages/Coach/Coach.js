import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCoach, paySlot } from './actions';
import CalendarStep from './components/CalendarStep/CalendarStep';
import ConfirmStep from './components/ConfirmStep/ConfirmStep';
import InitStep from './components/InitStep/InitStep';

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
  paySlot
}) {
  useEffect(() => {
    fetchCoach(match.params.id);
  }, []);

  const [selectedSlot, setSelectedSlot] = useState(null);

  const [selectedLesson, setLesson] = useState(0);
  const [step, setStep] = useState(steps.INIT);

  if (paymentUrl) {
    window.open(paymentUrl, '_self');
  }

  if (isError) {
    return (
      <p>У нас неполадки - мы уже работаем над их исправлением.</p>
    );
  }

  return (
    <div className='modal-container'>
      {step === steps.INIT && (
        <InitStep
          coach={coach}
          isLoading={isLoading}
          selectedLesson={selectedLesson}
          onSelectLesson={setLesson}
          onNextStep={() => setStep(steps.SCHEDULE)} />
      )}
      {step === steps.SCHEDULE && (
        <CalendarStep
          slots={coach.lessons[selectedLesson].slots.filter(slot => !slot.user)}
          onNextStep={slot => {
            setSelectedSlot(slot);
            setStep(steps.CONFIRM);
          }}
          onPrevStep={() => setStep(steps.INIT)} />
      )}
      {step === steps.CONFIRM && (
        <ConfirmStep
          selectedSlot={selectedSlot}
          coach={coach}
          selectedLesson={selectedLesson}
          onPrevStep={() => setStep(steps.SCHEDULE)}
          onConfirm={() => {
            paySlot(selectedSlot.source['_id']);
          }} />
      )}
    </div>
  );
}

export default connect(({ coach }) => ({
  isLoading: coach.isLoading,
  isError: coach.isError,
  coach: coach.coach,
  paymentUrl: coach.paymentUrl
}), {
  fetchCoach,
  paySlot
})(Coach);
