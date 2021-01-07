import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Notifications from 'react-notify-toast';
import Layout from './components/commonComponents/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import LoginPage from './components/authentication/login-page/LoginPage';

function App() {
  return (
    <div className="App">
      <Notifications />
      <Router>
        <Route>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Layout>
              <Route exact path="/" component={Dashboard} />
            </Layout>
          </Switch>
        </Route>
      </Router>
    </div>
  );
}

export default App;
