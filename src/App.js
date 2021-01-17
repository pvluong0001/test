import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from '@pages/auth/Login';
import Admin from '@pages/layout/Admin';
import PrivateRoute from '@components/PrivateRoute';
import HashLoader from 'react-spinners/HashLoader';
import {connect} from 'react-redux';

function App({loading}) {
  return (
    <>
      {
        loading &&
        <div
          className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
            <span
              className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
              style={{top: '50%'}}>
              <HashLoader size={100} color={'#4C1D95'}/>
            </span>
        </div>
      }
      <Switch>
        {/*auth*/}
        <PrivateRoute path="/admin" component={Admin} />
        <Route path="/login" exact component={Login}/>
        <Redirect from="/" to="admin"/>
        <Redirect from="*" to="/"/>
      </Switch>
    </>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading
  }
}

export default connect(mapStateToProps)(App);
