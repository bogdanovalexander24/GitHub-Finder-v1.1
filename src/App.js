import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import User from './components/users/User';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

import GitHubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
  return (
    <GitHubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar tittle=' GitHub Finder' icon='fab fa-github' />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />} />
                <Route exact path='/about' component={About} />
                <Route
                  exact
                  path='/user/:login'
                  render={props => <User {...props} />}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GitHubState>
  );
};

export default App;
