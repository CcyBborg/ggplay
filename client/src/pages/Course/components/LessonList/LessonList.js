import { Image } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import cx from 'classnames';
import lockIcon from './images/lock.svg';
import styles from './lesson-list.module.css';

function LessonList({
    lessons,
    isFullAccessed,
    selectedLesson,
    onSelectLesson
}) {
    return (
        <ol className={styles.root}>
            {lessons.map((l, i) => {
                const rootClassName = cx(styles.lesson, {
                    [styles.selectedLesson]: i === selectedLesson,
                    [styles.lessonLocked]: !isFullAccessed && l.isLocked
                });

                return (
                    <li
                        key={i}
                        className={rootClassName}
                        onClick={() => onSelectLesson(i)}>
                            {i === 0 ? (
                                <Image className={styles.lessonImage} src={l.previewImage} height={176} />
                            ) : (
                                <LazyLoad height={176}>
                                    <Image className={styles.lessonImage} src={l.previewImage} height={176} />
                                </LazyLoad>
                            )}
                        <div className={styles.lessonAbout}>
                            <span className={styles.lessonTime}>08:13</span>
                            <h4 className={styles.lessonTitle}>{l.title}</h4>
                        </div>
                        {isFullAccessed || (l.isLocked && (
                            <div className={styles.lockIcon}>
                                <Image src={lockIcon} width='20' height='20' />
                            </div>
                        ))}
                    </li>
                );
            })}
        </ol>
    );
}

export default LessonList;
