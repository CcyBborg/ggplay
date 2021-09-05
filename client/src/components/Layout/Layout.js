import { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { fetchUserInfo } from './actions';

function Layout({ user, children, fetchUserInfo }) {
    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

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
                                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                                        <div className='menu-main-menu-container'>
                                            <ul id='top-menu' className='navbar-nav ml-auto'>
                                                <li className='menu-item'>
                                                    <a>
                                                        Курсы <sup style={{
                                                            fontSize: '8px',
                                                            color: 'var(--iq-primary)',
                                                            position:'relative',
                                                            top: '-10px'
                                                            }}>Скоро</sup>
                                                    </a>
                                                </li>
                                                <li className='menu-item'>
                                                    <a href='/coaching'>Тренировки</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='navbar-right menu-right'>
                                        {user.info ? (
                                            <>
                                                <ul className='d-flex align-items-center list-inline m-0'>
                                                    <li className='menu-item'>
                                                        <a href='/dashboard' className='btn btn-link'>
                                                            <i className='fas fa-home'></i>
                                                        </a>
                                                    </li>
                                                    <li className='menu-item'>
                                                        <a href='' className='btn btn-link'>
                                                            <span className='font-weight-bold mr-2' style={{
                                                                fontSize: '16px',
                                                                textTransform: 'none'
                                                            }}>
                                                                {user.info.nickname}
                                                            </span>
                                                            <img className='mr-2' src={user.info.profile.game.logo} height='28' />
                                                            <i style={{
                                                                fontSize: '12px'
                                                            }} className='fas fa-chevron-down'></i>
                                                        </a>
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
                            <div className='col-lg-7'>
                                <div className='widget text-left'>
                                    <div className='menu-footer-link-1-container'>
                                        <ul id='menu-footer-link-1' className='menu p-0'>
                                            <li id='menu-item-7118' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-7118'>
                                                <a href='https://templates.iqonic.design/streamit/frontend/html/faq.html'>Служба поддержки</a>
                                            </li>
                                            <li id='menu-item-7118' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-7118'>
                                                <a href='https://templates.iqonic.design/streamit/frontend/html/watch-video.html'>Контакты</a>
                                            </li>
                                            <li id='menu-item-7314' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-7314'>
                                                <a href='https://templates.iqonic.design/streamit/frontend/html/index.html#'>Пользовательское соглашение</a>
                                            </li>
                                            <li id='menu-item-7316' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-7316'>
                                                <a href='https://templates.iqonic.design/streamit/frontend/html/privacy-policy.html'>Политика конфиденциальности</a>
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
                            <div className='col-lg-2 offset-lg-3 col-md-6 mt-4 mt-lg-0'>
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
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default connect(({ user }) => ({
    user
}), {
    fetchUserInfo
})(Layout);
