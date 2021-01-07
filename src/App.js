import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
        <Router>
            <Route>
                   <h1>Client panel</h1>
            </Route>
        </Router>
    </div>
  );
}

export default App;
