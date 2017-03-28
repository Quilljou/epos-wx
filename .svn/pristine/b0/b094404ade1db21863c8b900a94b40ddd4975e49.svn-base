import React from 'react';
import { connect } from 'dva';
import Helmet from 'react-helmet';
import DataBox from '../components/DataBox';
import BranchPicker from '../components/BranchPicker'
import { Carousel, WhiteSpace, WingBlank  } from 'antd-mobile';
import ListWarn from '../components/ListWarn'
import ItemHead from '../components/ItemHead'
import styles from './main.css';
import ItemList from '../components/ItemList';
import RankBar from '../components/RankBar';
import { betweenToday } from '../utils/util'
import title  from '../utils/title';
import { today } from '../utils/constant'


class Home extends React.Component{


    componentDidMount() {
        const { dispatch, home} = this.props;
        let { branchId } = home;
        dispatch({
          type: 'home/query',
          payload: {
            branchId,
            ...today
          }
        })
    }

    componentWillUnmount() {
      console.log('home is unmounted' );
    }


    render () {
        const { dispatch, children, home, app } = this.props;

        let { basic, income, dishes, branchId , branches} = home;

        dishes = cookDish(dishes);

        function cookDish(dishes) {
          var total = 0;
          dishes.forEach((dish)=> {
            total +=  parseInt(dish.number,10);
          })

          dishes = dishes.map(function(item){
            var width = (parseInt(item.number,10) / total * 100).toFixed(0);
            // percentage
            item.number = parseInt(item.number,10);
            return Object.assign(item,{width});
          })
          return dishes;
        }

        const BranchPickerProps = {
            branchId,
            branches,
            onChangeBranch (branchId) {
                dispatch({
                    type: 'home/changeBranch',
                    payload: {
                      branchId
                    }
                })
                dispatch({
                    type: 'home/query',
                    payload: {
                      ...today,
                      branchId
                    }
                })
            }
        }


        return (
            <div>
                <Helmet title={title.home}/>

                <Carousel
                    autoplay={true}
                    autoplayInterval={5000}
                    dots = {false}
                    infinite>
                    <DataBox
                        title="总收入(元)"
                        amount={basic.amount}
                        className={styles.boxOne}/>
                    <DataBox
                        title="实际收入(元)"
                        amount={basic.income}
                        className={styles.boxTwo}/>
                    <DataBox
                        title="订单数(笔)"
                        amount={basic.orderNumber}
                        unit= " "
                        className={styles.boxThree}/>
                </Carousel>

                <BranchPicker {...BranchPickerProps}></BranchPicker>

                <WingBlank size="sm">


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

                </WingBlank>
            </div>
        )
    }
}


function mapStateToProps({home,app}) {
    return  { home, app };
}

export default connect(mapStateToProps)(Home);
