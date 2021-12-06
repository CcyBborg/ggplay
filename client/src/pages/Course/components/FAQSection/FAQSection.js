import { Accordion } from "react-bootstrap";
import styles from './faq-section.module.css';

function FAQSection() {
    return (
        <>
            <h5 className={styles.title}>Общие</h5>
            <Accordion>
                <Accordion.Item className={styles.faqItem} eventKey='0'>
                    <Accordion.Header className={styles.faqItemHeader}>Как долго мне будет доступен курс мастер-класс покупки?</Accordion.Header>
                    <Accordion.Body className={styles.faqItemBody}>
                        После покупки мастер-класса он будет доступен тебе всегда.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item className={styles.faqItem} eventKey='1'>
                    <Accordion.Header className={styles.faqItemHeader}>Какие возможности мне будут доступны после покупки?</Accordion.Header>
                    <Accordion.Body className={styles.faqItemBody}>
                        Пожизненный доступ ко всем урокам мастер-класса. А также ты получишь одну тренировку с любым из тренеров в подарок.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item className={styles.faqItem} eventKey='2'>
                    <Accordion.Header className={styles.faqItemHeader}>Кому подойдет этот мастер-класс?</Accordion.Header>
                    <Accordion.Body className={styles.faqItemBody}>
                        Мастер-класс отлично подойдет опытным игрокам, желающим поднять свой рейтинг и общий уровень игры.<br />
                        Для получения максимума от мастер-класса необходимо иметь игровой опыт Dota&nbsp;2 и понимание основных механик в игре.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item className={styles.faqItem} eventKey='3'>
                    <Accordion.Header className={styles.faqItemHeader}>Смогу ли я задать вопрос ведущему мастер-класса?</Accordion.Header>
                    <Accordion.Body className={styles.faqItemBody}>
                        Да, оформив полный доступ ты сможешь пообщаться с Артуром через наш Discord-канал.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <h5 className={styles.title}>Оплата курса</h5>
            <Accordion>
                <Accordion.Item className={styles.faqItem} eventKey='0'>
                    <Accordion.Header className={styles.faqItemHeader}>Как происходит оплата мастер-класса?</Accordion.Header>
                    <Accordion.Body className={styles.faqItemBody}>
                        Оплата мастер-класса происходит любым удобным способом через онлайн-кассу Тинькофф банка.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item className={styles.faqItem} eventKey='1'>
                    <Accordion.Header className={styles.faqItemHeader}>Как оформить возврат средств?</Accordion.Header>
                    <Accordion.Body className={styles.faqItemBody}>
                        Если мастер-класс не оправдал ожидания, то можно оформить возврат. Для оформления возврата средств необходимо написать на нашу почту: <a href=''>ggplay@ggplay.ru</a>.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item className={styles.faqItem} eventKey='2'>
                    <Accordion.Header className={styles.faqItemHeader}>Кому нужен этот курс?</Accordion.Header>
                    <Accordion.Body className={styles.faqItemBody}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default FAQSection;
