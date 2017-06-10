import React from 'react';
import Helmet from 'react-helmet';
import title from '../../utils/title'
import {connect} from 'dva';
import { createForm } from 'rc-form';

import styles from './index.less'

import {
  List,
  InputItem,
  WhiteSpace,
  Button,
  WingBlank,
  Toast
} from 'antd-mobile';

function newMachine ({form, dispatch, app}) {
  const { getFieldProps,getFieldDecorator, validateFields } = form;
  const { machine } = app;

  const handleSubmit = () => {
    validateFields((err, value) => {
      let isRepeat;
      let isEmpty;


      if(err) {
        return Toast.info('请填写完整!',2,null, false);
      };

      for (let item in value) {
        if(!value[item].trim().length)  isEmpty = true;
      }

      if(isEmpty) {
        return Toast.info('请填写完整!',2,null, false);
      };

      machine.forEach(item => {
        if(item.id === value.id) {
          isRepeat = true;
          return Toast.info('该机器ID已经被添加!',2,null, false);
        }
        if(item.name === value.name) {
          isRepeat = true;
          return Toast.info('该机器名已经存在!',2,null, false);
        }
      })

      if(isRepeat) return;

      dispatch({
        type: 'app/addMachine',
        payload: value
      })
    })
  }

  return (
    <div >
      {/* <WhiteSpace size="lg"></WhiteSpace> */}
      <Helmet title={title.newMachine}/>
      <List>
        <InputItem
          clear
          placeholder="请输入机器ID"
          {
              ...getFieldProps('id', {
                  onChange(){},
                  rules: [{required: true}],
                })
          }
        >
            <span style={{color:'red'}}>*</span> 机器ID
        </InputItem>
      </List>
      <List>
        <InputItem
          clear
          placeholder="请输入机器名称"
          {
              ...getFieldProps('name', {
                  onChange(){},
                  rules: [{required: true}],
                })
          }
        >
            <span style={{color:'red'}}>*</span> 机器名
        </InputItem>
      </List>
      <List>
        <InputItem
          clear
          placeholder="请输入对应机器的密码"
          {
              ...getFieldProps('password', {
                  onChange(){},
                  rules: [{required: true}],
                })
          }
        >
            <span style={{color:'red'}}>*</span> 密码
        </InputItem>
      </List>
      <WingBlank>
        <ul className={styles.hint}>
          <li>账号密码只会保存到您的手机</li>
          <li>设置机器名为你更好辨识机器</li>
        </ul>
      </WingBlank>
      <WingBlank>
        <Button type="primary" onClick={handleSubmit}>添加</Button>
      </WingBlank>
    </div>
  )
}

newMachine = createForm()(newMachine);


function mapStateToProps({app}) {
  return {app};
}

export default connect(mapStateToProps)(newMachine);
