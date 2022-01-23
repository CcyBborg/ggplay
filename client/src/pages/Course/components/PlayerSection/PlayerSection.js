import { useMemo, useState } from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import Player from '../Player/Player';
import Comments from '../Comments/Comments';
import LessonList from '../LessonList/LessonList';
import progressIcon from './images/progress.svg';
import coachingIcon from './images/coaching.svg';
import communityIcon from './images/community.svg';
import cupIcon from './images/cup.svg';
import lessonIcon from './images/lesson.svg';
import LESSONS from '../../lessons';
import styles from './player-section.module.css';

function PlayerSection({
    isFullAccessed,
    user,
    history,
    comments,
    fetchComments,
    addComment
}) {
    const [selectedLesson, setSelectedLesson] = useState(0);

    return (
        <section className='mt-5' id='player'>
            <Container>
                <div className={styles.grid}>
                    <div>
                        <div className={styles.playerComments}>
                            <Player
                                num={selectedLesson + 1}
                                total={LESSONS.length}
                                lesson={LESSONS[selectedLesson]}
                                isFullAccessed={isFullAccessed}
                                history={history} />
                            <Comments
                                user={user}
                                history={history}
                                lessonId={LESSONS[selectedLesson].id}
                                isLoading={comments.isLoading}
                                isAddingComment={comments.isAddingComment}
                                comments={comments.comments}
                                fetchComments={fetchComments}
                                addComment={addComment} />
                        </div>
                    </div>
                    <div>
                        <div className={styles.syllabus}>
                            <div className={styles.syllabusHeader}>
                                <h5 className={styles.syllabusTitle}>План курса</h5>
                                <div className={styles.progress}>
                                    {/* <span>Прогресс<br /> 10%</span>
                                    <div>
                                        <Image src={progressIcon} width='15' height='32' />
                                    </div> */}
                                </div>
                            </div>
                            <LessonList
                                selectedLesson={selectedLesson}
                                lessons={LESSONS}
                                isFullAccessed={isFullAccessed}
                                onSelectLesson={setSelectedLesson} />
                        </div>
                        {!isFullAccessed && (
                            <div className={styles.syllabusCta}>
                                <div className='d-grid'>
                                    <Button
                                        variant='primary'
                                        size='lg'
                                        onClick={() => history.push({ pathname: '/course/full-access' })}>
                                        Полный доступ
                                    </Button>
                                    <p className={styles.ctaFeaturesTitle}>Включает в себя:</p>
                                    <ul className='mb-0'>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={lessonIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>Доступ ко всем урокам курса</span>
                                        </li>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={coachingIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>
                                                Бесплатная тренировка по Dota&nbsp;2
                                            </span>
                                        </li>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={cupIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>
                                                Участие в ежемесячных турнирах
                                            </span>
                                        </li>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={communityIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>
                                                Доступ в сообщество GG play
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default PlayerSection;
