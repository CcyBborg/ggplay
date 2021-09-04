import { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signInUser } from './actions';

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
        history.push({ pathname: '/dashboard' });
    }

    return (
        <div className='poll'>
            <div className='container'>
                <nav className='d-flex justify-content-between align-items-center pt-4 pb-4'>
                    <a className='navbar-brand' href='https://templates.iqonic.design/streamit/frontend/html/index.html'>
                        <img className='img-fluid logo' width='100' src='./images/logo.png' alt='GGPlay' />
                    </a>
                    <a href='/sign-up'>Регистрация</a>
                </nav>
                <div className='d-flex justify-content-center justify-content-center align-items-center'>
                    <div className='sign-in-page'>
                        <div className='sign-user_card mt-5'>
                            <div className='sign-in-page-data'>
                                <div className='sign-in-from w-100 m-auto'>
                                    <h3 className='mb-3 text-center'>Вход</h3>
                                    <p className='text-center mb-4'>Войдите с помощью социальных сетей</p>
                                    <div className='d-flex justify-content-between'>
                                        <button className='btn btn-hover btn-vk' onClick={() => {
                                            if (process?.env?.NODE_ENV === 'development') {
                                                window.open('http://localhost:5000/users/auth/vkontakte', '_self');
                                            } else {
                                                window.open('/users/auth/vkontakte', '_self');
                                            }
                                        }}>
                                            <i className='fab fa-vk'></i>
                                        </button>
                                        <button className='btn btn-hover btn-discord' onClick={() => {
                                            if (process?.env?.NODE_ENV === 'development') {
                                                window.open('http://localhost:5000/users/auth/discord', '_self');
                                            } else {
                                                window.open('/users/auth/discord', '_self');
                                            }
                                        }}>
                                            <i className='fab fa-discord'></i>
                                        </button>
                                        <button className='btn btn-hover btn-google' onClick={() => {
                                            if (process?.env?.NODE_ENV === 'development') {
                                                window.open('http://localhost:5000/users/auth/google', '_self');
                                            } else {
                                                window.open('/users/auth/google', '_self');
                                            }
                                        }}>
                                            <i className='fab fa-google'></i>
                                        </button>
                                    </div>
                                    <p className='text-center mt-4'>или вашей почты</p>
                                    <form className='mt-4' action='index.html'>
                                        <div className='form-group'>
                                            <input
                                                type='email'
                                                onChange={e => setEmail(e.target.value)}
                                                value={email}
                                                className='form-control mb-0'
                                                id='exampleInputEmail1'
                                                placeholder='Электронная почта'
                                                autocomplete='off'
                                                required />
                                        </div>
                                        <div className='form-group'>
                                            <input
                                                type='password'
                                                onChange={e => setPassword(e.target.value)}
                                                value={password}
                                                className='form-control mb-0'
                                                id='exampleInputPassword2'
                                                placeholder='Пароль'
                                                required />
                                        </div>
                                        {typeof error === 'string' && (
                                            <div className='text text-primary mb-3'>
                                                {error}
                                            </div>
                                        )}
                                        <div className='sign-info'>
                                            <button
                                                type='submit'
                                                className='btn btn-hover btn-block'
                                                onClick={e => {
                                                    e.preventDefault();
                                                    signInUser({
                                                        email,
                                                        password
                                                    });
                                                }}>Войти</button>
                                        </div>
                                    </form>
                                    <div className='mt-3'>
                                        <div className='d-flex justify-content-center links'>
                                            <a href='reset-password.html' className='f-link'>Забыли пароль?</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(({ signIn }) => ({
    isLoading: signIn.isLoading,
    isUserSignedIn: signIn.isUserSignedIn,
    error: signIn.error
}), {
    signInUser
})(withRouter(SignIn));
