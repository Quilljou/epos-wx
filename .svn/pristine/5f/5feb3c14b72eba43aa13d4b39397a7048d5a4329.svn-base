import React from 'react';
import styles from './databox.css'


export default function DataBox({title,unit,className,amount}) {

    return (
        <div className={`${styles.box} ${className}`} >
               <div className={styles.title}>{title}</div>
                 <div className={styles.content}>
                   <div className="table-cell">
                     <span className="yuan text-white">{unit || '￥'} </span>
                     <span className={styles.amount}>{amount || 0}</span>
                 </div>
             </div>
         </div>
    )
}
