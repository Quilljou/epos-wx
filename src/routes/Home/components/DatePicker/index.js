import { List, DatePicker} from 'antd-mobile';
import React from 'react';
import styles from './index.less'

export default function ReportPicker (props) {
  const { type, pickedDate, onChange } = props; // start, end;

  const PickerChildren = props => (
    <div
      onClick={props.onClick}
      className={styles.box}
    >
        <div>
          {props.extra}
        </div>
    </div>
  );

  return (
    <DatePicker
          mode="date"
          value={pickedDate}
          onChange={val => onChange(val,type)}
        >
        <PickerChildren extra={pickedDate}></PickerChildren>
    </DatePicker>
  )

}
