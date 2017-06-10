import React from 'react';
import {connect} from 'dva';
import {Card, WingBlank, WhiteSpace, List, Button} from 'antd-mobile';
import title from '../../utils/title'
import Helmet from 'react-helmet';
import { hashHistory } from 'dva/router';
import styles from './index.less'

import { goTo } from '../../utils/util'

const Item = List.Item;

function Me({dispatch, app}) {
  let {user} = app;
  user = user || {};

  function onLogOut() {
    dispatch({type: 'auth/logOut'})
  }


  return (
    <div>
			<Helmet title={title.me}/>

      <WingBlank size="md">
        <WhiteSpace size="lg" />
            <div className={styles.user}>
              {/* <img src={require('../../assets/img/user.jpg')}> */}
              <img src="http://www.quilljou.com/tavatar/avatar?size=100&name=洪">
              </img>
              &nbsp;
              &nbsp;
              <span>{ user.name || '用户名'}</span>
            </div>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
      </WingBlank>

      <WingBlank size="lg">

        <List
          >
            <Item
              thumb={require('../../assets/img/machine.png')}
              arrow="horizontal"
              onClick={() => goTo('/machine')}
              >机器管理</Item>
        {/* </List>
        <List */}
          {/* > */}
            <Item
              thumb={require('../../assets/img/feedback.png')}
              arrow="horizontal"
              onClick={() => goTo('/feedback')}
              >我要反馈</Item>
        </List>

        <WhiteSpace size="lg" />

        <Button onClick={onLogOut} type="warning">退出登录</Button>
      </WingBlank>

              {/* <List>
                  <Item extra={user.address || '无'}>地址</Item>
              </List>
              <WhiteSpace size="xs" />
              <List>
                  <Item extra={user.code || '无'}>商户ID</Item>
              </List>
              <WhiteSpace size="xs" />
              <List>
                  <Item extra={user['created_at'] || '无'}>账号创建日期</Item>
              </List>
              <WhiteSpace size="xs" />
              <List>
                  <Item extra={user['expiredTime'] || '无'}>账号失效日期</Item>
              </List>
              <WhiteSpace size="xs" />
              <List>
                  <Item extra={user['validatePeriod'] ? user['validatePeriod']+'年' :'无'}>有效期</Item>
              </List>
              <WhiteSpace size="lg" /> */}




    </div>
  )
}

function mapStateToProps({app}) {
  return {app};
}

export default connect(mapStateToProps)(Me);
