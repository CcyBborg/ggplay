import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import signUp from './pages/SignUp/reducer';
import signIn from './pages/SignIn/reducer';
import coaching from './pages/Coaching/reducer';
import coach from './pages/Coach/reducer';
import user from './components/AuthWrapper/reducer';

export default createStore(combineReducers({
    signUp,
    signIn,
    user,
    coaching,
    coach
}), applyMiddleware(thunk));
