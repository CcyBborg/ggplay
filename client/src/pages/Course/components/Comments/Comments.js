import {
    InputGroup,
    FormControl,
    Button,
    Image
} from 'react-bootstrap';
import sendIcon from './images/send.svg';
import avatarImage from './images/avatar.jpg';
import styles from './comments.module.css';

function Comments() {
    return (
        <div className='mt-3'>
            <InputGroup className='mb-3'>
                <FormControl
                    placeholder='Написать комментарий...'
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" className={styles.sendCommentBtn}>
                    <Image src={sendIcon} width='22' height='22' />
                </Button>
            </InputGroup>
            <ul className={styles.commentsList}>
                <li>
                    <div className='d-flex align-items-center'>
                        <div>
                            <Image src={avatarImage} className={styles.commentAvatar} height='45' width='45' />
                        </div>
                        <div className={styles.commentMeta}>
                            toTheMoon<br />7.11.2021
                        </div>
                    </div>
                    <p className={styles.commentContent}>Для вводного урока слишком много годной информации. Просто лучший! Ну и еще куча всякого текста, чтобы посмотреть как будут выглядеть большие тирадные комменты.</p>
                </li>
                <li>
                    <div className='d-flex align-items-center'>
                        <div>
                            <Image src='/images/small-logo.png' className={styles.commentAvatar} height='45' width='45' />
                        </div>
                        <div className={styles.commentMeta}>
                            Гость<br />7.11.2021
                        </div>
                    </div>
                    <p className={styles.commentContent}>Топовый гайд. Где можно найти список рекомендованных ресурсов?</p>
                </li>
                <li>
                    <div className='d-flex align-items-center'>
                        <div>
                            <Image src={avatarImage} className={styles.commentAvatar} height='45' width='45' />
                        </div>
                        <div className={styles.commentMeta}>
                            SiphonHIV<br />7.11.2021
                        </div>
                    </div>
                    <p className={styles.commentContent}>Для вводного урока слишком много годной информации. Просто лучший!</p>
                </li>
            </ul>
        </div>
    );
}

export default Comments;
