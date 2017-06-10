import React from 'react';
import Helmet from 'react-helmet';
import title from '../../utils/title'
import {connect} from 'dva';
import { createForm } from 'rc-form';

import {
  List,
  InputItem,
  WhiteSpace,
  Button,
  WingBlank,
  Toast
} from 'antd-mobile';

function MachinePwd ({form, params, dispatch }) {
  const { getFieldProps,getFieldDecorator, validateFields } = form;
  const handleSubmit = () => {
    validateFields((err, value) => {
      if(err) {
        return Toast.info('请填写完整!',2,null, false);
      };

      // if(value.password !== value.newPassword) {
      //   return Toast.info('两次输入的密码不一致!',2,null, false);
      // }

      dispatch({
        type: 'app/updateMachine',
        payload: {password: value.password, id: params.id }
      })
    })
  }
  return (
    <div size="md">
      <Helmet title={title.machinePwd}/>
      <List>
        <InputItem
          clear
          placeholder="请输入新密码"
          {
              ...getFieldProps('password', {
                  onChange(){},
                  rules: [{required: true}],
                })
          }
        >
            <span style={{color:'red'}}>*</span> 新密码
        </InputItem>
      </List>
      {/* <List>
        <InputItem
          clear
          type="password"
          placeholder="请再输入一次新密码"
          {
              ...getFieldProps('newPassword', {
                  onChange(){

                  },
                  rules: [{required: true}],
                })
          }
        >
            <span style={{color:'red'}}>*</span> 确认密码
        </InputItem>
      </List> */}

      <WhiteSpace size="lg"></WhiteSpace>

      <WingBlank>
        <Button type="primary" onClick={handleSubmit}>修改</Button>
      </WingBlank>
    </div>
  )
}

MachinePwd = createForm()(MachinePwd);


function mapStateToProps({report, app}) {
  return {report, app};
}

export default connect(mapStateToProps)(MachinePwd);
