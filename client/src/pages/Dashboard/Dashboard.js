import axios from 'axios';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Image, Tab, Nav } from 'react-bootstrap';
import logoutIcon from './images/logout.svg';
import editIcon from './images/edit.svg';
import photoIcon from './images/photo.svg';
import styles from './dashboard.module.css';
import CourseCard from './components/CourseCard/CourseCard';
import WorkoutCard from './components/WorkoutCard/WorkoutCard';
import CoursePlaceholder from './components/CoursePlaceholder/CoursePlaceholder';
import WorkoutPlaceholder from './components/WorkoutPlaceholder/WorkoutPlaceholder';
import PromoCarousel from '../../components/PromoCarousel/PromoCarousel';
import { logout } from './actions';

function Dashboard({
    user,
    isLoggedOut,
    onLogout
}) {
    const [isSettings, setIsSettings] = useState(false);

    const avatarUpload = useRef(null);

    useEffect(() => {
        if (isLoggedOut) {
            window.open('/course', '_self');
        }
    }, [isLoggedOut])

    const handleUploadImage = useCallback(({ target }) => {
        const bodyFormData = new FormData();
        bodyFormData.append('key', 'd297a4d24afee784bdf29ed32cd722b4');
        bodyFormData.append('image', target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
            axios.post('/users/edit', {
                avatar: res.data.data.display_url
            }).then(() => window.location.reload());
        });
    }, []);

    return (
        <Container className='mt-4'>
            <Row>
                <Col md='3'>
                    <div className={styles.profile}>
                        <div className={styles.avatarContainer}>
                            <input
                                type='file'
                                id='avatar'
                                ref={avatarUpload}
                                style={{ display: 'none' }}
                                onChange={handleUploadImage} />
                            <Image className={styles.profileAvatar} src={user.info.profile.avatar} width='92' height='92' />
                            <Button
                                variant='primary'
                                size='sm'
                                className={styles.changeAvatar}
                                onClick={() => avatarUpload.current.click()}>
                                <Image src={photoIcon} width={12} height={12} />
                            </Button>
                        </div>
                        <div className={styles.profileNickname}>{user.info.nickname}</div>
                        <div className={styles.contact}>{user.info.email}</div>
                        <div className={styles.settingButtons}>
                            <Button className={styles.settingButton} onClick={() => setIsSettings(true)}>
                                <Image src={editIcon} width='16' />
                            </Button>
                            <Button className={styles.settingButton} onClick={onLogout}>
                                <Image src={logoutIcon} width='16' />
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col md='9'>
                    <PromoCarousel
                        isCourse={!user.info.course} />
                </Col>
            </Row>
            <section className='mt-5'>
                <Tab.Container defaultActiveKey='present'>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <h3>Мои тренировки</h3>
                        <Nav variant='pills'>
                            <Nav.Item>
                                <Nav.Link eventKey='present'>Предстоящие</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='past'>Прошедшие</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <Tab.Content>
                        <Tab.Pane eventKey='present'>
                            <Row>
                                {user.info.slots.present.map(slot => (
                                    <Col md='3' key={slot._id}>
                                        <WorkoutCard
                                            title={slot.lesson.title}
                                            timestamp={slot.timestamp}
                                            channel={slot.channel}
                                            invite={slot.invite}
                                            coach={slot.lesson.coach} />
                                    </Col>
                                ))}
                                <Col md='3'>
                                    <WorkoutPlaceholder variant='1' />
                                </Col>
                                <Col md='3'>
                                    <WorkoutPlaceholder variant='2' />
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey='past'>
                            <Row>
                                <Col md='3'>
                                    <WorkoutPlaceholder variant='1' />
                                </Col>
                                <Col md='3'>
                                    <WorkoutPlaceholder variant='2' />
                                </Col>
                                <Col md='3'>
                                    <WorkoutPlaceholder variant='1' />
                                </Col>
                                <Col md='3'>
                                    <WorkoutPlaceholder variant='2' />
                                </Col>
                            </Row>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </section >
            <section className='mt-5'>
                <h3 className='mb-3'>Мои мастер-классы</h3>
                <Row>
                    <Col md='3'>
                        {user.info.course ? (
                            <CourseCard />
                        ) : (
                            <CoursePlaceholder variant='3' />
                        )}
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
        </Container >
    );
}

export default connect(({ user, dashboard }) => ({
    user,
    isLoggedOut: dashboard.isLoggedOut
}), {
    onLogout: logout
})(Dashboard);

