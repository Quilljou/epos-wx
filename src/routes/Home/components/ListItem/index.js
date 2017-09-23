import React from 'react';
import styles from './itemlist.css'
import {cookData} from '../../../../utils/util';

export default function ListItem({item}) {
  cookData(item)

  return (
    <div className={styles.list}>
      <div className={styles.logo}>
        <img src={item.icon}></img>
        <div className={styles.name}>
          <div>
            {item.name}
          </div>
          <div>
            {item.number}
            <span className="unit">(次)</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className="money">
          <span className="unit">￥</span>
          {item.sum}
        </div>
      </div>
    </div>
  )
}
