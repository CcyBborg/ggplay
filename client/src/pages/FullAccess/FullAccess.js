import { Image, Row, Modal, CloseButton, Button, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';
import coachingIcon from './images/coaching.svg';
import communityIcon from './images/community.svg';
import cupIcon from './images/cup.svg';
import lessonIcon from './images/lessons.svg';
import styles from './full-access.module.css';

function FullAccess({
    history
}) {
    return (
        <Modal show={true} dialogClassName={styles.dialog} contentClassName={styles.root} onHide={history.goBack}>
            <CloseButton variant='white' className={styles.close} onClick={history.goBack} />
            <Row className='mb-4'>
                <Col md='8'>
                    <h3>Начни&nbsp;свой&nbsp;путь в&nbsp;киберспорт</h3>
                    <div className='d-flex align-items-center'>
                        <span className={styles.price}>
                            <span className={styles.ruble}>₽</span>&nbsp;2699
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
                        <p className={styles.featureP}>Эта модель организационной деятельности способствует реализации систем массового участия.</p>
                    </div>
                </li>
                <li className='d-flex'>
                    <div>
                        <Image src={coachingIcon} width='28' height='28' />
                    </div>
                    <div className={styles.featureAbout}>
                        <h5 className={styles.featureTitle}>Бесплатная тренировка по Dota&nbsp;2</h5>
                        <p className={styles.featureP}>Эта модель организационной деятельности способствует реализации систем массового участия.</p>
                    </div>
                </li>
                <li className='d-flex'>
                    <div>
                        <Image src={cupIcon} width='28' height='28' />
                    </div>
                    <div className={styles.featureAbout}>
                        <h5 className={styles.featureTitle}>Участие в ежемесячных турнирах</h5>
                        <p className={styles.featureP}>Эта модель организационной деятельности способствует реализации систем массового участия.</p>
                    </div>
                </li>
                <li className='d-flex'>
                    <div>
                        <Image src={communityIcon} width='28' height='28' />
                    </div>
                    <div className={styles.featureAbout}>
                        <h5 className={styles.featureTitle}>Доступ в сообщество GG play</h5>
                        <p className={styles.featureP}>Эта модель организационной деятельности способствует реализации систем массового участия.</p>
                    </div>
                </li>
            </ul>

            <Button variant='primary' size='lg' onClick={() =>
                history.push({
                    pathname: '/sign-up',
                    state: { selectedGame: '6110f38fa9258e24cce20f65' }
                })
            }>
                Продолжить
            </Button>
            <p className={styles.legal}>Нажимая продолжить, Вы&nbsp;принимаете <a href='#' className={styles.legalLink}>Пользовательское&nbsp;Соглашение</a> и&nbsp;нашу <a href='#' className={styles.legalLink}>Политику&nbsp;Конфиденциальности</a>.</p>
        </Modal>
    );
}

export default withRouter(FullAccess);
