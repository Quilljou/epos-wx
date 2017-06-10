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

function UpdateMachine ({form, params, dispatch}) {
  const { getFieldProps,getFieldDecorator, validateFields } = form;

  const handleSubmit = () => {
    validateFields((err, value) => {
      if(err || !value.name.trim().length) {
        return Toast.info('请填写完整!',2,null, false);
      };

      dispatch({
        type: 'app/updateMachine',
        payload: {name: value.name, id: params.id }
      })
    })
  }

  return (
    <div>
      <Helmet title={title.updateMachine}/>
      <List>
        <InputItem
          clear
          placeholder="请输入新的机器名"
          {
              ...getFieldProps('name', {
                  onChange(){},
                  rules: [{required: true}],
                })
          }
        >
            <span style={{color:'red'}}>*</span> 新机器名
        </InputItem>
      </List>
      <div className={styles.hint}>
        通过给收银机设置名称，可以方便你识别不同的收银机
      </div>

      <WhiteSpace size="lg"></WhiteSpace>

      <WingBlank>
        <Button type="primary" onClick={handleSubmit}>确定</Button>
      </WingBlank>
    </div>
  )
}

UpdateMachine = createForm()(UpdateMachine);


function mapStateToProps({report, app}) {
  return {report, app};
}

export default connect(mapStateToProps)(UpdateMachine);
