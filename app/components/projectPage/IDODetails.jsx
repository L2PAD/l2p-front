import { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useRouter} from 'next/router'
import { setUserData } from '../../store/slices/authSlice'
import { getAllPartnersFromPool } from '../../smart/initialSmartMain'
import { toggleModal } from '../../store/slices/modalsSlice'
import HTMLReactParser from 'html-react-parser'
import AboutCompany from '../../assets/components/AboutComapany/AboutCompany'
import Accordion from '../accordion/Accordion'
import TimeBanner from './TimeBanner'
import Image from 'next/image'
import favourites from '../../services/favourites'
import heartSvg from '../../assets/icons/heart.svg'
import heartFillSvg from '../../assets/icons/heartFill.svg'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import parseFunded from '../../utils/parseFunded'
import parseGoal from '../../utils/parseGoal'
import parseDate from '../../utils/parseDate'
import changeDateType from '../../utils/changeDateType'
import styles from '../styles/ido-details.module.scss'

const stepsInitital = [
    'Staking',
    'Purchase',
    'Distribution',
    'Terms And Conditions',
]

const IDODetails = ({modalHandler,myInvest,project,isClaimed,isClaim}) => {
    const userData = useSelector((state) => state.auth.userData)
    const isFavourite = userData?.favourites?.includes(project._id)
    const [progressValue,setProgressValue] = useState(0)
    const [fundedValue,setFundedValue] = useState(0)
    const [myInvestValue,setMyInvestValue] = useState(0)
    const [currentGoal,setCurrentGoal] = useState(0)
    const [steps,setSteps] = useState(() => stepsInitital)
    const [currentStep,setCurrentStep] = useState(1)
    const router = useRouter()

    const dispatch = useDispatch()
  
    const addProject = async () => {
        if(!userData.isAuth){
            dispatch(toggleModal('wallet'))
            return
        }

        if(userData?.favourites?.includes(project._id)) return

        const updatedUserData = {...userData,favourites:[...userData.favourites,project._id]}
        dispatch(setUserData(updatedUserData))
        
        const {success} = await favourites(project._id,userData.address)
        if(success){
            modalHandler(null,true)
        }
    }

      
    const changeStep = (stepNumber) => {
        const stepsNumbers = {
          1:'staking-step',
          2:'purchase-step',
          3:'dist-step',
          4:'footer-block',
        }
        const step = stepsNumbers[stepNumber]
        const targetElement = document.querySelector(`#${step}`);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setCurrentStep(stepNumber)
      }

    useEffect(() => {
        getAllPartnersFromPool(project.poolId).then(({sumInvest}) => {
            const currentFund =                     
            project.status.toLowerCase() === 'ended'
            ?
            parseGoal(project.totalRaise)
            :
            parseGoal(project.goal)

            setCurrentGoal(currentFund)
            
            if(sumInvest){
                setProgressValue(parseFunded(sumInvest,currentFund))
                setFundedValue(`$${sumInvest} (${parseFunded(sumInvest,currentFund)}%)`)
                setMyInvestValue(`$${myInvest} (${parseFunded(myInvest,currentFund)}%)`)
            }
        })
    },[])

  return (
    <>
        <div className={styles.wrapper}>
        <div className={styles.body}>
            <div className={styles.title}>
                IDO Details
            </div>
            <div className={styles.details}>
            <div className={styles.column}>
                <div className={styles.detailsItem}>
                    <span className={styles.key}>Launch Price:</span>
                    <span className={styles.value}> {project.price || 0}</span>
                </div>
                <div className={styles.detailsItem}>
                    <span className={styles.key}>Total Amount:</span>
                    <span className={styles.value}> {project.goal}</span>
                </div>
                <div className={styles.detailsItem}>
                    <span className={styles.key}>Total Issued:</span>
                    <span className={styles.value}> {project.totalIssued || 0}</span>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.detailsItem}>
                    <span className={styles.key}>Total in Green zone:</span>
                    <span className={styles.value}> {project.greenZone}</span>
                </div>
                <div className={styles.detailsItem}>
                    <span className={styles.key}>Redemption Amount:</span>
                    <span className={styles.value}> {project.redemptionAmount}</span>
                </div>
                <div className={styles.detailsItem}>
                    <span className={styles.key}>Total Participants:</span>
                    <span className={styles.value}> {project.greenZone + project.yellowZone}</span>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.detailsItem}>
                    <span className={styles.key}>Min. investment:</span>
                    <span className={styles.value}> ${project.minInvest}</span>
                </div>
                <div className={styles.detailsItem}>
                    <span className={styles.key}>Max. investment:</span>
                    <span className={styles.value}> ${project.maxInvest}</span>
                </div>
            </div>
            </div>

            <div className={styles.btns}>
            <SquareBtn
            className='participate'
            disabled={isClaimed}
            handler={() => router.push(`/participate/${project.path}/${project._id}`)} 
            text={
                isClaim 
                ? 
                (
                isClaimed
                ?
                'Ended'
                :
                'Claim'
                ) 
                : 'Participate'
                } width={'375'}/>
            <button onClick={addProject} type={'button'} className={styles.likeBtn}>
                {
                    isFavourite
                    ?
                    <Image className={styles.blocked} src={heartFillSvg} alt='btn'/>
                    :
                    <Image src={heartSvg} alt='btn'/>
                }
            </button>                   
            </div>

            <hr className={styles.line}/>

            <div className={styles.progress}>
          <div className={styles.progressRow}>
            <div className={styles.rowItem}>
                <span className={styles.key}>Funded:</span>
                <span className={styles.value}>{
                project?.isRefunded
                ?
                `0$`
                :
                fundedValue || project.funded
            }</span>                    
            </div>
            <div className={styles.rowItem}>
                <span className={styles.key}>Funding goal:</span>
                <span className={styles.goalValue}>{currentGoal}$</span>                    
            </div>
          </div>
          <div className={styles.progressBar}>
            <div style={{width:`${
                project?.isRefunded
                ?
                0
                :
                progressValue ? progressValue : 0}%`
                }} className={styles.progressBarBody}>
                
            </div>
          </div>
            </div>    
            {
            project?.isRefunded
            ?
            <div className={styles.isRefunded}>
                REFUNDED
            </div>
            :
            <div className={styles.funded}>
                <span className={styles.key}>My investments:</span>                    
                <span className={styles.textBlue}>
                    {
                        project?.isRefunded
                        ?
                        `0$`
                        :
                        myInvestValue === 0 ? `${myInvestValue}%` : myInvestValue
                    }
                </span>                    
            </div>
            }
            <hr className={styles.line}/>

            <div className={styles.tags}>
            {
                project.tags?.map((tag,index) => {
                    return (
                        <div className={styles.tag} key={index}>
                            {tag.value}
                        </div>
                    )
                })
            }
            </div>

            <div className={styles.details}>
            <div className={styles.column}>
                <div className={styles.startDate}>
                    <span className={styles.key}>Staking start: </span>
                    <span className={styles.value}>{project.dateStart}</span>
                </div>
                <div className={styles.endDate}>
                    <span className={styles.key}>Staking end: </span>
                    <span className={styles.value}>{project.dateEnd}</span>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.startDate}>
                    <span className={styles.key}>Purchase start: </span>
                    <span className={styles.value}>{project?.purchaseDates?.from || '-'}</span>
                </div>
                <div className={styles.endDate}>
                    <span className={styles.key}>Purchase end: </span>
                    <span className={styles.value}><span className={styles.value}>
                        {project?.purchaseDates?.to || '-'}</span></span>
                </div>
            </div>
            <div className={styles.endDate}>
                <span className={styles.key}>Distribution start: </span>
                <span className={styles.value}>{project.distributionStart || '-'}</span>
            </div>
            </div>

            <div className={styles.roadmap}>
            <div className={styles.bodyLine}>
            </div>
                <div id='staking-step' className={styles.subTitle}>
                    Staking
                </div>
                <div className={styles.columnsDate}>
                    <span>{changeDateType(parseDate(project.dateStart),6)} {project.timeStart} </span>
                    -
                    <span> {changeDateType(parseDate(project.dateEnd),6)} {project.timeEnd}</span> UTC
                </div>
                <div className={styles.text}>
                    {HTMLReactParser(project.stakingText)}
                </div>
                <div id='purchase-step' className={styles.overview}>
                <div className={styles.subTitle}>
                Purchase
                </div>
                <div className={styles.columnsDate}>
                    <span>{changeDateType(parseDate(project.purchaseDates.from),6)} {project.purchaseTimeStart} </span>
                    -
                    <span> {changeDateType(parseDate(project.purchaseDates.to),6)} {project.purchaseTimeEnd}</span> UTC
                </div>
                <div className={styles.text}>
                    {HTMLReactParser(project.purchaseText)}
                </div>
                </div>
                <div id='dist-step' className={styles.infoBlock}>
                    <div className={styles.subTitle}>
                        Distribution
                    </div>
                    <div className={styles.columnsDate}>
                        <span> {changeDateType(parseDate(project.purchaseDates.to),6)} {project.claimTimeStart}</span> UTC
                    </div>
                    <div className={styles.text}>
                        {HTMLReactParser(project.distributionText)}
                    </div>
                </div>
            </div>

        </div>
        <div className={styles.bannerWrapper}>
            <TimeBanner
            projectName={project?.title}
            changeStep={changeStep}
            currentStep={currentStep}
            steps={steps}
            date={project.dateEnd} 
            time={project.timeEnd}
            />
        </div>
    </div>
    <div className={styles.faq}>
        <Accordion items={project.faq} title={'FAQ'}/>
    </div>
    <div className={styles.risks}>
        <Accordion items={project.risks} title={'Risks'}/>
    </div>
    </>
  )
}

export default IDODetails
