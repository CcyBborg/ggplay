import { Modal, Form, Button } from 'react-bootstrap';
import styles from './register-modal.module.css';

function RegisterModal({
    title,
    subtitle,
    children,
    isShow,
    onHide,
    onSubmit 
}) {
    return (
        <Modal size='md' show={isShow} onHide={onHide}>
            <Modal.Header closeButton>
                <div>
                    <h4 className={styles.modalTitle}>{title}</h4>
                    <span className={styles.modalSub}>{subtitle}</span>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={() => onSubmit({})}>
                    <p className={styles.legend}>Для участия в&nbsp;турнире заполните регистрационную форму</p>
                    <Form.Control
                        type='text'
                        placeholder='Логин'
                        className={styles.input} />
                    <Form.Control
                        type='email'
                        placeholder='Электронная почта'
                        className={styles.input} />
                    <Form.Control
                        type='url'
                        placeholder='Ссылка на аккаунт в Steam'
                        className={styles.input} />
                    <Form.Control
                        type='url'
                        placeholder='Ссылка на аккаунт в социальной сети'
                        className='mb-4' />
                    <div className={styles.divider} />
                    <div className='mt-5'>
                        {children}
                    </div>
                    <Button
                        className='mt-3'
                        size='lg'
                        variant='primary'
                        type='submit'>
                        Записаться на турнир
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default RegisterModal;
