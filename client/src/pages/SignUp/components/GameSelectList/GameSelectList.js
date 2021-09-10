import GameTile from '../../../../components/GameTile/GameTile';

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
                            ${selectedGame === game['_id'] ? 'slide-selected' : ''}
                        `}
            >
                <GameTile
                    title={game.title}
                    img={game.img}
                    onClick={() => onSelectGame(game['_id'])} />
            </li>
        ))}
    </ul>
    );
}

export default GameSelectList;
