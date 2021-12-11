import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AuthScreen from '../../components/AuthScreen/AuthScreen';
import Spinner from '../../components/Spinner/Spinner';
import GameSelect from '../../components/GameSelect/GameSelect';
import { fetchGames, createUser } from './actions';
import styles from './sign-up.module.css';
import SignUpForm from './components/SignUpForm/SignUpForm';
import { withRouter } from 'react-router';
import Oauth from '../../components/Oauth/Oauth';

function SignUp({
    gameList,
    isLoading,
    isUserSignedIn,
    history,
    fetchGames,
    createUser
}) {
    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        if (!selectedGame) {
            fetchGames();
        }
    }, [selectedGame, fetchGames]);

    if (isUserSignedIn) {
        history.push({ pathname: '/coaching' });
    }

    return (
        <AuthScreen>
            {!selectedGame ? (
                <div className={styles.gameSelect}>
                    <h2 className={styles.gameSelectTitle}>Выбери одну игру</h2>
                    <p className={styles.gameSelectLabel}>Свой выбор всегда можно будет поменять в&nbsp;профиле</p>
                    {isLoading ? (
                        <div className='d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
                            <Spinner />
                        </div>
                    ) : (
                        <GameSelect gameList={gameList} onSelect={setSelectedGame} />
                    )}
                </div>
            ) : (
                <div className={styles.form}>
                    <h2 className={styles.title}>Создать учётную запись</h2>
                    <p className={styles.loginLabel}>
                        Уже есть учётная запись?
                        <a href='/sign-in' className={styles.loginLink}>Войти</a>
                    </p>
                    <SignUpForm onSubmit={params =>
                        createUser({
                            ...params,
                            game: selectedGame
                        })
                    } />
                    <Oauth selectedGame={selectedGame} />
                    <p className={styles.legal}>Нажимая продолжить, Вы&nbsp;принимаете <a href='/terms-of-service' target='_blank' className={styles.legalLink}>Пользовательское&nbsp;Соглашение</a> и&nbsp;нашу <a href='/confidential-policy' target='_blank' className={styles.legalLink}>Политику&nbsp;Конфиденциальности</a>.</p>
                </div>
            )}
        </AuthScreen>
    );
}

export default connect(({ signUp }) => ({
    gameList: signUp.gameList,
    isLoading: signUp.isLoading,
    isUserSignedIn: signUp.isUserSignedIn
}), {
    fetchGames,
    createUser
})(withRouter(SignUp));
