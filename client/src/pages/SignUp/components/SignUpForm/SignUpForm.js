import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './sign-up-form.module.css';

function SignUpForm({ onSubmit }) {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Form onSubmit={e => {
                e.preventDefault();

                onSubmit({
                    nickname,
                    email,
                    password
                });
            }}>
                <div className='d-flex flex-column'>
                    <Form.Control
                        type='text'
                        placeholder='Никнейм'
                        className={styles.input}
                        onChange={e => setNickname(e.target.value)} />
                    <Form.Control
                        type='email'
                        placeholder='Электронная почта'
                        className={styles.input}
                        onChange={e => setEmail(e.target.value)} />
                    <Form.Control
                        type='password'
                        placeholder='Пароль'
                        className={styles.input}
                        onChange={e => setPassword(e.target.value)} />
                    <Button variant='primary' type='submit' className={styles.submit} size='lg' disabled={!(nickname && email && password)}>
                        Продолжить
                    </Button>
                </div>
            </Form>
            <div className={styles.loginWithLabel}>
                или с помощью
            </div>
        </>
    );
}

export default SignUpForm;
