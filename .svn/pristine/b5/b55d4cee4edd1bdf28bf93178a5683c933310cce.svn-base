import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'dva/router';
import  App   from './routes/App';
import  Home   from './routes/Home';
import  Login   from './routes/Login';
import  Me   from './routes/Me';
import  Report   from './routes/Report';
import Auth from './utils/auth'
import NotFound from './routes/NotFound'

function requireAuth () {
    if(!Auth.isLoggedIn()) {
      hashHistory.push('/login');
    }
}


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} onEnter={requireAuth}>
          <IndexRedirect to="home"></IndexRedirect>
          <Route path="home" component={Home} onEnter={requireAuth}></Route>
          <Route path="report" component={Report} onEnter={requireAuth}></Route>
          <Route path="me" component={Me} onEnter={requireAuth}></Route>
      </Route>
      <Route path="/login" component={Login} ></Route>
      <Route path="*" component={NotFound} ></Route>
    </Router>
  );
}

export default RouterConfig;
