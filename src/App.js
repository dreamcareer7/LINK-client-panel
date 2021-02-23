import React, { useEffect } from 'react';
import is from 'is_js';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';

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
import { getClientError } from './redux/actions/clientErrorAction/ClientErrorAction';

const PrivateRoute = ({ component, ...options }) => {
  const isLoggedIn =
    localStorage.getItem('userToken') !== null && localStorage.getItem('userToken').length !== 0;

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClientError());
  }, []);
  return (
    <div className="App">
      <Notifications />
      {is.not.chrome() && <PopUp popupData="browser_not_supported" />}
      {is.not.desktop() && <PopUp popupData="device_not_desktop" />}
      <Router>
        <Route>
          <Switch>
            <Route exact path="/signUp" component={SignupWithLinkedIn} />
            <Route exact path="/auth-verify" component={AuthRedirect} />
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
