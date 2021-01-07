import React from 'react';
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom';
import './App.css';
import Layout from "./components/commonComponents/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";


function App() {
  return (
    <div className="App">
      <Router>
        <Route>
            <Switch>
                <Layout>
                   <Route exact path='/' component={Dashboard}/>
                </Layout>
            </Switch>

        </Route>
      </Router>
    </div>
  );
}

export default App;
