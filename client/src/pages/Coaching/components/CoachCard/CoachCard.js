import { withRouter } from 'react-router-dom';
import { Badge, Row, Col, Image } from 'react-bootstrap';
import StartRatings from 'react-star-ratings';
import styles from './coach-card.module.css';
import messageIcon from './images/message.svg';

function CoachCard({
  id,
  title,
  status,
  price,
  history,
  reviewsLength,
  rating,
  img
}) {
  return (
    <article className={styles.root} onClick={() => history.push({ pathname: `/coaching/coach/${id}${window.location.search}` })}>
      <div className={styles.header}>
        <div>
          <Image
            src={img}
            className={styles.avatar}
            width='100'
            height='100'
            alt={`Тренер ${title} | GGPlay`} />
        </div>
        <div className={styles.info}>
          <div>
            <h5 className={styles.title}>{title}</h5>
            <Badge bg='success'>Online</Badge>
          </div>
          <div>
            <Image src={messageIcon} alt='Message icon' width='20' height='20' />
          </div>
        </div>
      </div>
      <div className={styles.about}>
        <Row>
          <Col sm='5'>
            <div className={styles.attribute}>Ранг</div>
            <p className='mb-1'>{status}</p>
          </Col>
          <Col sm='7'>
            <div className={styles.attribute}>Рейтинг</div>
            <div className='d-flex align-items-center'>
              <StartRatings
                starRatedColor='#E50A48'
                starEmptyColor='#767698'
                starDimension='20px'
                starSpacing='2px'
                rating={rating}
                numberOfStars={5}
                name='rating' />
              <span className={styles.ratingCount}>({reviewsLength})</span>
            </div>
          </Col>
        </Row>
        <div className={styles.attribute}>О себе</div>
        <p className='text-justify'>Профессиональный психолог. Обучаю игроков любого уровня. Работаю с 2014 года, с 2016 года тренирую професио...</p>
      </div>
    </article>
  );
}

export default withRouter(CoachCard);
