import { connect } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { Image, Row, Modal, CloseButton, Button, Col } from 'react-bootstrap';
import { orderCourse } from './actions';
import { withRouter } from 'react-router';
import coachingIcon from './images/coaching.svg';
import communityIcon from './images/community.svg';
import cupIcon from './images/cup.svg';
import lessonIcon from './images/lessons.svg';
import styles from './full-access.module.css';

function FullAccess({
    user,
    history,
    courseOrder,
    onOrderCourse
}) {
    useEffect(() => {
        if (courseOrder.paymentUrl) {
            window.open(courseOrder.paymentUrl, '_self');
        }
    }, [courseOrder.paymentUrl]);

    const handleFullAccessClick = useCallback(() => {
        if (user.info && !user.info.course) {
            onOrderCourse();
        } else {
            localStorage.setItem('auth-redirect', '/course/full-access');
            history.push({
                pathname: '/sign-up',
                state: { selectedGame: '6110f38fa9258e24cce20f65' }
            });
        }
    }, [user.info?.course, history.push]);

    const handleClickBack = useCallback(() => {
        history.push({
            pathname: '/course'
        });
    }, [history]);

    return (
        <Modal show={true} dialogClassName={styles.dialog} contentClassName={styles.root} onHide={handleClickBack}>
            <CloseButton variant='white' className={styles.close} onClick={handleClickBack} />
            <Row className='mb-4'>
                <Col md='8'>
                    <h3>Начни&nbsp;свой&nbsp;путь в&nbsp;киберспорт</h3>
                    <div className='d-flex align-items-center'>
                        <span className={styles.price}>
                            <span className={styles.ruble}>₽</span>&nbsp;2190
                        </span>
                        <span className={styles.priceLabel}>
                            единоразовый платёж
                        </span>
                    </div>
                </Col>
            </Row>
            <ul>
                <li className='d-flex'>
                    <div>
                        <Image src={lessonIcon} width='28' height='28' />
                    </div>
                    <div className={styles.featureAbout}>
                        <h5 className={styles.featureTitle}>Доступ ко всем урокам курса</h5>
                        <p className={styles.featureP}>Вы&nbsp;получите доступ ко&nbsp;всему платному контенту мастеркласса</p>
                    </div>
                </li>
                <li className='d-flex'>
                    <div>
                        <Image src={coachingIcon} width='28' height='28' />
                    </div>
                    <div className={styles.featureAbout}>
                        <h5 className={styles.featureTitle}>Бесплатная тренировка по Dota&nbsp;2</h5>
                        <p className={styles.featureP}>Получите бесплатную тренировку с&nbsp;любым из&nbsp;наших тренеров по&nbsp;DOTA&nbsp;2</p>
                    </div>
                </li>
                <li className='d-flex'>
                    <div>
                        <Image src={cupIcon} width='28' height='28' />
                    </div>
                    <div className={styles.featureAbout}>
                        <h5 className={styles.featureTitle}>Участие в ежемесячных турнирах</h5>
                        <p className={styles.featureP}>Возможность участия в&nbsp;турнире с&nbsp;призовым фондом, а&nbsp;также просмотр лучших игроков турнира скаутами команд</p>
                    </div>
                </li>
                <li className='d-flex'>
                    <div>
                        <Image src={communityIcon} width='28' height='28' />
                    </div>
                    <div className={styles.featureAbout}>
                        <h5 className={styles.featureTitle}>Доступ в сообщество GG play</h5>
                        <p className={styles.featureP}>Доступ в&nbsp;Discord канал с&nbsp;возможностью общения с&nbsp;тренерами платформы и&nbsp;ведущими курсов</p>
                    </div>
                </li>
            </ul>

            <Button
                variant='primary'
                size='lg'
                disabled={courseOrder.isLoading}
                onClick={handleFullAccessClick}>
                Продолжить
            </Button>
            <p className={styles.legal}>Нажимая продолжить, Вы&nbsp;принимаете <a href='#' className={styles.legalLink}>Пользовательское&nbsp;Соглашение</a> и&nbsp;нашу <a href='#' className={styles.legalLink}>Политику&nbsp;Конфиденциальности</a>.</p>
        </Modal>
    );
}

export default connect(({ user, courseOrder }) => ({
    user,
    courseOrder
}), {
    onOrderCourse: orderCourse
})(withRouter(FullAccess));

