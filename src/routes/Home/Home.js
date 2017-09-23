import React from 'react';
import {connect} from 'dva';
import Helmet from 'react-helmet';
import {WhiteSpace, WingBlank, Button} from 'antd-mobile';
import styles from './index.less'
import ListWarn from '../../components/ListWarn/'
import { getNow, goTo } from '../../utils/util'
import title  from '../../utils/title';
import MachinePicker from './components/MachinePicker/'
import DatePicker from './components/DatePicker/'
import DataBox from './components/DataBox/'
import ListItem from './components/ListItem/'
import CountAmount from './components/CountAmount/'
import DiscountItem from './components/DiscountItem/'
import moment from 'moment'
import TableItem from './components/TableItem/'



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
              <div className={styles.title}>总收入 <span className="unit">(元)</span></div>
              <div className={styles.amount}>
                <CountAmount end={tradeSum}></CountAmount>
              </div>
            </div>

            <div>
              <div className={styles.title}>单据数 <span className="unit">(笔)</span></div>
              <div className={styles.amount}>
                <CountAmount end={tradeQty} decimals={0}></CountAmount>
              </div>
            </div>

        </div>

        <div className={styles.second}>

            <div>
              <div className={styles.title}>退货金额 <span className="unit">(元)</span></div>
              <div className={styles.amount}>
                <CountAmount end={refundSum}></CountAmount>
              </div>
            </div>

            <div>
              <div className={styles.title}>退货数量</div>
              <div className={styles.amount}>
                <CountAmount end={refundQty} decimals={3}></CountAmount>
              </div>
            </div>

        </div>
      </div>
    )
  }


  renderContent = () => {
    const { machine, selectedMachine, start, end, payment, discount, cate, product } = this.props.app;
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

    // const data = [];
    // const makeRandomNumber = () => {
    //   return Math.floor(Math.random() * 200)
    // }
    // for (var i = 0; i < 2; i++) {
    //   data.push(
    //     {key: i, name: '湘菜', number:makeRandomNumber() , sum: makeRandomNumber(), refundQty: 3, refundSum: makeRandomNumber(), discountSum: 20, discountQty: makeRandomNumber(),percent: 40 },
    //   )
    // }

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
          <WhiteSpace size="md"></WhiteSpace>

          {this.renderConclusion()}


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


          <DataBox
            title="商品分类">
            <TableItem
              data={cate}
              type="cate"
            />
          </DataBox>

          <DataBox
            title="菜品排行">
            <TableItem
              data={product}
              ></TableItem>
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
      </div>
    )
  }
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Home);
