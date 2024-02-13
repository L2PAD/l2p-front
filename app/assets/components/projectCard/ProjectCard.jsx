import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '../../../store/slices/authSlice'
import { toggleModal, toggleModalWithoutBlock } from '../../../store/slices/modalsSlice'
import { TelegramShareButton,TwitterShareButton} from 'react-share';
import { shareLink } from '../../../config/api'
import { getAllPartnersFromPool } from '../../../smart/initialSmartMain'
import HTMLReactParser from 'html-react-parser'
import stepActiveIcon from '../../icons/step-active.svg'
import stepIcon from '../../icons/step.svg'
import parseFunded from '../../../utils/parseFunded'
import parseGoal from '../../../utils/parseGoal'
import Image from 'next/image'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import favourites from '../../../services/favourites'
import shareSvg from '../../../assets/icons/share.svg'
import shareLinkSvg from '../../../assets/icons/share-link.svg'
import telegramSvg from '../../../assets/icons/telegram.svg'
import twitterSvg from '../../../assets/icons/twitter.svg'
import loader from '../../../utils/loader'
import icons from '../../icons/socialmedia/socialmedia'
import styles from './project-card.module.scss'

export default function ProjectCard({myInvest,isClaimed,isClaim,modalHandler,project,steps,text}) {
    const shareModalState = useSelector((state) => state.modals.share.state)
    const userData = useSelector((state) => state.auth.userData)
    const isFavourite = userData?.favourites?.includes(project._id)
    const [progressValue,setProgressValue] = useState(0)
    const [fundedValue,setFundedValue] = useState(0)
    const [myInvestValue,setMyInvestValue] = useState(0)
    const [currentGoal,setCurrentGoal] = useState(0)
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

    const shareReferral = async () => {
        const result = await navigator.share({
            url:`${shareLink}/${project.path}/${project._id}`,
            text:"Noname referral link"
        })
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
    <div className={styles.container}>
        <div className={styles.participateSteps}>
            {
                steps.map((step,index) => {
                    return (
                    <div key={step.title} className={styles.step}>
                        {
                            step.isActive 
                            ?
                            <Image src={stepActiveIcon} alt='step'/>
                            :
                            <Image src={stepIcon} alt='step'/>

                        }
                        <div className={styles.stepInfo}>
                            <div className={styles.stepTitle}>
                                {step.title}
                            </div>
                            <div className={styles.stepDescription}>
                                {step.description}
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    <div className={styles.body}>
        <div className={styles.banner}>
            <span className={styles.important}>Important:</span>
            <span>{project.banner}</span>
        </div>
        <div className={styles.row}>
            <div className={styles.img}>
                <Image loader={() => loader(project.img)} width={'84'} height={'84'} src={project.img} alt={project.title}/>
            </div>
            <div className={styles.info}>
                <div className={styles.infoRow}>
                    <div className={styles.infoWrapper}>
                        <div className={styles.status}>{project.status}</div>
                        <div className={styles.socialmedia}>
                            {
                            project.socialmedia?.length 
                            ?
                            project.socialmedia.map((item,index) => {
                                if(item.alt.includes('web')){
                                    return (
                                        <a key={index} href={item.link} target={'_blank'}>
                                            <Image width={'20'} height={'18'} src={icons.web} alt={item.alt}/>
                                        </a>
                                    )
                                }
                                return (
                                    <a key={index} href={item.link} target={'_blank'}>
                                        <Image width={'20'} height={'18'} src={icons[item.alt]} alt={item.alt}/>
                                    </a>
                                )
                            })
                            :
                            <></>
                            }
                        </div>
                    </div>
                    <div 
                    className={
                        styles.shareBtn + ' ' + styles.shareWrapper
                    }>
                        <button onClick={() => dispatch(toggleModalWithoutBlock('share'))}>
                            <Image src={shareSvg} alt='share'/>
                            <span>Share</span>
                        </button>
                        <div 
                        className={
                            shareModalState 
                            ? 
                            styles.shareModal + ' ' + 'open-modal'
                            :
                            styles.shareModal
                        }>
                            <button onClick={shareReferral} className={styles.shareButton}>
                                <Image src={shareLinkSvg} alt='share-referral'/>
                                <span>Share referral link</span>
                            </button>
                                <TelegramShareButton url={`${shareLink}/${project.path}/${project._id}`}>
                                <Image src={telegramSvg} alt='share-telegram'/>
                                <span>Telegram</span>
                                </TelegramShareButton>
                            <TwitterShareButton
                            url={`${shareLink}/${project.path}/${project._id}`}
                            >
                                <Image src={twitterSvg} alt='share-twitter'/>
                                <span>Twitter</span>
                            </TwitterShareButton>
                        </div>
                    </div>
                </div>
                <div className={styles.infoTitleBlock}>
                    <div className={styles.infoTitle}>{project.title}</div>
                </div>
                <div className={styles.infoDescription}>
                    {project.description}
                </div>
            </div>
        </div>


    </div>
    <div className={styles.projectFullDescription}>
        {HTMLReactParser(text)}
    </div>

    </div>
  )
}
