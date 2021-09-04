function Dashboard() {
    return (
        <div className='container'>
            <div className='row pt-5'>
                <div className='col'>
                    <h4>Мои курсы</h4>
                    <ul className='my-course-list'>
                        <li className='my-course-item'>
                            <div className='my-course-item__course'>
                                <img src='/images/tmp_course.webp' alt='' />
                                <span>Курс по Dota2</span>
                                <h5>Основные тактики ведения миддла в Dota2</h5>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h4>Учимся брать миддл с халвой</h4>
                                <div>
                                <div>
                                    <div className='course-progress'>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <span>13/28 уроков пройдено</span>
                                    </div>
                                    <span>Продолжить&nbsp;<i class="fas fa-chevron-right"></i></span>
                                </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    {/* <div className='empty-placeholder p-5'>
                    </div> */}
                </div>
                <div className='col'>
                    <h4>Мои тренировки</h4>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
