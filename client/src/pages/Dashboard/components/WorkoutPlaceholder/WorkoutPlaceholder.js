import { Image } from 'react-bootstrap';
import image1 from './images/image1.png'
import image2 from './images/image2.png'
import styles from './workout-placeholder.module.css';

const variantImageMap = {
    '1': image1,
    '2': image2
}; 

function WorkoutPlaceholder({ variant }) {
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Image src={variantImageMap[variant]} />
                <p className={styles.text}>
                    Запишись на&nbsp;тренировку&nbsp;&mdash; прокачай свой уровень игры!
                </p>
            </div>
        </div>
    );
}

export default WorkoutPlaceholder;
