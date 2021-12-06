import { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import vkIcon from './images/vk.svg';
import googleIcon from './images/google.svg'
import yandexIcon from './images/yandex.svg';
import discordIcon from './images/discord.svg';
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
            <ul className={styles.socials}>
                <li>
                    <Button className={styles.socialsButton} variant='secondary'>
                        <Image src={vkIcon} width='28' height='28' />
                    </Button>
                </li>
                <li>
                    <Button className={styles.socialsButton} variant='secondary'>
                        <Image src={googleIcon} width='28' height='28' />
                    </Button>
                </li>
                <li>
                    <Button className={styles.socialsButton} variant='secondary'>
                        <Image src={yandexIcon} width='28' height='28' />
                    </Button>
                </li>
                <li>
                    <Button className={styles.socialsButton} variant='secondary'>
                        <Image src={discordIcon} width='28' height='28' />
                    </Button>
                </li>
            </ul>
        </>
    );
}

export default SignUpForm;
