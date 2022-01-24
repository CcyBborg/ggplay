import axios from 'axios';
import { useState, useCallback } from 'react';
import { FloatingLabel, Form, Button, Spinner } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

function ReviewForm({ slotId, review: initialReview }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [review, setReview] = useState(initialReview);
    const [isLoading, setIsLoading] = useState(false);

    console.log({
        rating,
        comment
    });

    const handleSendReview = useCallback(({ rating, comment }) => {
        setIsLoading(true);
        axios.post(`/slots/${slotId}/review`, {
            rating,
            comment
        }).then(res => {
            setIsLoading(false);
            setReview(res.data);
        });
    }, [slotId]);

    return review ? (
        <>
            <h5>Спасибо!</h5 >
            <p>Твоё мнение очень важно для нас!</p>
            <div className='d-flex justify-content-center mt-3 mb-3 rating-review'>
                <StarRatings
                    starRatedColor='#E50A48'
                    starEmptyColor='#767698'
                    starDimension='30px'
                    starSpacing='0px'
                    rating={review.rating}
                    numberOfStars={5}
                    name='rating' />
            </div>
        </>
    ) : (
        <>
            <h5>Оценить тренировку</h5 >
            <p>Поделись своим мнением, это важно для нас!</p>
            <div className='d-flex justify-content-center mt-3 mb-3 rating-review'>
                <StarRatings
                    starRatedColor='#E50A48'
                    starEmptyColor='#767698'
                    starDimension='30px'
                    starSpacing='0px'
                    rating={rating}
                    numberOfStars={5}
                    name='rating'
                    changeRating={setRating} />
            </div>
            <FloatingLabel controlId='floatingTextarea2' label='Напишите свой отзыв...'>
                <Form.Control
                    as='textarea'
                    placeholder='Напишите свой отзыв'
                    style={{ height: '100px' }}
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                />
            </FloatingLabel>
            <div className='d-grid gap-2 mt-3'>
                <Button variant='secondary' onClick={() => handleSendReview({ rating, comment })}>
                    {isLoading ? (
                        <Spinner
                            as='span'
                            animation='border'
                            size='sm'
                            role='status'
                            aria-hidden='true'
                        />
                    ) : (
                        <>Отправить отзыв</>
                    )}
                </Button>
            </div>
        </>
    );
}

export default ReviewForm;
