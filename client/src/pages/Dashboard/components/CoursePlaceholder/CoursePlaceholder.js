import { Image } from 'react-bootstrap';
import image1 from './images/image1.png'
import image2 from './images/image2.png'
import image3 from './images/image3.png'
import styles from './course-placeholder.module.css';

const variantImageMap = {
    '1': image1,
    '2': image2,
    '3': image3
}; 

function CoursePlaceholder({ variant }) {
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Image src={variantImageMap[variant]} />
                <p className={styles.text}>
                    Больше курсов уже в&nbsp;разработке&nbsp;&mdash; следите за&nbsp;новостями!
                </p>
            </div>
        </div>
    );
}

export default CoursePlaceholder;
