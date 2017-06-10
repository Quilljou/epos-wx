import React from 'react';
import {connect} from 'dva';
import { WingBlank, WhiteSpace, List, Button, Icon} from 'antd-mobile';
import title from '../../utils/title'
import { goTo } from '../../utils/util'
import Helmet from 'react-helmet';
import ListWarn from '../../components/ListWarn/'
import styles from './index.less';
import MachineItem from './components/MachineItem/'
const Item = List.Item;


function Machine({dispatch, app}) {
  const { machine } = app;

  return (
    <div>
			<Helmet title={title.machine}/>
      {/* <NavBar leftContent="back"
        mode="light"
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >
      </NavBar> */}

      <WhiteSpace></WhiteSpace>
      <WingBlank size="md">
        {
          machine.length
            ?
          machine.map((item,index) => {
            return (
              <MachineItem {...item} key={index} onClick={() => goTo('/machine/new')}></MachineItem>
            )
          })
            :
            (
              <div>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <ListWarn></ListWarn>
              </div>
            )
        }
        <div className={styles.newMachineWrapper}>
          <p className={styles.newMachine} onClick={() => goTo('/machine/new')}>点击添加新机器</p>
        </div>
      </WingBlank>
    </div>
  )
}

function mapStateToProps({app}) {
  return {app};
}

export default connect(mapStateToProps)(Machine);
