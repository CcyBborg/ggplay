import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation
} from 'swiper';
import 'swiper/swiper.min.css';

SwiperCore.use([
  Navigation,
]);

function GameSelect({
  gameList,
  selectedGame,
  onSelect
}) {
  return (
    <div className='position-relative game-select'>
      <button className='coach-game-select__prev'>
        <i className='fas fa-chevron-left'></i>
      </button>
      <ul className='list-inline row p-0 mb-0'>
        <Swiper
          slidesPerView={1}
          navigation={{
            nextEl: '.coach-game-select__next',
            prevEl: '.coach-game-select__prev'
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1000: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            }
          }}>
          {gameList.map(game => (
            <SwiperSlide>
              <li
                key={game['_id']}
                className={`
                            slide-item
                            wl-child
                            ${game['_id'] === selectedGame ? 'slide-selected' : ''}
                          `}
                onClick={() => onSelect(game['_id'])}
              >
                <div
                  className='
                              block-images
                              position-relative
                              watchlist-img watchlist-first
                            '
                >
                  <div className='img-box'>
                    <img
                      src={game.img}
                      className='img-fluid'
                      alt={game.title}
                    />
                  </div>
                  <div className='block-description'>
                    <h6 className='iq-title'>
                      <a href='#'>{game.title}</a>
                    </h6>
                  </div>
                </div>
              </li>
            </SwiperSlide>
          ))}
        </Swiper>
      </ul>
      <button className='coach-game-select__next'>
        <i className='fas fa-chevron-right'></i>
      </button>
    </div>
  );
}

export default GameSelect;
