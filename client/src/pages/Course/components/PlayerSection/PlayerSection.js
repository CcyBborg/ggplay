import { useState } from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import Player from '../Player/Player';
import Comments from '../Comments/Comments';
import LessonList from '../LessonList/LessonList';
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
                            <LazyLoad once>
                                <Comments
                                    user={user}
                                    history={history}
                                    lessonId={LESSONS[selectedLesson].id}
                                    isLoading={comments.isLoading}
                                    isAddingComment={comments.isAddingComment}
                                    comments={comments.comments}
                                    fetchComments={fetchComments}
                                    addComment={addComment} />
                            </LazyLoad>
                        </div>
                    </div>
                    <div>
                        <div className={styles.syllabus}>
                            <div className={styles.syllabusHeader}>
                                <h5 className={styles.syllabusTitle}>???????? ??????????</h5>
                            </div>
                            <LazyLoad once>
                                <LessonList
                                    selectedLesson={selectedLesson}
                                    lessons={LESSONS}
                                    isFullAccessed={isFullAccessed}
                                    onSelectLesson={setSelectedLesson} />
                            </LazyLoad>
                        </div>
                        {!isFullAccessed && (
                            <div className={styles.syllabusCta}>
                                <div className='d-grid'>
                                    <Button
                                        variant='primary'
                                        size='lg'
                                        onClick={() => history.push({ pathname: '/course/full-access' })}>
                                        ???????????? ????????????
                                    </Button>
                                    <p className={styles.ctaFeaturesTitle}>???????????????? ?? ????????:</p>
                                    <ul className='mb-0'>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={lessonIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>???????????? ???? ???????? ???????????? ??????????</span>
                                        </li>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={coachingIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>
                                                ???????????????????? ???????????????????? ???? Dota&nbsp;2
                                            </span>
                                        </li>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={cupIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>
                                                ?????????????? ?? ?????????????????????? ????????????????
                                            </span>
                                        </li>
                                        <li className={styles.ctaFeature}>
                                            <div>
                                                <Image src={communityIcon} height='24' width='24' />
                                            </div>
                                            <span className={styles.ctaFeatureText}>
                                                ???????????? ?? ???????????????????? GG play
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
