import { useState } from 'react';
import AuthScreen from '../../components/AuthScreen/AuthScreen';
import { Form, Row, Col, Button } from 'react-bootstrap';
import styles from './forgot-password.module.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    return (
        <AuthScreen>
            <Row>
                <Col md='6'>
                    <div className={styles.form}>
                        {submitted ? (
                            <>
                                <h2 className={styles.title}>Инструкции высланы</h2>
                                <p className={styles.loginLabel}>
                                    Инструкции по&nbsp;восстановлению пароля высланы на&nbsp;указанный Email
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className={styles.title}>Укажите email</h2>
                                <p className={styles.loginLabel}>
                                    Пожалуйста, укажите email, который вы&nbsp;использовали для входа на&nbsp;сайт
                                </p>
                                <Form onSubmit={() => { setSubmitted(true) }}>
                                    <div className='d-flex flex-column'>
                                        <Form.Control
                                            type='email'
                                            placeholder='Электронная почта'
                                            className={styles.input}
                                            value={email}
                                            onChange={e => setEmail(e.target.value)} />
                                        <Button variant='primary' type='submit' className={styles.submit} size='lg' disabled={!email}>
                                            Далее
                                        </Button>
                                    </div>
                                </Form>
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </AuthScreen>
    );
}

export default ForgotPassword;
