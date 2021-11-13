import { Row, Col, Image } from 'react-bootstrap';
import styles from './game-select.module.css';

function GameSelect({
  gameList,
  onSelect
}) {

  return (
    <>
      <h4>Выбери игру</h4>
      <Row>
        {gameList.map((game, i) => (
          <Col md='3' className='p-0'>
            <div className={styles.gameCard}>
              <Image src={game.img} />
              <div className={styles.overlay}>
                <h3>{game.title}</h3>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default GameSelect;
