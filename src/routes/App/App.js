import React from 'react';
import AppBar from './components/AppBar/AppBar';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import Helmet from 'react-helmet';


class App extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'app/queryMachine',
        });
    }

    componentWillUnmount () {
        console.log('App unmounted');
    }

    render() {
      const { dispatch, location, app, children}  = this.props;

      const { selectedBar, appBar } = app;


      const AppBarProps = {
          selectedBar,
          changeSelectedBar( selectedBar ) {
              // redux中没法操作router，暂时这里操作
              hashHistory.push(`/${selectedBar}`)
          }
      }

      return (
          <div>
              <div className="container">
                  {children}
              </div>
              {
                appBar
                  ?
                <AppBar {...AppBarProps}></AppBar>
                  :
                null
              }
          </div>
      )
    }

}

function mapStateToProps({app}) {
    return {app};
}

export default connect(mapStateToProps)(App);
