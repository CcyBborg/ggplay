import { Button, Image } from 'react-bootstrap';
import startIcon from './images/start.svg';
import styles from './scroll-button.module.css';

function ScrollButton({ text, href }) {
    return (
        <Button variant='primary' size='lg' href={href} className={`${styles.root} position-relative`}>
            {text}
            <span className={styles.btnIcon}>
                <Image src={startIcon} height='21' width='25' />
            </span>
        </Button>
    );
}

export default ScrollButton;
