import React from 'react';
import styles from './itemlist.css'
import {cookData} from '../utils/util';


export default function ItemList({item}) {
    cookData(item)

    return (
        <div className={styles.list} >
              <div className={styles.logo}>
                  <img src={item.icon}></img>
                  <div className={styles.name}>
                      {item.name}
                  </div>
              </div>



                <div className={styles.content}>
                  <span className="yuan">￥</span>
                  {item.amount}
                </div>
            </div>
    )
}
