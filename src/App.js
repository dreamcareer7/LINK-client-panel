import React, { useEffect } from 'react';
import is from 'is_js';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import './App.css';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';
import UAParser from 'ua-parser-js';

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
import { SOCKET_URL } from './constants/UrlConstant';
import { logoutUser } from './redux/actions/accountAction/AccountAction';
import Strategy from './components/dashboard/strategy/Strategy';
/* import { SOCKET_URL } from './constants/UrlConstant';
import { logoutUser } from './redux/actions/accountAction/AccountAction'; */

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

const uaParser = new UAParser();
const browserName = uaParser.getBrowser().name;

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getClientError());
  }, []);
  useEffect(() => {
    let socket = null;
    async function setSocketConnection() {
      if (localStorage.getItem('userToken') !== null) {
        socket = await socketIOClient(`${SOCKET_URL}?token=${localStorage.getItem('userToken')}`);
      }
    }
    setSocketConnection().then(r => {
      if (socket) {
        console.log('r->', r);
        socket.on('FromAPI', data => {
          if (data.type === 'LOGOUT_USER') {
            logoutUser();
            history.push('/signUp');
          }
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Notifications />
      {browserName !== 'Chrome' && <PopUp popupData="browser_not_supported" />}
      {is.not.desktop() && <PopUp popupData="device_not_desktop" />}
      {is.mobile() && <PopUp popupData="device_mobile" />}
      <Router>
        <Route>
          <Switch>
            <Route exact path="/signUp" component={SignupWithLinkedIn} />
            <Route exact path="/auth-verify" component={AuthRedirect} />
            <PrivateRoute exact path="/" />
            <Layout>
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/followups" component={FollowUps} />
              <PrivateRoute exact path="/crm" component={Crm} />
              <PrivateRoute exact path="/strategy" component={Strategy} />
              <PrivateRoute exact path="/reporting" component={Reporting} />
              <PrivateRoute
                exact
                path="/followups/opportunityDetails/:id"
                component={OpportunityDetails}
              />
              <PrivateRoute exact path="/account" component={Account} />
            </Layout>
          </Switch>
        </Route>
      </Router>{' '}
    </div>
  );
}

export default App;
