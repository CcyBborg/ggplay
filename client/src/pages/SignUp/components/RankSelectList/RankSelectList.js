function RankSelectList({ rankList, selectedRank, onSelectRank }) {
    return (
        <ul className='rank-select'>
            {rankList.map(rank => (
                <li
                    key={rank['_id']}
                    style={{
                        height: '76px'
                    }}
                    className={`rank-select__item mb-3 p-2 pl-3 ${rank['_id'] === selectedRank ? 'rank-select__item-selected' : ''}`}
                    onClick={() => onSelectRank(rank['_id'])}>
                    <img src={rank.img} width="60" />
                    <span className='h6 m-0 ml-3'>{rank.title}</span>
                </li>
            ))}
        </ul>
    );
}

export default RankSelectList;
