import React from 'react';
import { TabBar, Icon } from 'antd-mobile';
import  { hashHistory } from 'dva/router'
const TabBarItem = TabBar.Item;
import styles from './appbar.css'

function AppBar ({
    selectedBar,
    changeSelectedBar
}) {
    return (

        <TabBar
           unselectedTintColor="#949494"
           tintColor="#26e89a"
           barTintColor="white"
         >
            <TabBarItem
               title="报表"
               key="home"
               selected = {selectedBar === 'home'}
               onPress = { () => changeSelectedBar('home') }
               icon={<img
                   className={styles.icon}
                    src={require('../../assets/img/data.png')} alt=""/>}
               selectedIcon={<img
                   className={styles.icon}
                    src={require('../../assets/img/data-selected.png')} alt=""/>}
               data-seed="logId">
            </TabBarItem>

            <TabBarItem
             title="我的"
             key="me"
             selected = {selectedBar === 'me'}
             onPress = { () => changeSelectedBar('me') }
             icon={<img
                 className={styles.icon}
                  src={require('../../assets/img/account.png')} alt=""/>}
             selectedIcon={<img
                 className={styles.icon}
                  src={require('../../assets/img/account-selected.png')} alt=""/>}
             data-seed="logId">
            </TabBarItem>
         </TabBar>
    )

}

export default AppBar;
