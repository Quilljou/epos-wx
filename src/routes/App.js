import React from 'react';
import AppBar from '../components/layout/AppBar';
import { connect } from 'dva';
import { hashHistory } from 'dva/router'
import Helmet from 'react-helmet';


class App extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        console.log('App mounted');
        dispatch({
            type: 'home/queryBranch'
        })

        dispatch({
            type: 'report/queryBranch'
        })

        dispatch({
            type: 'app/queryUser'
        })

    }

    componentWillUnmount () {
        console.log('App unmounted');
        // const { dispatch } = this.props;
        //
        // dispatch({
        //     type: 'app/changeSelectedBar',
        //     payload: {
        //       selectedBar: 'home'
        //     }
        // })
    }

    render() {
      const { dispatch, location, app, children}  = this.props;

      const { selectedBar } = app;


      const AppBarProps = {
          selectedBar,
          changeSelectedBar( selectedBar ) {
              // redux中没法操作router，暂时这里操作
              hashHistory.push(`/${selectedBar}`)
            //   dispatch({
            //       type: 'app/changeSelectedBar',
            //       payload: {
            //           selectedBar
            //       }
            //   })
          }
      }

      return (
          <div>
              <div className="container">
                  {children}
              </div>
              <AppBar {...AppBarProps}></AppBar>
          </div>
      )
    }

}

function mapStateToProps({app}) {
    return {app};
}

export default connect(mapStateToProps)(App);
