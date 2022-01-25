import { withRouter } from 'react-router-dom';
import { Badge, Row, Col, Image } from 'react-bootstrap';
import StartRatings from 'react-star-ratings';
import styles from './coach-card.module.css';

function CoachCard({
  id,
  title,
  status,
  history,
  reviewsLength,
  rating,
  about,
  img
}) {
  return (
    <article className={styles.root} onClick={() => history.push({ pathname: `/coaching/coach/${id}${window.location.search}` })}>
      <div className={styles.header}>
        <div>
          <Image
            src={img}
            width={100}
            height={100}
            className={styles.avatar}
            alt={`Тренер ${title} | GGPlay`} />
        </div>
        <div className={styles.info}>
          <div>
            <h5 className={styles.title}>{title}</h5>
            <Badge bg='success'>Online</Badge>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <Row>
          <Col xs='6'>
            <div className={styles.attribute}>Ранг</div>
            <p className='mb-1'>{status}</p>
          </Col>
          <Col xs='6'>
            <div className={styles.attribute}>Рейтинг</div>
            <div className='d-flex align-items-center'>
              <StartRatings
                starRatedColor='#E50A48'
                starEmptyColor='#767698'
                starDimension='20px'
                starSpacing='2px'
                rating={rating || 0}
                numberOfStars={5}
                name='rating' />
              <span className={styles.ratingCount}>({reviewsLength})</span>
            </div>
          </Col>
        </Row>
        <div className={styles.attribute}>О себе</div>
        <p>{about}</p>
      </div>
    </article>
  );
}

export default withRouter(CoachCard);
