function GameSelectList({
    gameList,
    selectedGame,
    onSelectGame
}) {
    return (
        <ul className='favorites-grid list-inline row'>
        {gameList.map(game => (
            <li
                key={game['_id']}
                className={`
                            slide-item
                            col-lg-6 col-md-4 col-sm-6 col-12
                            wl-child
                            ${selectedGame === game['_id'] ? 'slide-selected' : ''}
                        `}
                onMouseDown={() => onSelectGame(game['_id'])}
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
                            alt='streamit'
                        />
                    </div>
                    <div className='block-description'>
                        <h6 className='iq-title'>
                            <a href='#'>{game.title}</a>
                        </h6>
                    </div>
                </div>
            </li>
        ))}
    </ul>
    );
}

export default GameSelectList;
