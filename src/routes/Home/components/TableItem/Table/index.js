import React from 'react';
import styles from './index.less'

export default function Table(props){
  const {
    columns,
    data
  } = props;
  console.log(columns,data);
  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        {
          columns.map((item,index) => {
            return (
              <div className={styles.th} key={index}>
                { item.title }
              </div>
            )
          })
        }
      </div>
      <div className={styles.tableBody}>
        {
          data.map((d,i) => {
            return (
              <div className={styles.tr} key={i}>
                {
                  columns.map((item,index) => {
                    return (
                      <div className={styles.td} key={index}>
                        { d[item.dataIndex] || 0}
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )

}
