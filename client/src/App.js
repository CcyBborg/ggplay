import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/Layout/Layout';
import DotaRegister from './pages/TournamentDota/DotaRegister';
import CSRegister from './pages/TournamentCS/CSRegister';

export const Tournament = React.lazy(() => import('./pages/Tournament/Tournament'));
export const Course = React.lazy(() => import('./pages/Course/Course'));
export const TermsOfService = React.lazy(() => import('./pages/TermsOfService/TermsOfService'));
export const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword/ForgotPassword'));
export const Coach = React.lazy(() => import('./pages/Coach/Coach'));
export const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
export const SignUp = React.lazy(() => import('./pages/SignUp/SignUp'));
export const SignIn = React.lazy(() => import('./pages/SignIn/SignIn'));
export const Coaching = React.lazy(() => import('./pages/Coaching/Coaching'));
export const ConfidentialPolicy = React.lazy(() => import('./pages/ConfidentialPolicy/ConfidentialPolicy'));
export const FullAccess = React.lazy(() => import('./pages/FullAccess/FullAccess'));
export const CheckoutRouter = React.lazy(() => import('./pages/CheckoutRouter/CheckoutRouter'));
export const TournamentDetails = React.lazy(() => import('./pages/TournamentDetails/TournamentDetails'));

function App() {

  return (
    <Provider store={store}>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/coaching' />
        </Route>
        <Route path='/sign-up' render={props => (
          <React.Suspense fallback={<>...</>}>
            <>
              <Helmet>
                <title>Регистрация | GGPlay</title>
              </Helmet>
              <SignUp {...props} />
            </>
          </React.Suspense>
        )} />
        <Route path='/sign-in' render={props => (
          <React.Suspense fallback={<>...</>}>
            <>
              <Helmet>
                <title>Вход | GGPlay</title>
              </Helmet>
              <SignIn {...props} />
            </>
          </React.Suspense>
        )} />
        <Route path='/forgot-password' render={props => (
          <React.Suspense fallback={<>...</>}>
            <>
              <Helmet>
                <title>Вход | GGPlay</title>
              </Helmet>
              <ForgotPassword {...props} />
            </>
          </React.Suspense>
        )} />
        <Route path='/coaching' render={props => (
          <React.Suspense fallback={<>...</>}>
            <Layout>
              <Helmet>
                <title>Тренировки | GGPlay</title>
              </Helmet>
              <Coaching {...props} />
            </Layout>
          </React.Suspense>
        )} />
        <Route path='/course' render={props => (
          <React.Suspense fallback={<>...</>}>
            <Layout>
              <Helmet>
                <title>Мастер-класс Dota2 | GGPlay</title>
              </Helmet>
              <Course {...props} />
            </Layout>
          </React.Suspense>
        )} />
        <Route path='/tournament' exact render={props => (
          <React.Suspense fallback={<>...</>}>
            <Layout>
              <Helmet>
                <title>Турниры по киберспорту | GGPlay</title>
              </Helmet>
              <Tournament {...props} />
            </Layout>
          </React.Suspense>
        )} />
        <Route path='/tournament/:game' render={props => (
          <React.Suspense fallback={<>...</>}>
            <Layout>
              <Helmet>
                <title>Командный турнир | GGPlay</title>
              </Helmet>
              <TournamentDetails {...props} />
            </Layout>
          </React.Suspense>
        )} />
        <Route path='/dashboard' render={props => (
          <React.Suspense fallback={<>...</>}>
            <Layout>
              <Helmet>
                <title>Мои тренировки | GGPlay</title>
              </Helmet>
              <Dashboard {...props} />
            </Layout>
          </React.Suspense>
        )}>
        </Route>
        <Route path='/confidential-policy' render={props => (
          <React.Suspense fallback={<>...</>}>
            <Layout>
              <Helmet>
                <title>Политика конфиденциальности | GGPlay</title>
              </Helmet>
              <ConfidentialPolicy {...props} />
            </Layout>
          </React.Suspense>
        )} />
        <Route path='/terms-of-service' render={props => (
          <React.Suspense fallback={<>...</>}>
            <Layout>
              <Helmet>
                <title>Пользовательской соглашение | GGPlay</title>
              </Helmet>
              <TermsOfService {...props} />
            </Layout>
          </React.Suspense>
        )
        }>
        </Route>
        <Route path='/slot-booked' render={props => (
          <React.Suspense fallback={<>...</>}>
            <Layout>
              <Helmet>
                <title>Поздравляем с записью! | GGPlay</title>
              </Helmet>
              <CheckoutRouter {...props} />
            </Layout>
          </React.Suspense>
        )
        } />
      </Switch>
      <Route path='*/coach/:id' render={props => (
        <React.Suspense fallback={<>...</>}>
          <Coach {...props} />
        </React.Suspense>
      )
      } />

      <Route path='*/full-access' render={props => (
        <React.Suspense fallback={<>...</>}>
          <FullAccess {...props} />
        </React.Suspense>
      )
      } />

      <Route path='/tournament/dota/register' render={props => (
        <React.Suspense fallback={<>...</>}>
          <DotaRegister {...props} />
        </React.Suspense>
      )
      } />

      <Route path='/tournament/cs/register' render={props => (
        <React.Suspense fallback={<>...</>}>
          <CSRegister {...props} />
        </React.Suspense>
      )
      } />
    </Provider>
  );
}

export default App;
