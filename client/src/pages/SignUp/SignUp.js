import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Spinner } from 'react-bootstrap';
import AuthScreen from '../../components/AuthScreen/AuthScreen';
import GameSelect from '../../components/GameSelect/GameSelect';
import { fetchGames, createUser } from './actions';
import styles from './sign-up.module.css';
import SignUpForm from './components/SignUpForm/SignUpForm';
import { withRouter, useLocation } from 'react-router';
import { editUser } from './api';
import Oauth from '../../components/Oauth/Oauth';

function SignUp({
    gameList,
    isLoading,
    isUserSignedIn,
    history,
    fetchGames,
    createUser,
    location
}) {
    const [selectedGame, setSelectedGame] = useState(location.state?.selectedGame);
    const isTournament = useLocation().state?.isTournament;

    useEffect(() => {
        if (!selectedGame) {
            fetchGames();
        }
    }, [selectedGame, fetchGames]);

    useEffect(() => {
        if (isUserSignedIn) {
            history.push({ pathname: '/coaching' })
        }
    }, [isUserSignedIn, history]);

    const isSocial = location.state?.isSocial;
    useEffect(() => {
        if (selectedGame && isSocial) {
            editUser(selectedGame).then(() => {
                window.open('/coaching', '_self');
            });
        }
    }, [selectedGame, isSocial]);

    return (
        <AuthScreen>
            {!selectedGame ? (
                <div className={styles.gameSelect}>
                    <h2 className={styles.gameSelectTitle}>Выбери одну игру</h2>
                    <p className={styles.gameSelectLabel}>Свой выбор всегда можно будет поменять в&nbsp;профиле</p>
                    {isLoading ? (
                        <div className='d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
                            <Spinner
                                variant='light'
                                animation='border'
                            />
                        </div>
                    ) : (
                        <GameSelect gameList={gameList} onSelect={setSelectedGame} />
                    )}
                </div>
            ) : (
                isSocial ? (
                    <div className='d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
                        <Spinner
                            variant='light'
                            animation='border'
                        />
                    </div>
                ) : (
                    <>
                        {isTournament && (
                            <div className={styles.steps}>
                                <div className={cx(styles.step, styles.stepCompleted)}>
                                    <div className={styles.stepCounter}>1</div>
                                    <div className={styles.stepName}>Регистрация на GGPlay</div>
                                </div>
                                <div className={styles.step}>
                                    <div className={styles.stepCounter}>2</div>
                                    <div className={styles.stepName}>Регистрация на Турнир</div>
                                </div>
                                <div className={styles.step}>
                                    <div className={styles.stepCounter}>3</div>
                                    <div className={styles.stepName}>Оплата стоимости участия</div>
                                </div>
                            </div>
                        )}
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
                    </>
                )
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
