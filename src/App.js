import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Notifications from 'react-notify-toast';
import Layout from './components/commonComponents/layout/Layout';
import Home from './components/dashboard/Home';
import LoginPage from './components/authentication/login-page/LoginPage';
import FollowUps from './components/dashboard/follow-ups/FollowUps';
import Crm from './components/dashboard/crm/CRM';
import Reporting from './components/dashboard/reporting/Reporting';

function App() {
  return (
    <div className="App">
      <Notifications />
      <Router>
        <Route>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Layout>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/followUps" component={FollowUps} />
              <Route exact path="/crm" component={Crm} />
              <Route exact path="/reporting" component={Reporting} />
            </Layout>
          </Switch>
        </Route>
      </Router>
    </div>
  );
}

export default App;
