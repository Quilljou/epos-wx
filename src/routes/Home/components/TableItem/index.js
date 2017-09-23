import React from 'react';
import styles from './index.less'
import { Accordion, Pagination }  from 'antd-mobile';
import Table from './Table/'
import ListWarn from '../../../../components/ListWarn/'


export default class TableItem extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      cursor: 0,
      total: 0
    }
  }

  perPage = 5;


  getSlicedData = () => {
    let data = this.props.data;
    let perPage = this.perPage;
    let cursor = this.state.cursor;
    return data.slice(cursor * perPage, cursor * perPage + perPage);
  }

  onChange = (e) => {
    this.setState({
      cursor: e
    })
  }

  componentWillReceiveProps(nextProps) {
    const total = Math.ceil(nextProps.data.length / this.perPage);
    this.setState({
      total
    })
  }

  getColumns() {
    let type = this.props.type;
    let columns = [
      { title: '数量', dataIndex: 'number', key: 'title', width: '1rem'},
      { title: '退货数量', dataIndex: 'refundqty', key: 'a', width: '1rem' },
      { title: '退货额', dataIndex: 'refundsum', key: 'b', width: '1rem' },
      { title: '折扣次数', dataIndex: 'discountqty', key: 'c', width: '1rem' },
      { title: '折扣额', dataIndex: 'discountsum', key: 'e', width: '1rem' },
    ];
    if(type == 'cate') { // 分类
      columns = columns.concat([
        { title: '百分比', dataIndex: 'percent', key: 'd', width: '1rem' }
      ])
    }
    return columns;
  }

  render() {
    const data = this.getSlicedData();
    const content = null;

    return (
      <div>
        <Accordion
          accordion
          openAnimation={{}}
          >
            {
              this.props.data.length
              ?
              data.map((item,index) => {
                  return (
                      <Accordion.Panel key={index} header={
                        <span>
                          {item.name}
                          &nbsp;
                          &nbsp;
                          <span className="money">
                            <span className="unit">￥</span>
                            &nbsp;
                            {item.sum}
                          </span>
                        </span>
                      }>
                        <Table
                          columns={this.getColumns()}
                          data={[item]}
                        />
                      </Accordion.Panel>
                  )
                })
                :
                <ListWarn></ListWarn>
            }

        </Accordion>
        {
          this.props.data.length
          ?
          <Pagination className={styles.pagi} total={this.state.total} current={this.state.cursor} onChange={this.onChange} />
          :
          null
        }
      </div>
    )
  }
}
