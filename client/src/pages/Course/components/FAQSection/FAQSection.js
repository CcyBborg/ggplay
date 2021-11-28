import { Accordion } from "react-bootstrap";
import styles from './faq-section.module.css';

function FAQSection() {
    return (
        <>
            <h5 className={styles.title}>Общие</h5>
            <Accordion>
                <Accordion.Item className={styles.faqItem} eventKey='0'>
                    <Accordion.Header className={styles.faqItemHeader}>Как долго мне будет доступен курс после покупки?</Accordion.Header>
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
                <Accordion.Item className={styles.faqItem} eventKey='1'>
                    <Accordion.Header className={styles.faqItemHeader}>Какие возможности мне будут доступны после покупки?</Accordion.Header>
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
                <Accordion.Item className={styles.faqItem} eventKey='3'>
                    <Accordion.Header className={styles.faqItemHeader}>Что-то ещё по поводу покупки курса?</Accordion.Header>
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
            <h5 className={styles.title}>Оплата курса</h5>
            <Accordion>
                <Accordion.Item className={styles.faqItem} eventKey='0'>
                    <Accordion.Header className={styles.faqItemHeader}>Как долго мне будет доступен курс после покупки?</Accordion.Header>
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
                <Accordion.Item className={styles.faqItem} eventKey='1'>
                    <Accordion.Header className={styles.faqItemHeader}>Какие возможности мне будут доступны после покупки?</Accordion.Header>
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
