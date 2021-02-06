import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';
import { useDispatch } from 'react-redux';
import Layout from './components/commonComponents/layout/Layout';
import Home from './components/dashboard/Home';
import SignupWithLinkedIn from './components/authentication/login-page/SignupWithLinkedIn';
import FollowUps from './components/dashboard/follow-ups/FollowUps';
import Crm from './components/dashboard/crm/CRM';
import Reporting from './components/dashboard/reporting/Reporting';
import AuthRedirect from './components/dashboard/AuthRedirect';
import OpportunityDetails from './components/dashboard/follow-ups/UpcomingActions/OpportunityDetails/OpportunityDetails';
import Account from './components/commonComponents/upperHeader/Account/Account';
import PopUp from './components/commonComponents/PopUp/PopUp';
import { addFCMListner } from './redux/actions/fcmAction/FcmAction';
import { checkingCookiee } from './redux/actions/cookieeAction/CookieeAction';

const PrivateRoute = ({ component, ...options }) => {
  const dispatch = useDispatch();

  const isLoggedIn =
    localStorage.getItem('userToken') !== null && localStorage.getItem('userToken').length !== 0;
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(addFCMListner());
      dispatch(checkingCookiee());
    }
  }, []);
  const finalComponent = isLoggedIn ? component : SignupWithLinkedIn;
  if (options.path === '/' && isLoggedIn) {
    return (
      <Route {...options}>
        {' '}
        <Redirect to="/home" />
      </Route>
    );
  }
  return <Route {...options} component={finalComponent} />;
};
PrivateRoute.propTypes = {
  component: PropTypes.func,
};
PrivateRoute.defaultProps = {
  component: null,
};

function App() {
  return (
    <div className="App">
      <Notifications />
      <Router>
        <Route>
          <Switch>
            <Route exact path="/signUp" component={SignupWithLinkedIn} />
            <Route exact path="/auth-verify" component={AuthRedirect} />
            <Route exact path="/popUp" component={PopUp} />
            <PrivateRoute exact path="/" />
            <Layout>
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/followUps" component={FollowUps} />
              <PrivateRoute exact path="/crm" component={Crm} />
              <PrivateRoute exact path="/reporting" component={Reporting} />
              <PrivateRoute
                exact
                path="/followUps/opportunityDetails/:id"
                component={OpportunityDetails}
              />
              <PrivateRoute exact path="/account" component={Account} />
            </Layout>
          </Switch>
        </Route>
      </Router>
    </div>
  );
}

export default App;
