import React from 'react';
import { connect } from 'dva';
import styles from './main.css'
import { Card, WingBlank, WhiteSpace, List, Button } from 'antd-mobile';
import title from '../utils/title'
import Helmet from 'react-helmet';


const Item = List.Item;

function Me({dispatch, app}) {
    const { user } = app;
    function onLogOut() {
        dispatch({
            type: 'auth/logOut'
        })
    }


    return (
        <div>
          <Helmet title={title.me}/>

            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                    <div className={styles.user}>
                        <img src={require('../assets/img/user.jpg')}>
                      </img>
                      &nbsp;
                      &nbsp;
                      <span>{ user.name || '无'}</span>
                    </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />

              </WingBlank>

              <List>
                  <Item extra={user.address || '无'}>门店地址</Item>
              </List>
              <WhiteSpace size="xs" />
              <List>
                  <Item extra={user.code || '无'}>商户ID</Item>
              </List>
              <WhiteSpace size="xs" />
              <List>
                  <Item extra={user['created_at'] || '无'}>创建日期</Item>
              </List>
              <WhiteSpace size="lg" />


              <WingBlank size="lg">
                    <Button onClick={onLogOut} type="warning">退出登录</Button>
              </WingBlank>

        </div>
    )
}


function mapStateToProps({app}) {
    return { app };
}

export default connect(mapStateToProps)(Me);
