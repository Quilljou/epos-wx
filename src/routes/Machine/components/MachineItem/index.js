import React from 'react';
import {connect} from 'dva';
import {Card, WingBlank, WhiteSpace, Icon, Popover, List, Modal} from 'antd-mobile';
import Helmet from 'react-helmet';
import { goTo } from '../../../../utils/util'
import styles from './index.less';

const Item = Popover.Item;
const alert = Modal.alert;


class MachineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popOverVisible: false,
    }
  }

  handleVisibleChange = (popOverVisible) => {
   this.setState({
    popOverVisible
   });
  }

  handleClickPopOver = (event) => {
    event.stopPropagation();
    this.toggle(true);
  }

  toggle(bool) {
    this.setState({
      popOverVisible: bool
    })
  }

  goTop = (id) => {

  }
  handleSelect = (node,index) => {
    const {
      id,
      dispatch
    } = this.props;

    this.toggle(false); // 关闭popover

    switch (node.key) {
      case 'pwd':
        goTo(`/machine/pwd/${id}`)
        break;
      case 'name':
        goTo(`/machine/update/${id}`)
        break;
      case 'top':
        dispatch({
          type: "app/goTop",
          payload: { id }
        })
        break;
      case 'delete':
        alert('删除', '确定删除么?', [
          { text: '取消', onPress: () => null },
          { text: '确定', onPress: () => {
            dispatch({
              type: "app/deleteMachine",
              payload: { id }
            })
          }, style: { fontWeight: 'bold' } },
        ])
    }
  }

  render () {
    const {
      name,
      id,
    } = this.props;


    return (
      <div className={styles.machineItem}>
        <Popover
              mask
              visible={this.state.popOverVisible}
              onSelect={this.handleSelect}
              onVisibleChange={this.handleVisibleChange}
              overlay={[
                (<Item key="delete"
                  icon={
                    <Icon type={require('!svg-sprite!../../../../assets/img/delete.svg')} />}
                  >
                    删除
                  </Item>),
                (<Item key="pwd"
                  icon={<Icon type={require('!svg-sprite!../../../../assets/img/password.svg')} size="xs"/>}
                  >
                   改密
                 </Item>),
                 (<Item key="name"
                   icon={<Icon type={require('!svg-sprite!../../../../assets/img/edit.svg')} size="xs"/>}
                   >
                    改名
                  </Item>),
                  (<Item key="top"
                    icon={<Icon type={require('!svg-sprite!../../../../assets/img/top.svg')} size="xs"/>}
                    >
                     置顶
                   </Item>)
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
              }}
            >
              <div className={styles.iconWrap} onClick={this.handleClickPopOver}>
                <img src={require('../../../../assets/img/ellipsis.svg')} alt=""/>
              </div>
            </Popover>
        <div className={styles.name}>
          {name}
        </div>
        <div className={styles.id}>
          {id}
        </div>
      </div>
    )
    }
}

function mapStateToProps({app}) {
  return {app};
}

export default connect(mapStateToProps)(MachineItem);
