import { useState } from 'react';
import { connect } from 'react-redux';
import AuthScreen from '../../components/AuthScreen/AuthScreen';
import { Form, Row, Col, Container, Image, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { signInUser } from './actions';
import vkIcon from './images/vk.svg';
import googleIcon from './images/google.svg'
import yandexIcon from './images/yandex.svg';
import discordIcon from './images/discord.svg';
import styles from './sign-in.module.css';

function SignIn({
    history,
    isLoading,
    isUserSignedIn,
    error,
    signInUser
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    if (isUserSignedIn) {
        history.push({ pathname: '/coaching' });
    }

    return (
        <AuthScreen>
            <Row>
                <Col md='6'>
                    <div className={styles.form}>
                        <h2 className={styles.title}>С возвращением!</h2>
                        <p className={styles.loginLabel}>
                            Новый пользователь?
                            <a href='/sign-up' className={styles.loginLink}>Зарегистрироваться</a>
                        </p>
                        <Form onSubmit={e => {
                            e.preventDefault();
                            signInUser({
                                email,
                                password
                            });
                        }}>
                            <div className='d-flex flex-column'>
                                <Form.Control
                                    type="email"
                                    placeholder="Электронная почта"
                                    className={styles.input}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} />
                                <Form.Control
                                    type="password"
                                    placeholder="Пароль"
                                    className={styles.input}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} />
                                <div className='d-flex justify-content-between'>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Запомнить меня" checked />
                                    </Form.Group>
                                    <a href='#' className={styles.forgotPassword}>Забыли пароль?</a>
                                </div>
                                <Button variant="primary" type="submit" className={styles.submit} size='lg' disabled={!(email && password)}>
                                    Войти
                                </Button>
                                {typeof error === 'string' && (
                                    <div className={styles.formError}>
                                        {error}
                                    </div>
                                )}
                            </div>
                        </Form>
                        <div className={styles.loginWithLabel}>
                            или с помощью
                        </div>
                        <ul className={styles.socials}>
                            <li>
                                <Button
                                    className={styles.socialsButton}
                                    variant='secondary'
                                    onClick={
                                        () => {
                                            if (process?.env?.NODE_ENV === 'development') {
                                                window.open('http://localhost:5000/users/auth/vkontakte', '_self');
                                            } else {
                                                window.open('/users/auth/vkontakte', '_self');
                                            }
                                        }
                                    }>
                                    <Image src={vkIcon} width='28' height='28' />
                                </Button>
                            </li>
                            <li>
                                <Button className={styles.socialsButton} variant='secondary'>
                                    <Image src={googleIcon} width='28' height='28' />
                                </Button>
                            </li>
                            <li>
                                <Button
                                    className={styles.socialsButton}
                                    variant='secondary'
                                    onClick={
                                        () => {
                                            if (process?.env?.NODE_ENV === 'development') {
                                                window.open('http://localhost:5000/users/auth/yandex', '_self');
                                            } else {
                                                window.open('/users/auth/yandex', '_self');
                                            }
                                        }
                                    }>
                                    <Image src={yandexIcon} width='28' height='28' />
                                </Button>
                            </li>
                            <li>
                                <Button
                                    className={styles.socialsButton}
                                    variant='secondary'
                                    onClick={
                                        () => {
                                            if (process?.env?.NODE_ENV === 'development') {
                                                window.open('http://localhost:5000/users/auth/discord', '_self');
                                            } else {
                                                window.open('/users/auth/discord', '_self');
                                            }
                                        }
                                    }>
                                    <Image src={discordIcon} width='28' height='28' />
                                </Button>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </AuthScreen>
    );
}

export default connect(({ signIn }) => ({
    isLoading: signIn.isLoading,
    isUserSignedIn: signIn.isUserSignedIn,
    error: signIn.error
}), {
    signInUser
})(withRouter(SignIn));
