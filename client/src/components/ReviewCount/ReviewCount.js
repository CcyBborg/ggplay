function reviewsEnumeration(num) {
    const last = String(num % 10);

    switch (last) {
        case '1':
            return 'отзыв';
        case '2':
        case '3':
        case '4':
            return 'отзыва';
        default:
            return 'отзывов';
    }
}

function ReviewCount({ reviewsLength }) {
    return (
        <>{reviewsLength}&nbsp;{reviewsEnumeration(reviewsLength)}</>
    );
}

export default ReviewCount;
