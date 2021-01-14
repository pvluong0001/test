import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from '@pages/admin/Dashboard';
import Login from '@pages/auth/Login';

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" exact={true}>
          <Dashboard/>
        </Route>

        {/*auth*/}
        <Route path="/login" exact={true}>
          <Login/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
