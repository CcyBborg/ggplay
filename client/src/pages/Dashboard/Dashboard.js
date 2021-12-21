import { connect } from 'react-redux';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import logoutIcon from './images/logout.svg';
import editIcon from './images/edit.svg';
import styles from './dashboard.module.css';
import CourseCard from './components/CourseCard/CourseCard';
import WorkoutCard from './components/WorkoutCard/WorkoutCard';
import CoursePlaceholder from './components/CoursePlaceholder/CoursePlaceholder';
import WorkoutPlaceholder from './components/WorkoutPlaceholder/WorkoutPlaceholder';
import PromoCarousel from '../../components/PromoCarousel/PromoCarousel';

function Dashboard({
    user
}) {
    return (
        <Container className='mt-4'>
            <Row>
                <Col md='3'>
                    <div className={styles.profile}>
                        <Image className={styles.profileAvatar} src={user.info.profile.avatar} width='92' height='92' />
                        <div className={styles.profileNickname}>{user.info.nickname}</div>
                        <div className={styles.contact}>Sano2000@gmail.com</div>
                        <div className={styles.settingButtons}>
                            <Button className={styles.settingButton}>
                                <Image src={editIcon} width='16' />
                            </Button>
                            <Button className={styles.settingButton}>
                                <Image src={logoutIcon} width='16' />
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col md='9'>
                    <PromoCarousel />
                </Col>
            </Row>
            <section className='mt-5'>
                <h3 className='mb-3'>Мои тренировки</h3>
                <Row>
                    <Col md='3'>
                        <WorkoutCard />
                    </Col>
                    <Col md='3'>
                        <WorkoutCard />
                    </Col>
                    <Col md='3'>
                        <WorkoutPlaceholder variant='1' />
                    </Col>
                    <Col md='3'>
                        <WorkoutPlaceholder variant='2' />
                    </Col>
                </Row>
            </section>
            <section className='mt-5'>
                <h3 className='mb-3'>Мои мастер-классы</h3>
                <Row>
                    <Col md='3'>
                        <CourseCard />
                    </Col>
                    <Col md='3'>
                        <CoursePlaceholder variant='1' />
                    </Col>
                    <Col md='3'>
                        <CoursePlaceholder variant='2' />
                    </Col>
                    <Col md='3'>
                        <CoursePlaceholder variant='3' />
                    </Col>
                </Row>
            </section>
        </Container>
    );
}

export default connect(({ user }) => ({
    user
}), {
})(Dashboard);

