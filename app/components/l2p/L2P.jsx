import { useRef,useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import getUserData from '../../utils/getUserData'
import l2pSocial from '../../assets/icons/l2p-social'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import stepsTextOne from '../../assets/components/l2pText/stepsTextOne'
import stepsTextTwo from '../../assets/components/l2pText/stepsTextTwo'
import stepsTextThree from '../../assets/components/l2pText/stepsTextThree'
import L2PText from '../../assets/components/l2pText/L2PText'
import sliceAddress from '../../utils/sliceAddress'
import Image from 'next/image'
import Link from 'next/link'
import l2pLogo from '../../assets/icons/l2p-logo.svg'
import loader from '../../utils/loader'
import styles from './l2p.module.scss'

const L2P = ({socialLinks}) => {
    const [userData,setUserData] = useState({})
    const [walletAddress,setWalletAddress] = useState('')
    const videoRef = useRef()
    const router = useRouter()

    useEffect(() => {
        const user = getUserData()
        setUserData(user)
        setWalletAddress(window.ethereum.selectedAddress)
        videoRef.current.play()
    }, [videoRef]);
  
  return (
    <div className={styles.wrapper}>
        <video
        muted
        ref={videoRef}
        loop
        >
            <source src={loader('/1.webm')} type='video/webm'/>
        </video>
        <div className={styles.body}>
            <header>
                <Link className={styles.logo} href={'/'}>
                    <Image src={l2pLogo} alt='l2pad'/>
                </Link>    
                {
                    walletAddress
                    ?
                    <Link 
                    href={'/info'}
                    className={styles.userConnectWrapper}>
                        {
                            userData?.discordData?.id
                            ?
                            <img 
                            className={styles.userImage}
                            src={`https://cdn.discordapp.com/avatars/${userData.discordData.id}/${userData.discordData.avatar}?size=32`}/>
                            :
                            <></>
                        }
                        <span className={styles.userAddress}>{sliceAddress(walletAddress)}</span>
                    </Link>
                    :
                    <button 
                    onClick={() => router.push('/info?wallet=true')}
                    className={styles.connectWalletBtn}>
                        Connect wallet
                    </button>
                }
            </header>
            <main className={styles.textWrapper}>
                <L2PText data={stepsTextOne}/>
                <L2PText data={stepsTextTwo}/>
                <L2PText data={stepsTextThree}/>
            </main>
            <footer className={styles.footer}>
                <SquareBtn
                width='290'
                fontSize='32px'
                text={'Go to Platform'} handler={() => router.push('/info')}/>
                <hr className={styles.footerLine}/>
                <div className={styles.footerLabel}>
                    L2PAD
                </div>
                <div className={styles.socialLinks}>
                    {
                        socialLinks.map((item,index) => {
                            return (
                                <a 
                                target={'_blank'}
                                key={index}
                                href={item.link}
                                >
                                    <Image src={l2pSocial[item.alt]} alt={item.alt}/>
                                </a>
                            )
                        })
                    }
                </div>
            </footer>
        </div>  
    </div>
  )
}

export default L2P;
