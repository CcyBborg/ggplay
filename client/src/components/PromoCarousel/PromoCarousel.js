import { Carousel, Button } from 'react-bootstrap';
import styles from './promo-carousel.module.css';

function PromoCarousel() {
    return (
        <Carousel controls={false}>
            <Carousel.Item>
                <div className={styles.bg1} />
                <Carousel.Caption>
                    <h3 className={styles.captionTitle}>Мастер-класс:<br />Цена времени в&nbsp;Dota2</h3>
                    <p className={styles.captionAbout1}>&laquo;Цена Времени&raquo;&nbsp;&mdash; это настоящая выжимка знаний. Сформирована огромным опытом работы с&nbsp;учениками, и&nbsp;универсальным подходом к&nbsp;разному рейтингу.</p>
                    <Button
                        href='/course'
                        variant='outline-primary'
                        className={styles.button1}>
                        Узнать больше
                    </Button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className={styles.bg2} />
                <Carousel.Caption>
                    <h3 className={styles.captionTitle}>Тренировки с&nbsp;профессионалами</h3>
                    <p className={styles.captionAbout2}>Начни свой путь в&nbsp;киберпорт с&nbsp;лучшими групповыми и&nbsp;индивидуальными тренировками</p>
                    <Button
                        href='/coaching'
                        variant='outline-primary'
                        className={styles.button2}>
                        Узнать больше
                    </Button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default PromoCarousel;
