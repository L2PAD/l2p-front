import { useRef,useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import getUserData from '../../utils/getUserData'
import l2pSocial from '../../assets/icons/l2p-social'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import stepsTextOne from '../../assets/components/l2pText/stepsTextOne'
import stepsTextTwo from '../../assets/components/l2pText/stepsTextTwo'
import stepsTextThree from '../../assets/components/l2pText/stepsTextThree'
import L2PText from '../../assets/components/l2pText/L2PText'
import sliceAddress from '../../utils/sliceAddress'
import l2pLogo from '../../assets/icons/l2p-logo.svg'
import l2pVideo from '../../assets/video/l2p.gif'
import styles from './l2p.module.scss'

const L2P = ({socialLinks}) => {
    const [userData,setUserData] = useState({})
    const [walletAddress,setWalletAddress] = useState('')
    const videoRef = useRef()
    const router = useRouter()

    useEffect(() => {
        const user = getUserData()
        setUserData(user)
        setWalletAddress(user?.address)
    }, [videoRef]);
  
  return (
    <div className={styles.wrapper}>
        <div className={styles.bgWrapper}>
            <Image
            className={styles.background}
            src={l2pVideo}
            alt='l2p'
            />
            <div className={styles.overlay}></div>
        </div>
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
                            src={userData?.twitterData.photo}/>
                            :
                            <></>
                        }
                        <span className={styles.userAddress}>{sliceAddress(walletAddress)}</span>
                    </Link>
                    :
                    <button 
                    onClick={() => router.push('/invite')}
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
