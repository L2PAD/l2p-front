import {useSelector} from 'react-redux'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import useTimer from '../../hooks/useTimer'
import styles from '../styles/time-banner.module.scss'

const TimeBanner = ({steps,date,time,currentStep,changeStep}) => {
    const {days,hours,minutes,seconds} = useTimer(date,time)
    const isAuth = useSelector((state) => state.auth.userData?.isAuth)
 
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
                        <button 
                        onClick={() => changeStep(index + 1)}
                        className={
                            currentStep === (index + 1)
                            ?
                            styles.step
                            :
                            styles.step + ' ' + styles.disabled
                        }
                        key={index}
                        >
                            {step?.name || step}
                        </button>
                    )
                })
            }
        </div>
    </div>
  )
}

export default TimeBanner
