import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import TestPage from './containers/TestPage';
import CalculatorPage from './containers/CalculatorPage';

export default () => (
  <App>
    <Switch>
      <Route exact path={routes.HOME} component={HomePage} />
      <Route path={routes.TEST} component={TestPage} />
      <Route path={routes.COUNTER} component={CounterPage} />
    </Switch>
  </App>
);
