import React from 'react';
import styles from './index.less'

export default function DiscountItem(props) {
  const { name, number, sum } = props;

  return (
    <div className={styles.list}>
      <div className={styles.left}>
        <div className={styles.name}>
          { name }
        </div>
        <div className={styles.count}>
          { number } (次)
        </div>
      </div>

      <div className={styles.right}>
        <span className="yuan">￥</span>
        { sum }
      </div>
    </div>
  )
}
