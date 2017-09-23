import {Picker, List} from 'antd-mobile';
import React from 'react';
import styles from './index.less'

import arrowDown from '../../../../assets/img/arrow-down.png';

export default function MachinePicker (props) {
  let { machine,onChange,selectedMachine } = props;

  const temp = [];
  temp[0] = selectedMachine;

  const data = machine.map((item) => {
    let newItem = {};
    newItem.label = item.name;
    newItem.value = item.id;
    return newItem;
  });

  const PickerChildren = props => (
    <div
      onClick={props.onClick}
      className={styles.picker}
    >
      <img src={arrowDown} alt=""/>
      &nbsp;
      <div className={styles.extra}>{props.extra}</div>
    </div>
  );

  return (
    <Picker
      data={data}
      cols={1}
      value={temp}
      onChange= {(val) => onChange(val[0])}>
      <PickerChildren extra={selectedMachine}></PickerChildren>
    </Picker>
  )

}
