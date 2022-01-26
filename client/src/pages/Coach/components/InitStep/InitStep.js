import { Image, Button, Badge, ListGroup, Spinner } from 'react-bootstrap';
import StartRatings from 'react-star-ratings';
import styles from './coach-info.module.css';
import keyboardImage from '../../images/keyboard.png';
import lessonItemIcon from './images/lesson-item.svg';
import selectedLessonItemIcon from './images/selected-lesson-item.svg';
import { useMemo } from 'react';
import Reviews from '../Review/Reviews';

function InitStep({
  isLoading,
  coach,
  selectedLesson,
  onSelectLesson,
  onNextStep
}) {
  const tags = useMemo(() => {
    if (coach) {
      return coach.game.filters[0]?.tags.filter(t => coach.tags.includes(t.key));
    }
  }, [coach]);

  return (
    <>
      {isLoading ? (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
          <Spinner
            variant='light'
            animation='border'
          />
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <div>
              <Image
                src={coach.img}
                className={styles.avatar}
                alt={`Тренер ${coach.title} | GGPlay`}
                width={122}
                height={122} />
            </div>
            <div className='flex-fill d-flex jusitify-content-between flex-column flex-md-row'>
              <div className='flex-fill'>
                <h3 className={styles.title}>{coach.title}</h3>
                <div className={styles.attribute}>Ранг</div>
                <p className='mb-2'>{coach.status}</p>
                {tags && (
                  <ul className={styles.tags}>
                    {tags.map(t => (
                      <li key={t.key} className={styles.tag}>
                        <Badge bg='secondary'>{t.label}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.meta}>
                <div className={styles.attribute}>Рейтинг</div>
                <div className='d-flex align-items-start'>
                  <StartRatings
                    starRatedColor='#E50A48'
                    starEmptyColor='#767698'
                    starDimension='20px'
                    starSpacing='2px'
                    rating={coach.rating || 0}
                    numberOfStars={5}
                    name='rating' />
                  <span className={styles.ratingCount}>{coach.rating?.toFixed(1)}</span>
                </div>
                <div className={styles.attrSep}>{coach.reviews?.length} отзыва</div>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
          <div className='mt-5'>
            <div className='d-flex align-items-center mb-3'>
              <Image className={styles.chooseLessonIcon} src={keyboardImage} width='28px' />
              <p className={styles.chooseLessonTitle}>Выбери вид тренировки</p>
            </div>
            <ListGroup as='ul' className={styles.lessons}>
              {coach.lessons.map((lesson, i) => (
                <ListGroup.Item as='li'
                  key={lesson._id}
                  className={`${styles.lesson} ${i === selectedLesson ? styles.selectedLesson : ''}`}
                  onClick={() => onSelectLesson(i)}>
                  <div className='me-auto d-flex'>
                    <Image className={styles.lessonIcon} src={i === selectedLesson ? selectedLessonItemIcon : lessonItemIcon} width='28' height='28' />
                    <div>
                      <h5 className={styles.lessonTitle}>{lesson.title}</h5>
                      <p className={styles.lessonDescription}>{lesson.description}</p>
                    </div>
                  </div>
                  <div className='d-flex flex-column align-items-end'>
                    <span className={styles.lessonPrice}>{lesson.price}&nbsp;₽</span>
                    {lesson.duration && (
                      <span className={styles.lessonDuration}>{lesson.duration}&nbsp;минут</span>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className='d-grid'>
              <Button variant='primary' size='lg' onClick={onNextStep}>
                Запланировать урок
              </Button>
            </div>
          </div>
          <div className={styles.divider} />
          <div className='mt-5'>
            <h6>О себе:</h6>
            <p className={styles.about}>{coach.about}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.reviewsBlock}>
            <h6>Отзывы:</h6>
            <Reviews reviews={coach.reviews} />
          </div>
        </>
      )}
    </>
  );
}

export default InitStep;
