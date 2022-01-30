import {
    useState,
    useCallback,
    useEffect
} from 'react';
import {
    InputGroup,
    FormControl,
    Button,
    Image,
    Spinner,
    Pagination
} from 'react-bootstrap';
import sendIcon from './images/send.svg';
import styles from './comments.module.css';

function Comments({
    user,
    lessonId,
    isLoading,
    isAddingComment,
    comments,
    fetchComments,
    addComment
}) {
    const [comment, setComment] = useState('');
    const [pagination, setPagination] = useState(0);

    useEffect(() => {
        setPagination(0);
        fetchComments(lessonId);
    }, [lessonId]);

    const handleUnsignedClick = useCallback(() => {
        localStorage.setItem('auth-redirect', '/course');
    }, [localStorage]);

    const handleAddComment = useCallback(() => {
        setComment('');
        addComment({
            lessonId,
            comment
        });
    }, [lessonId, comment]);

    return (
        <div className={styles.root}>
            {user.info ? (
                <InputGroup>
                    <FormControl
                        placeholder='Написать комментарий...'
                        aria-label='Комментарий к уроку'
                        className={styles.input}
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                    />
                    <Button
                        variant='outline-secondary'
                        className={styles.sendCommentBtn}
                        onClick={handleAddComment}>
                        {isAddingComment ? (
                            <Spinner
                                variant='light'
                                animation='border'
                            />
                        ) : (
                            <Image src={sendIcon} width='22' height='22' />
                        )}
                    </Button>
                </InputGroup>
            ) : (
                <p className={styles.unsigned}>
                    <a href='/sign-in' onClick={handleUnsignedClick}>Войдите</a> или&nbsp;
                    <a href='/sign-up' onClick={handleUnsignedClick}>Зарегистрируйтесь</a>, чтобы оставить комментарий.
                </p>
            )}
            <div className={styles.comments}>
                {comments?.length > 5 && (
                    <Pagination className='float-end'>
                        {[...Array(Math.ceil(comments.length / 5)).keys()].map(n => (
                            <Pagination.Item key={n} active={n === pagination} onClick={() => setPagination(n)}>
                                {n + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                )}
                {isLoading ? (
                    <div className='d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
                        <Spinner
                            variant='light'
                            animation='border'
                        />
                    </div>
                ) : (
                    <ul className={styles.commentsList}>
                        {comments?.slice(pagination * 5, (pagination + 1) * 5).map(c => (
                            <li key={c._id}>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <Image src={c.user.profile.avatar} className={styles.commentAvatar} height='45' width='45' />
                                    </div>
                                    <div className={styles.commentMeta}>
                                        {c.user.nickname}<br />
                                        {new Date(c.createdAt).toLocaleString('ru', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
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
