import { useState, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { toggleModal } from '../../store/slices/modalsSlice'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import useTimer from '../../hooks/useTimer'
import styles from '../styles/time-banner.module.scss'

const TimeBanner = ({steps,date,time,currentStep,changeStep,projectName}) => {
    const [data,setData] = useState({})
    const {days,hours,minutes,seconds} = useTimer(date,time)
    const isAuth = useSelector((state) => state.auth.userData?.isAuth)
    const dispatch = useDispatch()
 
    useEffect(() => {
        setData({days,hours,minutes,seconds})
    },[days,hours,minutes,seconds])

  return (
    <div className={styles.wrapper}>
        <div className={styles.body}>
            <div className={styles.title}>
                {projectName} sales ends in:
            </div>
            <div className={styles.date}>
                {data.days}d {data.hours}h {data.minutes}m {data.seconds}s
            </div>   
            {
                isAuth
                ?
                <></>  
                :
                <SquareBtn 
                handler={() => dispatch(toggleModal('wallet'))}
                text={'Connect wallet'}/>   
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
