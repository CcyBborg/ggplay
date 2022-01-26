import { Image } from 'react-bootstrap';
import StartRatings from 'react-star-ratings';
import styles from './reviews.module.css';

function Reviews({
    reviews
}) {
    return (
        <ul>
            {reviews.map(r => (
                <li key={r._id} className={styles.comment}>
                    <div className='d-flex'>
                        <Image
                            className={styles.commentImg}
                            src={r.user.profile.avatar}
                            width='45'
                            height='45' />
                        <div>
                            <span className={styles.commentAuthor}>{r.user.nickname}</span>
                            <div>
                                <StartRatings
                                    starRatedColor='#E50A48'
                                    starEmptyColor='#767698'
                                    starDimension='20px'
                                    starSpacing='2px'
                                    rating={r.rating}
                                    numberOfStars={5}
                                    name='rating' />
                            </div>
                        </div>
                    </div>
                    <p className={styles.commentContent}>{r.comment}</p>
                </li>
            ))}
        </ul>
    );
}

export default Reviews;
