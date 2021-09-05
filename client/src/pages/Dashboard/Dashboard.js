import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function Dashboard({
    history,
    user
}) {
    if (!user.info) {
        history.push({ pathname: '/sign-in' });
    }

    return (
        <div className='container pt-5'>
            <h4>Мои тренировки</h4>
            <div>
                <div className='empty-placeholder pt-5 text-center'>
                    <p className='lead pb-3'>У&nbsp;тебя пока нет записей на&nbsp;тренировки.</p>
                    <a className='btn btn-hover' href='/coaching'>Найти тренировку</a>
                </div>
            </div>
        </div>
    );
}

export default connect(({ user }) => ({
    user
}))(withRouter(Dashboard));
