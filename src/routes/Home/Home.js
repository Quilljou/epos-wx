import React from 'react';
import {connect} from 'dva';
import Helmet from 'react-helmet';
// import DataBox from '../components/DataBox';
// import BranchPicker from '../components/BranchPicker'
import {WhiteSpace, WingBlank, Button} from 'antd-mobile';
import styles from './index.less'
import ListWarn from '../../components/ListWarn/'
// import ItemHead from '../components/ItemHead'
// import styles from './main.css';
// import ItemList from '../components/ItemList';
// import RankBar from '../components/RankBar';
import { getNow, goTo } from '../../utils/util'
import title  from '../../utils/title';
// import { today } from '../utils/constant'
import MachinePicker from './components/MachinePicker/'
import DatePicker from './components/DatePicker/'
import DataBox from './components/DataBox/'
import ListItem from './components/ListItem/'
import CountAmount from './components/CountAmount/'
import DiscountItem from './components/DiscountItem/'
import moment from 'moment'






class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch, app } = this.props;
    const { machine } = app;

    if(machine.length) {
      dispatch({
        type: 'app/queryData',
        payload: {}
      })
    }
  }

  componentWillUnmount() {
  }


  renderNoRecords = () => {
    return (
      <div className={styles.noMachine}>
        <p>老板，你还没有添加机器哦~</p>
        <Button type="primary" inline="true" onClick={() => goTo('/machine/new')}>点击添加</Button>
      </div>
    )
  }

  renderConclusion = () => {
    const { tradeSum, tradeQty, refundSum, refundQty} = this.props.app;
    return (
      <div className={styles.conclusion}>
        <div className={styles.total}>

            <div>
              <div className={styles.title}>总收入 <span className={styles.unit}>(元)</span></div>
              <div className={styles.amount}>
                <CountAmount end={tradeQty}></CountAmount>
              </div>
            </div>

            <div>
              <div className={styles.title}>订单数 <span className={styles.unit}>(笔)</span></div>
              <div className={styles.amount}>
                <CountAmount end={tradeSum}></CountAmount>
              </div>
            </div>

        </div>

        <div className={styles.second}>

            <div>
              <div className={styles.title}>退单额 <span className={styles.unit}>(元)</span></div>
              <div className={styles.amount}>
                <CountAmount end={refundSum}></CountAmount>
              </div>
            </div>

            <div>
              <div className={styles.title}>退单数 <span className={styles.unit}>(笔)</span></div>
              <div className={styles.amount}>
                <CountAmount end={refundQty}></CountAmount>
              </div>
            </div>

        </div>
      </div>
    )
  }


  renderContent = () => {
    const { machine, selectedMachine, start, end, payment, discount } = this.props.app;
    const { dispatch } = this.props;

    const MachinePickerProps = {
      machine,
      onChange: (selectedMachine) => {
        dispatch({
          type: 'app/queryData',
          payload: { id: selectedMachine }
        })
      },
      selectedMachine
    }

    const startPickerProps = {
      type: "start",
      pickedDate: start,
      onChange(val) {
        dispatch({
          type: 'app/queryData',
          payload: { start: val }
        })
      }
    }

    const endPickerProps = {
      type: "end",
      pickedDate: end,
      onChange(val) {
        dispatch({
          type: 'app/queryData',
          payload: { end: val }
        })
      }
    }


    return (
      <div>
        <Helmet title={title.home}/>
        <div className={styles.header}>
          <MachinePicker {...MachinePickerProps}></MachinePicker>
          <div className={styles.pickerContainer}>
            <DatePicker {...startPickerProps}></DatePicker>
            至
            <DatePicker {...endPickerProps}></DatePicker>
          </div>
        </div>

        <WingBlank
          size="lg">
          <WhiteSpace size="lg"></WhiteSpace>

          {this.renderConclusion()}

          <WhiteSpace size="lg"></WhiteSpace>
          <WhiteSpace size="lg"></WhiteSpace>

          <DataBox
            title="支付方式">
            {
              payment.length
                ?
              payment.map( (item,index) => {
                return (
                  <ListItem item={item} key={index}></ListItem>
                )
              })
                :
              <ListWarn></ListWarn>
            }
          </DataBox>

          <WhiteSpace size="lg"></WhiteSpace>
          <WhiteSpace size="lg"></WhiteSpace>

          <DataBox
            title="折扣">
            {
              discount.length
                ?
              discount.map((item,index) => {
                return <DiscountItem {...item} key={index}></DiscountItem>
              })
                :
              <ListWarn></ListWarn>

            }
          </DataBox>

          <WhiteSpace size="sm"></WhiteSpace>
        </WingBlank>

      </div>
    )
  }


  render() {
    const { machine } = this.props.app;

    return (
      <div className={styles.reportPage}>
        {/* <Helmet title={title.home}/> */}
				{
					machine.length
						?
					this.renderContent()
						:
					this.renderNoRecords()
				}

        {/* <BranchPicker {...BranchPickerProps}></BranchPicker> */}

        {/* <WingBlank size="sm">

                    <ItemHead title="支付方式统计" icon={require( '../assets/img/wallet.png')}></ItemHead>
                    {income.length
                        ?
                        income.map( (item, index) => {
                            return <ItemList {...{item}} key={index}></ItemList>
                        })
                        :
                        <ListWarn style={{borderColor: '#ddd'}}></ListWarn>
                    }


                    <ItemHead title="菜品排行(份)" icon={require( '../assets/img/plate.png')}></ItemHead>
                    {dishes.length
                        ?
                        dishes.map( (item,index) =>
                         <RankBar {...{item}} key={index}></RankBar>)
                        :
                        <ListWarn style={{borderColor: '#ddd'}}></ListWarn>
                    }

                </WingBlank> */}
      </div>
    )
  }
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Home);
