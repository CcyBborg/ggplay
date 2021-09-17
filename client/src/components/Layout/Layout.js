import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Copier from '../Copier/Copier';
import Spinner from '../Spinner/Spinner';
import AddReview from './components/AddReview/AddReview';
import ProfileButton from './components/ProfileButton/ProfileButton';
import { fetchUserInfo } from './actions';
import { postReview, logout } from './api';

function Layout({ user, children, fetchUserInfo }) {
    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    const notification = user.info?.notification;

    useEffect(() => {
        if (notification) {
            setIsNotification(true);
        }
    }, [notification]);

    const [isMobileMenu, setIsMobileMenu] = useState(false);
    const [isNotification, setIsNotification] = useState(false);

    if (user.isLoading) {
        return (
            <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <header id='main-header'>
                <div className='main-header'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <nav className='navbar navbar-expand-lg navbar-light p-0'>
                                    <a className='navbar-brand' href='/'>
                                        <img className='logo' src='/images/logo.png' alt='GGPlay' />
                                    </a>
                                    <button
                                        className='navbar-toggler btn btn-link mt-2 mb-2 pr-0'
                                        type='button'
                                        onClick={() => setIsMobileMenu(true)}>
                                        <i className='fas fa-bars'></i>
                                    </button>
                                    <div className='collapse navbar-collapse'>
                                        <ul className='navbar-nav mr-auto'>
                                            <li className='menu-item'>
                                                <a>
                                                    Курсы <sup style={{
                                                        fontSize: '10px',
                                                        color: 'var(--iq-primary)',
                                                        position: 'relative',
                                                        top: '-10px'
                                                    }}>Скоро</sup>
                                                </a>
                                            </li>
                                            <li className='menu-item'>
                                                <a href='/coaching'>Тренировки</a>
                                            </li>
                                        </ul>

                                        {user.info ? (
                                            <>
                                                <ul className='d-flex align-items-center list-inline m-0'>
                                                    <li className='menu-item'>
                                                        <a href='/dashboard' className='btn btn-link'>
                                                            Мои тренировки
                                                        </a>
                                                    </li>
                                                    <li className='menu-item'>
                                                        <ProfileButton
                                                            nickname={user.info.nickname}
                                                            logo={user.info.profile?.game.logo}
                                                            onLogout={() => {
                                                                logout().then(() => {
                                                                    window.open('https://ggplay.ru/coaching', '_self');
                                                                });
                                                            }} />
                                                    </li>
                                                </ul>
                                            </>
                                        ) : (
                                            <ul className='d-flex align-items-center list-inline m-0'>
                                                <li className='menu-item'>
                                                    <a href='/sign-up' className='btn btn-link'>
                                                        Регистрация
                                                    </a>
                                                </li>
                                                <li className='menu-item'>
                                                    <a href='/sign-in' className='btn btn-link'>
                                                        Вход
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div style={{
                minHeight: 'calc(100vh - 232px)',
                paddingTop: '70px'
            }}>
                {children}
            </div>
            <footer id='contact' className='footer-one iq-bg-dark'>
                <div className='footer-top'>
                    <div className='container'>
                        <div className='row footer-standard'>
                            <div className='col-lg-10'>
                                <div className='widget text-left'>
                                    <div className='menu-footer-link-1-container'>
                                        <ul id='menu-footer-link-1' className='menu p-0'>
                                            <li>
                                                <a href='/terms-of-service'>Пользовательское соглашение</a>
                                            </li>
                                            <li>
                                                <a href='/confidential-policy'>Политика конфиденциальности</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='widget text-left'>
                                    <div className='textwidget'>
                                        <p><small>© 2021 GGPLAY. Все права защищены. Любое использование фото, аудио, видео и графических материалов, в том числе частичное, без письменного разрешения правообладателя запрещено.
                                        </small></p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-6 mt-4 mt-lg-0'>
                                <h6 className='footer-link-title'>
                                    Мы&nbsp;в&nbsp;соцсетях&nbsp;:
                                </h6>
                                <ul className='info-share'>
                                    <li>
                                        <a target='_blank' href='https://vk.com/ggplay_official'>
                                            <i className='fab fa-vk'></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a target='_blank' href='https://www.instagram.com/ggplay.ru/'>
                                            <i className='fab fa-instagram'></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a target='_blank' href='https://discord.gg/NnUWEmJgfy'>
                                            <i class='fab fa-discord'></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {isMobileMenu && (
                <div className='mobile-menu'>
                    <div className='mobile-header text-center'>
                        <img className='mobile-header__logo' src='/images/small-logo.png' alt='GGPlay' />
                        <button className='btn btn-link close-mobile-menu' type='button' onClick={() => setIsMobileMenu(false)}>
                            <i className='fas fa-times'></i>
                        </button>
                    </div>
                    <nav>
                        <ul className='d-flex align-items-center flex-column list-inline m-0'>
                            <li className='menu-item'>
                                <a className='btn btn-link'>
                                    Курсы <sup style={{
                                        fontSize: '10px',
                                        color: 'var(--iq-primary)',
                                        position: 'relative',
                                        top: '-10px'
                                    }}>Скоро</sup>
                                </a>
                            </li>
                            <li className='menu-item'>
                                <a href='/coaching' className='btn btn-link'>Тренировки</a>
                            </li>
                        </ul>
                        {user.info ? (
                            <>
                                <ul className='d-flex flex-column align-items-center justify-content-center list-inline m-0'>
                                    <li className='menu-item'>
                                        <a href='/dashboard' className='btn btn-link'>
                                            Мои тренировки
                                        </a>
                                    </li>
                                    <li className='menu-item'>
                                        <ProfileButton
                                            nickname={user.info.nickname}
                                            logo={user.info.profile?.game.logo}
                                            onLogout={() => {
                                                logout().then(() => {
                                                    window.open('https://ggplay.ru/coaching', '_self');
                                                });
                                            }} />
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <ul className='d-flex align-items-center flex-column list-inline m-0'>
                                <li className='menu-item'>
                                    <a href='/sign-up' className='btn btn-link'>
                                        Регистрация
                                    </a>
                                </li>
                                <li className='menu-item'>
                                    <a href='/sign-in' className='btn btn-link'>
                                        Вход
                                    </a>
                                </li>
                            </ul>
                        )}
                    </nav>
                </div>
            )}

            {isNotification && (
                notification.type === 'SOON' ? (
                    <div className='modal-container'>
                        <div className='modal' style={{
                            width: '400px'
                        }}>
                            <header className='modal-header d-flex justify-content-center align-items-center'>
                                <h4 className='m-0 h6 text-center'>Уведомление о тренировке</h4>
                                <button className='btn-close' onClick={() => setIsNotification(false)}>
                                    <i className='fas fa-times'></i>
                                </button>
                            </header>
                            <div className='modal-body'>
                                <p className='lead text-center mb-5 text-white'>
                                    Сегодня в<strong>&nbsp;{new Date(notification.timestamp).toLocaleString('ru', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}&nbsp;</strong>у тебя "<strong>{notification.lesson.title}</strong>".
                                </p>
                                <div className='mb-4'>
                                    <p className='mb-2'>Канал для твоей тренировки:</p>
                                    <Copier text={notification.channel} />
                                </div>
                                <div>
                                    <p className='mb-2'>Приглашение в наш Discord-сервер:</p>
                                    <Copier text={notification.invite} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <AddReview
                        lesson={notification.lesson}
                        onPostReview={(rating, comment) => {
                            return postReview({
                                slotId: notification._id,
                                rating,
                                comment
                            });
                        }}
                        onClose={() => setIsNotification(false)} />
                )
            )}
        </>
    );
}

export default connect(({ user }) => ({
    user
}), {
    fetchUserInfo
})(Layout);
