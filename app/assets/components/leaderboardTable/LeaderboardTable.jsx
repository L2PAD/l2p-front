import { useState, useEffect } from 'react'
import LeaderboardItem from '../leaderboardItem/LeaderboardItem'
import styles from './leader-table.module.scss'

export default function LeaderboardTable({list}) {    

  return (
    <div className={styles.table}>
        <div className={styles.head}>
            <span>Rank</span>
            <span>Address</span>
            <span>Total score</span>
        </div>
        <div className={styles.body}>
            {list.map((item,index) => {
                return <LeaderboardItem index={index} key={index} item={item}/>
            })}
        </div>
    </div>
  )
}
