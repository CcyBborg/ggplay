function GameTile({
    title,
    img,
    onClick
}) {
    return (
        <div
            className='
                    block-images
                    position-relative
                    watchlist-img watchlist-first
                  '
        >
            <div className='img-box'>
                <img
                    onClick={onClick}
                    src={img}
                    className='img-fluid'
                    alt={`${title} | GGPlay`}
                />
            </div>
            <div className='block-description'>
                <h6 className='iq-title'>
                    <a href='#'>{title}</a>
                </h6>
            </div>
        </div>
    );
}

export default GameTile;
