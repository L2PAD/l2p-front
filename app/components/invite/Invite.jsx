import {useState,useEffect,useRef} from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { toggleModal,openModal } from '../../store/slices/modalsSlice'
import { api } from '../../config/api'
import getUserByAddress from '../../services/getUserStatusByAddress'
import activateCode from '../../services/activateCode'
import CustomAlert from '../../assets/components/CustomAlert/CustomAlert'
import checkAuthCode from '../../services/checkAuthCode'
import Image from 'next/image'
import successIcon from '../../assets/icons/success-icon.svg'
import getUserData from '../../utils/getUserData'
import useAuth from '../../hooks/useAuth'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import styles from '../styles/invite.module.scss'

const actionsInitial = [
    {
        text:'Connect your wallet',
        label:'',
        isActive:true,
        isSuccess:false,
        handler:'wallet'
    },
    {
        text:'Connect and follow',
        label:'L2PAD on Twitter',
        isActive:false,
        isSuccess:false,
        handler:'twitter'
    },
    {
        text:'Join',
        label:'L2PAD on Telegram',
        isActive:false,
        isSuccess:false,
        handler:'telegram'
    },
]

const Invite = () => {
    const [isAuth,setIsAuth] = useState(false)
    const [isConfirmBtnActive,setIsConfrimBtnActive] = useState(false)
    const [isValidCode,setIsValidCode] = useState(false)
    const [actions,setActions] = useState(() => actionsInitial)
    const [isCodeCheckedAlert,setIsCodeCheckedAlert] = useState(false)
    const [isCodeCheckedSuccess,setIsCodeCheckedSuccess] = useState(false)
    const [code,setCode] = useState({
        0:'',
        1:'',
        2:'',
        3:'',
        4:'',
    })
    const {adderss} = useAuth()
    const codeWrapperRef = useRef()
    const dispatch = useDispatch()
    const router = useRouter()

    const codeInputeHandler = (value,index) => {
        setCode((prev) => {
            return (
                {
                    ...prev,
                    [index]:value
                }
            )
        })

        if(Number(value) < 0 && value !== '') return

        if(Number(value) > 9) return

        const inputs = codeWrapperRef.current.querySelectorAll('input')


        if(value && index !== 4){
            inputs[index + 1].focus()
        }

        if(!value && index !== 0){
            inputs[index - 1].focus()
        }

    }

    const openTwitterAuth = () => {
        const width = 600, height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;
        const url = `${api}/auth/twitter`;
        return window.location.replace(url, '', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`);
    };

    const openTelegramAuth = () => {
        const redirectUrl = encodeURIComponent(window.location.href);
        const botLink = `https://t.me/L2PADBOT?start=auth&redirect_url=${redirectUrl}`;

        window.open(botLink)
    }

    const connectDispatch = (action) => {
        if(action === 'wallet'){
            dispatch(toggleModal('wallet'))
        }
        if(action === 'twitter'){
            openTwitterAuth()
        }
        if(action === 'telegram'){
            openTelegramAuth()
        }
    }

    const getCode = () => {
        let codeValue = ''

        for (const key in code) {
            codeValue = codeValue + code[key]
        }

        return {codeValue,isValid:codeValue.length > 4}
    }

    const confirmSendCode = async () => {
        const {codeValue} = getCode()
      
        const {success} = await checkAuthCode(codeValue)

        if(success){
            setIsValidCode(true)
        }

        setIsCodeCheckedSuccess(success)
        setIsCodeCheckedAlert(true)
    }

    const activateAccount = async () => {
        const {codeValue} = getCode()

        const {success} = await activateCode(codeValue)

        if(success){
            localStorage.setItem('l2pad-auth',true)

            router.push('/info')
        }
    }

    useEffect(() => {
        const userData = getUserData()
        
        const isWalletConnected = !!window?.ethereum?.selectedAddress 
        const isTwitterConnected = userData?.twitterData
        const isTelegramConnected = userData?.telegramData
        
        const userCode = localStorage.getItem('l2pad-code')
        const oldAddress = localStorage.getItem('l2pad-wallet')
        console.log(`Old user code: ${userCode}`)
        console.log(`Old user address: ${oldAddress}`)
        console.log(`Is wallet connected: ${isWalletConnected}`)
        console.log(`Is twitter connected: ${isTwitterConnected}`)
        if(oldAddress && !isWalletConnected){
            getUserByAddress(oldAddress).then(({success,isActive}) => {
                if(isActive && success){
                    localStorage.setItem('l2pad-auth','true')
                    dispatch(openModal('wallet'))
                }
            })

            if(userCode){
                setCode({
                    0:userCode[0],
                    1:userCode[1],
                    2:userCode[2],
                    3:userCode[3],
                    4:userCode[4],
                })
            }

            return
        }

        if(userCode){
            setCode({
                0:userCode[0],
                1:userCode[1],
                2:userCode[2],
                3:userCode[3],
                4:userCode[4],
            })
        }
   
        setActions([
            {...actionsInitial[0],isSuccess:isWalletConnected,isActive:isValidCode},
            {...actionsInitial[1],isSuccess:isTwitterConnected,isActive:isWalletConnected},
            {...actionsInitial[2],isSuccess:isTelegramConnected,isActive:isTwitterConnected}
        ])
        
        const isAuthValue = isWalletConnected && isTwitterConnected && isTelegramConnected && userData?.isActive

        setIsAuth(isAuthValue)
        setIsConfrimBtnActive(isWalletConnected && isTwitterConnected && isTelegramConnected && !userData?.isActive)
        localStorage.setItem('l2pad-auth',isAuthValue)
    },[adderss,isValidCode])
    
  return (
    <>
    <div className={styles.wrapper}>
        {
            isAuth 
            ?
            <></>
            :
            <div className={styles.head}>
            <div className={styles.title}>
                L2PAD 
            </div>
            <div className={styles.description}>
            Enter your invite code to claim your points
            </div>
            </div>
        }
        
        {
            isAuth 
            ?
            <div className={styles.isLogin}>
                You are logged in!
            </div>
            :
            <div
            ref={codeWrapperRef}
            className={styles.codeWrapper}>
                <div className={
                    code[0]
                    ?
                    styles.codeBorder
                    :
                    styles.codeBorder + " " + styles.empty
                }>
                    <input 
                    value={code[0]}
                    onChange={(e) => codeInputeHandler(e.target.value,0)}
                    maxLength={1} className={styles.codeInput} />
                </div>
                <div className={
                    code[1]
                    ?
                    styles.codeBorder
                    :
                    styles.codeBorder + " " + styles.empty
                }>
                    <input 
                    value={code[1]}
                    onChange={(e) => codeInputeHandler(e.target.value,1)}
                    maxLength={1} className={styles.codeInput} />
                </div>
                <div className={
                    code[2]
                    ?
                    styles.codeBorder
                    :
                    styles.codeBorder + " " + styles.empty
                }>
                    <input 
                    value={code[2]}
                    onChange={(e) => codeInputeHandler(e.target.value,2)}
                    maxLength={1} className={styles.codeInput} />
                </div>
                <div className={
                    code[3]
                    ?
                    styles.codeBorder
                    :
                    styles.codeBorder + " " + styles.empty
                }>
                    <input 
                    value={code[3]}
                    onChange={(e) => codeInputeHandler(e.target.value,3)}
                    maxLength={1} className={styles.codeInput} />
                </div>
                <div className={
                    code[4]
                    ?
                    styles.codeBorder
                    :
                    styles.codeBorder + " " + styles.empty
                }>
                    <input 
                    value={code[4]}
                    onChange={(e) => codeInputeHandler(e.target.value,4)}
                    maxLength={1} className={styles.codeInput} />
                </div>
            </div>
        }

        {
            isAuth 
            ?
            <></>
            :
            <SquareBtn
            handler={confirmSendCode}
            width='330'
            text={'Enter invite code'}
            fontSize='15px'
            className='inviteCode'
            />
        }

        <div className={styles.actions}>
            {
                actions.map((action,index) => {
                    return (
                        <div 
                        key={index}
                        className={
                            action.isActive
                            ?
                            styles.action + " " + styles.active 
                            :
                            styles.action
                        }>
                            <div className={styles.actionInfo}>
                                <div className={styles.actionText}>
                                    0{index + 1}
                                </div>
                                <div className={styles.actionText + ' ' + styles.middleText}>
                                    {action.text}
                                </div>
                                <div className={styles.actionLabel}>
                                    {action.label}
                                </div>
                            </div>
                            {
                                action.isSuccess
                                ?
                                <div className={styles.successIcon}>
                                    <Image src={successIcon} alt='success!'/>
                                </div>
                                :
                                <SquareBtn
                                handler={() => connectDispatch(action.handler)}
                                fontSize='14px'
                                className={'actionItem'}
                                disabled={!action.isActive}
                                text={'Connect'}
                                />
                            }
                        </div>
                    )
                })
            }
        </div>

        <SquareBtn
        handler={activateAccount}
        fontSize='15px'
        width='330'
        text={'Go to the L2P platform'}
        disabled={!isConfirmBtnActive}
        className='inviteCode'
        />
    </div>
    <CustomAlert
    isAutoClose={true}
    type={
        isCodeCheckedSuccess
        ?
        'success'
        :
        'error'
    }
    title={
        isCodeCheckedSuccess
        ?
        'Success!'
        :
        'Error'
    }
    text={
        isCodeCheckedSuccess
        ?
        `You have successfully activate ref code`
        :
        `Incorrect code`
    }
    isVisible={isCodeCheckedAlert}
    handler={() => setIsCodeCheckedAlert(false)}
    />
    </>
  )
}

export default Invite
