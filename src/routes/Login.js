import React from 'react';
import { connect } from 'dva';
import { List, InputItem, WhiteSpace, Button, WingBlank, Toast } from 'antd-mobile';
import Helmet from 'react-helmet';
import { createForm } from 'rc-form';
  // 50085401

// alert(document.documentElement.clientWidth)

function Login({dispatch,children, form}) {
    const { getFieldProps,getFieldDecorator, validateFields } = form;
    function onLogin() {
        validateFields(function(error,values){
            if(error) {
                return Toast.info('请填入必填项', 1);
            }
            dispatch({
                type: 'auth/login',
                payload: values
            })
        })
    }

    return (
        <div>
          <Helmet title="登录 | epos老板助手"/>

            <WhiteSpace size="lg"></WhiteSpace>
            <WhiteSpace size="lg"></WhiteSpace>
            <List>
              <InputItem
                {
                    ...getFieldProps('tenantCode', {
                        onChange(){}, // have to write original onChange here if you need
                        rules: [{required: true}],
                      })
                }
                clear
                placeholder="商户ID"
              >
                  <span style={{color:'red'}}>*</span> 商户ID
              </InputItem>
            </List>
            <WhiteSpace size="sm"></WhiteSpace>
            <List>
              <InputItem
                clear
                placeholder="用户ID"
                {
                    ...getFieldProps('userId', {
                        onChange(){},
                        rules: [{required: true}],
                      })
                }
              >
                  <span style={{color:'red'}}>*</span> 用户ID
              </InputItem>
            </List>
            <WhiteSpace size="sm"></WhiteSpace>
            <List>
              <InputItem
                {
                    ...getFieldProps('password', {
                        onChange(){}, // have to write original onChange here if you need
                        rules: [{required: true}],
                      })
                }
                clear
                placeholder="密码"
                type="password"
              ><span style={{color:'red'}}>*</span> 密码</InputItem>
            </List>
            <WhiteSpace size="lg"></WhiteSpace>
            <WingBlank size="md">
                <Button type="primary" onClick={onLogin}>登 录</Button>
            </WingBlank>

        </div>
    )
}

function mapStateToProps({auth}) {
    return {auth}
}

Login = createForm()(Login);

// export default Login;
//
export default connect(mapStateToProps)(Login)
// 只有connect之后routes组件才能拿到dispatch方法和state
