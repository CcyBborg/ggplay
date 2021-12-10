import { ProgressBar, Image, Badge } from 'react-bootstrap';
import rockerIcon from './images/rocket.svg';
import playIcon from './images/play.svg';
import coursePreviewImage from './images/course-preview.jpg';
import styles from './course-card.module.css';

function CourseCard() {
    return (
        <div className={styles.root}>
            <div>
                <Image src={coursePreviewImage} className={styles.preview} />
            </div>
            <div className={styles.about}>
                <div>
                    <h4 className={styles.title}>Цена времени</h4>
                    <Badge bg='secondary'>Dota2</Badge>&nbsp;
                    <Badge bg='primary'>урок 2</Badge>
                </div>
                <div>
                    <button type='button' className={styles.play}>
                        <Image src={playIcon} width='12' height='17' />
                    </button>
                </div>
            </div>
            <div className={styles.courseCardFooter}>
                <div>
                    <Image src={rockerIcon} width='15' />
                </div>
                <div className={`flex-fill ${styles.progress}`}>
                    <div className='d-flex justify-content-between'>
                        <span>прогресс</span>
                        <span>9%</span>
                    </div>
                    <ProgressBar now={15} />
                </div>
            </div>
        </div>
    );
}

export default CourseCard;