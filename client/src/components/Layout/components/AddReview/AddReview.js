import { useState } from 'react';
import StarRatings from 'react-star-ratings';
import Modal from '../../../Modal/Modal';

function AddReview({
    lesson,
    onPostReview,
    onClose
}) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    return (
        <Modal title='Оцени прошедшую тренировку' size='xs'>
            <div className='text-center mb-4'>
                <h5>{lesson.title}</h5>
                <p className='d-flex mt-3 align-items-center justify-content-center'>
                    <img
                        width={25}
                        height={25}
                        className='slot-card__coach-img mr-2'
                        src={lesson.coach.img} />
                    <strong>{lesson.coach.title}</strong>
                </p>
            </div>
            <div className='text-center mb-4'>
                <StarRatings
                    rating={rating}
                    starDimension='40px'
                    starRatedColor='#e50914'
                    starEmptyColor='rgba(41, 41, 41, 0.76)'
                    changeRating={setRating}
                    numberOfStars={5}
                    name='rating'
                />
            </div>
            <textarea
                value={comment}
                placeholder='Расскажи как прошла твоя тренировка...'
                maxLength={500}
                onChange={({ target }) => setComment(target.value)}>
            </textarea>
            <button
                className='btn btn-hover btn-block mt-2'
                disabled={!rating}
                onClick={() => {
                    onPostReview(rating, comment).then(() => {
                        window.open('/dashboard', '_self');
                    });
                    onClose();
                }}>
                Отправить отзыв
            </button>
        </Modal>
    );
}

export default AddReview;
