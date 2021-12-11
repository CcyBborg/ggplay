import { useState } from 'react';
import { connect } from 'react-redux';
import AuthScreen from '../../components/AuthScreen/AuthScreen';
import Oauth from '../../components/Oauth/Oauth';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { signInUser } from './actions';
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
                                    type='email'
                                    placeholder='Электронная почта'
                                    className={styles.input}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} />
                                <Form.Control
                                    type='password'
                                    placeholder='Пароль'
                                    className={styles.input}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} />
                                <div className='d-flex justify-content-between'>
                                    <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                                        <Form.Check type='checkbox' label='Запомнить меня' checked />
                                    </Form.Group>
                                    <a href='/forgot-password' className={styles.forgotPassword}>Забыли пароль?</a>
                                </div>
                                <Button variant='primary' type='submit' className={styles.submit} size='lg' disabled={!(email && password)}>
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
                        <Oauth />
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
