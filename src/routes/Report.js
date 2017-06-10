import React from 'react';
import { connect } from 'dva';
import Helmet from 'react-helmet';
import title from '../utils/title';


import BranchPicker from '../components/BranchPicker'
import { DatePicker, List, WingBlank, WhiteSpace } from 'antd-mobile';
import Checkout from '../components/Checkout';
import styles from './main.css';
import ListWarn from '../components/ListWarn';
import { cookData, betweenToday } from '../utils/util';
import ReportPicker from '../components/ReportPicker'


class Report extends React.Component {

	componentDidMount() {
		const { dispatch, report } = this.props;
		const {  branchId } = report;

		dispatch({
			type: 'report/query',
			payload: {
				branchId
			}
		})
	}

	render() {
		const { dispatch, children, report } = this.props;
		const { time, records, branches, branchId } = report;

	    const BranchPickerProps = {
	        onChangeBranch (branchId) {
						dispatch({
							type: 'report/changeBranch',
							payload: {branchId}
						});

						dispatch({
							type: 'report/query',
							payload: {branchId}
						});
	        },
	        branches,
					branchId
	    }


			const StartReportPicker = {
				value: time.start,
				onChange (start) {
					dispatch({
						type: 'report/changeTime',
						payload: {
							start
						}
					});

					dispatch({
						type: 'report/query'
					});
				}
			}


			const EndReportPicker = {
				value: time.end,
				onChange (end) {
					dispatch({
						type: 'report/changeTime',
						payload: {
							end
						}
					})

					dispatch({
						type: 'report/query'
					})
				}
			}

			function totalPrice() {
				let ret = 0;
				records.forEach((item) => {
					ret += parseFloat(item.totalPrice,10);
				})
				return ret;
			}

			const CheckoutProps = {
				totalPrice: totalPrice()
			}

	    return (
	        <div>
						<Helmet title={title.report}/>

	            <BranchPicker {...BranchPickerProps}></BranchPicker>

							<WhiteSpace size="lg"></WhiteSpace>
							<div className={styles.picker}>
								<ReportPicker {...StartReportPicker}>
								</ReportPicker>
								-
								<ReportPicker {...EndReportPicker} ></ReportPicker>
							</div>

							<WhiteSpace size="lg"></WhiteSpace>
	            <WhiteSpace size="lg"></WhiteSpace>

	            <div className={styles.list + ' ' + styles.listTitle}>
	                <div>支付方式</div>
	                <div>订单数</div>
	                <div>总金额</div>
	            </div>

							{records.length
								?
								records.map( (item,index) => {
										cookData(item);
										return (
												<div className={styles.list} key={index}>
														<div><img src={item.icon} />{item.name}</div>
														{/* <div>{item.amount}</div> */}
														<div><span className="yuan">￥</span> {item.totalPrice}</div>
												</div>
										)
								})
								:
								<WingBlank size="sm">
		                <ListWarn
											style={{borderColor: '#ddd', borderTop: 'none'}}>
										</ListWarn>
		            </WingBlank>
							}


	            <Checkout {...CheckoutProps}></Checkout>
	        </div>
	    )
	}

}

function mapStateToProps({report,app}) {
    return  { report, app };
}

export default connect(mapStateToProps)(Report);
