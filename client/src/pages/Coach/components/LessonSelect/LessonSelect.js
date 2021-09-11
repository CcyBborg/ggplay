function LessonSelect({
    list,
    selectedLesson,
    onSelect
}) {
    return (
        <ul className='coaching-select'>
            {list.map((lesson, i) => (
                <li
                    className={`coaching-select__item d-flex justify-content-between p-3 ${i === selectedLesson ? 'coaching-select__item-selected' : ''}`}
                    onClick={() => onSelect(i)}>
                    <div className='d-flex align-items-center'>
                        <div className='coaching-select__radio'>
                            {i == selectedLesson ? (
                                <i className='far fa-dot-circle'></i>
                            ) : (
                                <i className='far fa-circle'></i>
                            )}
                        </div>
                        <div className='coaching-select__description'>
                            <h5 className='h6'>{lesson.title}</h5>
                            <p className='text text-secondary m-0'>{lesson.description}</p>
                          </div>
                        </div>
                        <div className='d-flex flex-column align-items-end ml-2 ml-md-4'>
                          <span className='coaching-select__time text text-secondary'>{lesson.duration}&nbsp;минут</span>
                          <span className='coaching-select__price'>{lesson.price}&nbsp;₽</span>
                        </div>
                </li>
            ))}
      </ul>
    );
}

export default LessonSelect;
