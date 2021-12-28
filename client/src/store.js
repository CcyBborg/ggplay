import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import signUp from './pages/SignUp/reducer';
import signIn from './pages/SignIn/reducer';
import coaching from './pages/Coaching/reducer';
import coach from './pages/Coach/reducer';
import slots from './pages/Dashboard/reducer';
import courseOrder from './pages/FullAccess/reducer';
import user from './components/Layout/reducer';

export default createStore(combineReducers({
    signUp,
    signIn,
    user,
    coaching,
    coach,
    slots,
    courseOrder
}), applyMiddleware(thunk));
