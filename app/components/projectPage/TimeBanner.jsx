import {useSelector} from 'react-redux'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import useTimer from '../../hooks/useTimer'
import styles from '../styles/time-banner.module.scss'

const TimeBanner = ({steps,date,time}) => {
    const isAuth = useSelector((state) => state.auth.userData?.isAuth)
    const {days,hours,minutes,seconds} = useTimer(date,time)
 
  return (
    <div className={styles.wrapper}>
        <div className={styles.body}>
            <div className={styles.title}>
                BeFi Labs IDO registration ends in:
            </div>
            <div className={styles.date}>
                {days}d {hours}h {minutes}m {seconds}s
            </div>   
            {
                isAuth
                ?
                <></>  
                :
                <SquareBtn text={'Connect wallet'}/>   
            }
        </div>
        <div className={styles.steps}>
            {
                steps.map((step,index) => {
                    return (
                        <div 
                        className={styles.step}
                        key={index}
                        >
                            {step}
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default TimeBanner
