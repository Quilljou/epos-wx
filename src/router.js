import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'dva/router';
import  App   from './routes/App/App';
import  Home   from './routes/Home/Home';
// import  Me   from './routes/Me/Me';
// import Auth from './utils/auth'
import NotFound from './routes/NotFound/NotFound'
import Machine from './routes/Machine/'
import NewMachine from './routes/NewMachine/'
import UpdateMachine from './routes/UpdateMachine/'
import MachinePwd from './routes/MachinePwd/'
// import FeedBack from './routes/FeedBack/'

// import  Login   from './routes/Login';
// import  Report   from './routes/Report';

// function requireAuth () {
//     if(!Auth.isLoggedIn()) {
//       hashHistory.push('/login');
//     }
// }


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} >
          <IndexRedirect to="home"></IndexRedirect>
          <Route path="home" component={Home}></Route>
          {/* <Route path="me" component={Me}></Route> */}
          {/* <Route path="feedback" component={FeedBack}></Route> */}
          <Route path="machine" component={Machine}></Route>
          <Route path="machine/new" component={NewMachine}></Route>
          <Route path="machine/update/:id" component={UpdateMachine}></Route>
          <Route path="machine/pwd/:id" component={MachinePwd}></Route>
      </Route>
      {/* <Route path="/login" component={Login} ></Route> */}
      <Route path="*" component={NotFound} ></Route>
    </Router>
  );
}

export default RouterConfig;
