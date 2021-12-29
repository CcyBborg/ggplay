import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { Container, Navbar, Nav, Row, Col, Modal, Image } from 'react-bootstrap';
import Copier from '../Copier/Copier';
import Spinner from '../Spinner/Spinner';
import AddReview from './components/AddReview/AddReview';
import { fetchUserInfo } from './actions';
import { postReview } from './api';
import vkIcon from './images/vk.svg'
import instagramIcon from './images/instagram.svg'
import discordIcon from './images/discord.svg'
import styles from './layout.module.css';
import Messenger from '../Messenger/Messenger';

function Layout({ user, children, fetchUserInfo, history }) {
    useEffect(() => {
        if (!user.info) {
            fetchUserInfo();
        }
    }, [fetchUserInfo]);

    useEffect(() => {
        if (user.info) {
            const redirect = localStorage.getItem('auth-redirect');
            if (redirect) {
                localStorage.removeItem('auth-redirect');
                history.push({ pathname: redirect });
            }
        }
    }, [user.info]);

    const notification = user.info?.notification;

    useEffect(() => {
        if (notification) {
            setIsNotification(true);
        }
    }, [notification]);

    const [isNotification, setIsNotification] = useState(false);

    if (user.isLoading) {
        return (
            <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
                <Spinner />
            </div>
        );
    }

    if (user.info && !user.info.profile?.game) {
        return (
            <Redirect to={{
                pathname: '/sign-up',
                state: { isSocial: true }
            }} />
        );
    }

    return (
        <>
            <Navbar bg='dark' variant='dark' sticky='top' expand='lg'>
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src='/images/logo.png'
                            width='100'
                            className='d-inline-block align-top'
                            alt='GGPlay'
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className='me-auto'>
                            <Nav.Link href='/course'>Мастер-классы</Nav.Link>
                            <Nav.Link href='/coaching'>Тренировки</Nav.Link>
                            <Nav.Link href='/tournament'>Турниры</Nav.Link>
                        </Nav>
                        <Nav>
                            {user.info ? (
                                <Nav.Link href='/dashboard' className={styles.profileBtn}>
                                    <span>{user.info.nickname}</span>
                                    <Image src={user.info.profile.avatar} className={styles.avatar} width='36' height='36' />
                                </Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link href='/sign-up'>Регистрация</Nav.Link>
                                    <Nav.Link href='/sign-in'>Вход</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
                {children}
            </main>
            <footer className='footer'>
                <Container>
                    <Row className='mb-5'>
                        <Col lg='10' className={styles.footerLinks}>
                            <Nav.Link className='pl-0' href='/terms-of-service'>Пользовательское соглашение</Nav.Link>
                            <Nav.Link className='pl-0' href='/confidential-policy'>Политика конфиденциальности</Nav.Link>
                        </Col>
                        <Col lg='2' className='d-flex justify-content-between'>
                            <a target='_blank' href='https://vk.com/ggplay_official'>
                                <img src={vkIcon} width='32' height='32' />
                            </a>
                            <a target='_blank' href='https://www.instagram.com/ggplay.ru/'>
                                <img src={instagramIcon} width='32' height='32' />
                            </a>
                            <a target='_blank' href='https://discord.gg/NnUWEmJgfy'>
                                <img src={discordIcon} width='32' height='32' />
                            </a>
                        </Col>
                    </Row>
                    <p><small>© 2021 GGPLAY. Все права защищены. Любое использование фото, аудио, видео и графических материалов, в том числе частичное, без письменного разрешения правообладателя запрещено.
                    </small></p>
                </Container>
            </footer>
            <div className={styles.messenger}>
                <Messenger />
            </div>

            {isNotification && (
                notification.type === 'SOON' ? (
                    <Modal title='Уведомление о тренировке' size='xs' onClose={() => setIsNotification(false)}>
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
                    </Modal>
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
})(withRouter(Layout));
