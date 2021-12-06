import {
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import store from './store';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Coaching from './pages/Coaching/Coaching';
import ConfidentialPolicy from './pages/ConfidentialPolicy/ConfidentialPolicy';
import Layout from './components/Layout/Layout';
import Coach from './pages/Coach/Coach';
import Dashboard from './pages/Dashboard/Dashboard';
import FullAccess from './pages/FullAccess/FullAccess';
import SlotBooked from './pages/SlotBooked/SlotBooked';
import Course from './pages/Course/Course';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import { useEffect } from 'react';

function App({ history }) {
  useEffect(() => {
    ReactGA.initialize('UA-207441127-2');
    ReactGA.pageview(`${history.location.pathname}${history.location.search}`);

    return history.listen((location) => {
      ReactGA.pageview(`${location.pathname}${location.search}`);
    });
  }, []);

  return (
    <Provider store={store}>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/coaching' />
          </Route>
          <Route path='/sign-up'>
            <>
              <Helmet>
                <title>Регистрация | GGPlay</title>
              </Helmet>
              <SignUp />
            </>
          </Route>
          <Route path='/sign-in'>
            <>
              <Helmet>
                <title>Вход | GGPlay</title>
              </Helmet>
              <SignIn />
            </>
          </Route>
          <Route path='/coaching'>
            <Layout>
              <Helmet>
                <title>Тренировки | GGPlay</title>
              </Helmet>
              <Coaching />
            </Layout>
          </Route>
          <Route path='/course'>
            <Layout>
              <Helmet>
                <title>Мастер-класс Dota2 | GGPlay</title>
              </Helmet>
              <Course />
            </Layout>
          </Route>
          <Route path='/dashboard'>
            <Layout>
              <Helmet>
                <title>Мои тренировки | GGPlay</title>
              </Helmet>
              <Dashboard />
            </Layout>
          </Route>
          <Route path='/confidential-policy'>
            <Layout>
              <Helmet>
                <title>Политика конфиденциальности | GGPlay</title>
              </Helmet>
              <ConfidentialPolicy />
            </Layout>
          </Route>
          <Route path='/terms-of-service'>
            <Layout>
              <Helmet>
                <title>Пользовательской соглашение | GGPlay</title>
              </Helmet>
              <TermsOfService />
            </Layout>
          </Route>
          <Route path='/slot-booked'>
            <Layout>
              <Helmet>
                <title>Поздравляем с записью! | GGPlay</title>
              </Helmet>
              <SlotBooked />
            </Layout>
          </Route>
        </Switch>
        <Route path='*/coach/:id' component={Coach} />
        <Route path='*/full-access' component={FullAccess} />
    </Provider>
  );
}

export default withRouter(App);
