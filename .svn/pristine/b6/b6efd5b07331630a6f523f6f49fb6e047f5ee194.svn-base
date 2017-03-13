import React from 'react';
import styles from './rankbar.css'

export default function RankBar({item}) {

  return (
    <div className={styles.rank}>
      <div className={styles.name}>
          <span>{item.name}</span> ￥{item.price}
      </div>
      <div className={styles.bar}>
        <div style={{width: `${item.width}%`}} className={styles.inner}>
          <span >{ item.number }</span>
        </div>
      </div>
    </div>
  )
}
