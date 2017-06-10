import {Picker, List} from 'antd-mobile';
import React from 'react';
import styles from './index.less'

import arrowDown from '../../../../assets/img/arrowDown.svg';

export default function MachinePicker (props) {
  let { title, children } = props;

  return (
    <div className={styles.dataBox}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
