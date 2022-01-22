import {
    useState,
    useCallback,
    useEffect
} from 'react';
import {
    InputGroup,
    FormControl,
    Button,
    Image
} from 'react-bootstrap';
import Spinner from '../../../../components/Spinner/Spinner';
import sendIcon from './images/send.svg';
import avatarImage from './images/avatar.jpg';
import styles from './comments.module.css';

function Comments({
    user,
    history,
    lessonId,
    isLoading,
    comments,
    fetchComments
}) {
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchComments(lessonId);
    }, [lessonId]);

    const handleChangeComment = useCallback(({ target }) => {
        if (user.info) {
            setComment(target.value);
        } else {
            localStorage.setItem('auth-redirect', '/course');
            history.push({
                pathname: '/sign-up',
                state: { selectedGame: '6110f38fa9258e24cce20f65' }
            })
        }
    }, [user.info, history]);

    return (
        <div className={styles.root}>
            <InputGroup>
                <FormControl
                    placeholder='Написать комментарий...'
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className={styles.input}
                    value={comment}
                    onChange={handleChangeComment}
                />
                <Button variant="outline-secondary" className={styles.sendCommentBtn}>
                    <Image src={sendIcon} width='22' height='22' />
                </Button>
            </InputGroup>
            <div className={styles.comments}>
                {isLoading ? (
                    <div className='d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
                        <Spinner />
                    </div>
                ) : (
                    <ul className={styles.commentsList}>
                        {comments?.map(c => (
                            <li>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <Image src={c.user.profile.avatar} className={styles.commentAvatar} height='45' width='45' />
                                    </div>
                                    <div className={styles.commentMeta}>
                                        {c.user.nickname}<br />7.11.2021
                                    </div>
                                </div>
                                <p className={styles.commentContent}>
                                    {c.comment}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Comments;
