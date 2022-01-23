import { useState } from 'react';
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
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [steam, setSteam] = useState('');
    const [social, setSocial] = useState('');

    return (
        <Modal size='md' show={isShow} onHide={onHide}>
            <Modal.Header closeButton>
                <div>
                    <h4 className={styles.modalTitle}>{title}</h4>
                    <span className={styles.modalSub}>{subtitle}</span>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e => {
                    e.preventDefault();
                    onSubmit({
                        nickname,
                        email,
                        steam,
                        social
                    });
                }}>
                    <p className={styles.legend}>Для участия в&nbsp;турнире заполните регистрационную форму</p>
                    <Form.Control
                        type='text'
                        placeholder='Никнейм в игре'
                        className={styles.input}
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                        required />
                    <Form.Control
                        type='email'
                        placeholder='Электронная почта'
                        className={styles.input}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required />
                    <Form.Control
                        type='text'
                        placeholder='Ссылка на аккаунт в Steam'
                        className={styles.input}
                        value={steam}
                        onChange={e => setSteam(e.target.value)}
                        required />
                    <Form.Control
                        type='text'
                        placeholder='Ссылка на аккаунт в социальной сети'
                        className='mb-4'
                        value={social}
                        onChange={e => setSocial(e.target.value)}
                        required />
                    <div className={styles.divider} />
                    <div className='mt-5'>
                        {children}
                    </div>
                    <Button
                        className={styles.submit}
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
