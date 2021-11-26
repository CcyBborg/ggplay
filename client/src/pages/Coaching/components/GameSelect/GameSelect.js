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
        {gameList.map(game => (
          <Col md='3' className='p-0' onClick={() => onSelect(game._id)}>
            <div className={styles.gameCard}>
              <Image src={game.img} />
              <div className={styles.overlay}>
                <div className='mb-3'>
                  <Image width='80' height='80' src={game.logo} alt={`GGPlay | ${game.title}`} />
                </div>
                <h4>{game.title}</h4>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default GameSelect;
