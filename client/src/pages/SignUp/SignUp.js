import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GameSelectList from './components/GameSelectList/GameSelectList';
import RankSelectList from './components/RankSelectList/RankSelectList';
import SignUpForm from './components/SignUpForm/SignUpForm';
import Spinner from '../../components/Spinner/Spinner';
import { fetchGames } from './actions';
import { STEPS, SELECT_GAME_STEP, SELECT_RANK_STEP, SIGN_UP_STEP } from './constants/steps';
import { fetchRanks, createUser } from './actions';

function SignUp({
    isLoading,
    isUserSignedIn,
    error,
    history,
    fetchGames,
    fetchRanks,
    gameList,
    rankList,
    createUser
}) {
    const [selectedGame, setSelectedGame] = useState(null);
    const [selectedRank, setSelectedRank] = useState(null);
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (STEPS[step].id === SELECT_GAME_STEP) {
            fetchGames();
        } else if (STEPS[step].id === SELECT_RANK_STEP) {
            fetchRanks(selectedGame);
        }
    }, [step]);

    if (isUserSignedIn) {
        history.push({ pathname: '/dashboard' });
    }

    if (isLoading) {
        return (
            <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
                <Spinner />
            </div>
        );
    }

    return (
        <div className={`poll ${step === 2 ? 'poll-sign-up' : ''}`}>
            <div className='container position-relative'>
                <nav className='d-flex justify-content-between align-items-center pt-3 pb-3 pt-md-4 pb-md-4'>
                    {step > 0 ? (
                        <button className='sign-up-btn' onClick={() => {
                            if (step === 1) {
                                setSelectedRank(null);
                            }

                            if (step !== 0) {
                                setStep(step - 1);
                            }
                        }}>
                            <i className='fas fa-arrow-left'></i>
                        </button>
                    ) : (
                        <div style={{width: '25px'}} />
                    )}
                    <div className='m-auto'>
                        Шаг {step + 1} из {STEPS.length}
                    </div>
                    <button
                        className='sign-up-btn'
                        onClick={() => {
                            history.push({ pathname: '/coaching' });
                        }}>
                        <i className='fas fa-times'></i>
                    </button>
                </nav>
                <div className={`d-flex ${STEPS[step].id === SIGN_UP_STEP ? 'justify-content-center' : 'justify-content-between'} flex-column flex-md-row align-items-center`}>
                    {STEPS[step].id !== SIGN_UP_STEP && (
                        <div className='poll-info'>
                            <h1 className='pb-2 pb-md-4'>{STEPS[step].title}</h1>
                            <p className='lead pb-3 pb-md-0 mb-0'>{STEPS[step].description}</p>
                        </div>
                    )}
                    {STEPS[step].id === SELECT_GAME_STEP && gameList && (
                        <div className='poll-content p-md-4'>
                            <GameSelectList
                                gameList={gameList}
                                selectedGame={selectedGame}
                                onSelectGame={setSelectedGame} />
                        </div>
                    )}
                    {STEPS[step].id === SELECT_RANK_STEP && rankList && (
                        <div className='poll-content p-md-4'>
                            <RankSelectList
                                rankList={rankList}
                                selectedRank={selectedRank}
                                onSelectRank={setSelectedRank} />
                        </div>
                    )}
                    {STEPS[step].id === SIGN_UP_STEP && (
                        <SignUpForm
                            error={error}
                            selectedGame={selectedGame}
                            selectedRank={selectedRank}
                            onCreateUser={params =>
                                createUser({
                                    ...params,
                                    game: selectedGame,
                                    rank: selectedRank
                                })
                            } />
                    )}
                </div>
            </div>
            {STEPS[step].id !== SIGN_UP_STEP && (
                <footer className='poll-footer d-flex justify-content-center align-items-center p-4 p-md-5'>
                    <button
                        type='submit'
                        disabled={isLoading || (!selectedGame && STEPS[step].id === SELECT_GAME_STEP) || (!selectedRank && STEPS[step].id === SELECT_RANK_STEP)}
                        className='btn btn-lg btn-hover'
                        onClick={() => setStep(step + 1)}>
                        Следующий шаг <i className='fas fa-chevron-right'></i>
                    </button>
                </footer>
            )}
        </div>
    );
}

export default connect(({ signUp }) => ({
    isLoading: signUp.isLoading,
    error: signUp.error,
    isUserSignedIn: signUp.isUserSignedIn,
    gameList: signUp.gameList,
    rankList: signUp.rankList
}), {
    fetchGames,
    fetchRanks,
    createUser
})(withRouter(SignUp));
