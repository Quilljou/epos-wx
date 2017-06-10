import {Picker, List} from 'antd-mobile';
import React from 'react';

export default function BranchPicker (props) {
  let { branches,branchId, onChangeBranch } = props;


  const temp = [];
  temp[0] = branchId;


    const data = branches.map((item) => {
      let newItem = {};
      newItem.label = item.name;
      newItem.value = item.id;
      return newItem;
    });

    return (
      <Picker
        data={data}
        cols={1}
        value={temp}
        onChange= {(val) => onChangeBranch(val[0])}>
        <List.Item arrow="horizontal">选择门店</List.Item>
      </Picker>
    )

}
