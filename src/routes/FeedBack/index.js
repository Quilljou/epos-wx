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
  Toast,
  TextareaItem
} from 'antd-mobile';

function UpdateMachine ({form, params}) {
  const { getFieldProps,getFieldDecorator, validateFields } = form;

  return (
    <div>
      <Helmet title={title.feedback}/>


      <WingBlank size="md">
        <WhiteSpace size="md"></WhiteSpace>
        <div style={{color: '#666'}}>填写您的意见</div>
        <WhiteSpace size="sm"></WhiteSpace>
        <TextareaItem
             {...getFieldProps('note3')}
             autoHeight
             placeholder="对于老板助手有什么想和我们说的"
              rows={5}
           />

        <WhiteSpace size="lg"></WhiteSpace>

        <Button type="primary" >发送</Button>
      </WingBlank>
    </div>
  )
}

UpdateMachine = createForm()(UpdateMachine);


function mapStateToProps({report, app}) {
  return {report, app};
}

export default connect(mapStateToProps)(UpdateMachine);
