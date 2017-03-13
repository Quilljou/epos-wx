import React from 'react';
import {DatePicker, WingBlank, WhiteSpace} from 'antd-mobile';
import styles from './reportpicker.css'
import { getNow } from '../utils/util';
// import moment from 'moment';


export default function ReportPicker ({ value, onChange }){

  const Children = props => {
    return (
      <div
        onClick={props.onClick} className={styles.box}>
        <img src={require('../assets/img/calender.png')}></img>
        <span>{props.extra}</span>
      </div>
    )
  }

    return (
      <DatePicker
        mode="date"
        value = {value}
        onChange = {(val) => onChange(val)}>
        <Children></Children>
      </DatePicker>
    )
}
