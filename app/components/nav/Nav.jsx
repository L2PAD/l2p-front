import { useState , useMemo , useEffect} from 'react';
import { useDispatch , useSelector} from 'react-redux'
import { useWeb3Modal } from "@web3modal/react";
import { useAccount} from 'wagmi'
import Link from 'next/link';
import Image from 'next/image';
import {setUserData} from '../../store/slices/authSlice' 
import { closeModal, closeModalWithoutBlock, openModal, toggleModal ,toggleModalWithoutBlock} from '../../store/slices/modalsSlice';
import logo from '../../assets/icons/l2pad-logo.png'
import cartSvg from '../../assets/icons/cart.svg'
import PinkBtn from '../UI/buttons/PinkBtn';
import Wallets from '../../assets/components/wallets/Wallets'
import Burger from '../../assets/components/burger/Burger';
import MobileNav from '../../assets/components/mobileNav/MobileNav';
import blockScroll from '../../utils/blockScroll';
import UserSettings from '../userSettings/UserSettings'
import useCart from '../../hooks/useCart';
import useWallet from '../../hooks/useWallet';
import useAuth from '../../hooks/useAuth';
import SearchBar from '../../assets/components/searchBar/SearchBar';
import NavModal from '../../assets/components/navModal/NavModal';
import CartModal from '../../assets/components/cartModal/CartModal'
import LoaderCustom from '../../assets/components/loader/Loader';
import SuccessWalletConnect from '../../assets/components/SuccessWalletConnect/SuccessWalletConnect';
import RwaCreditModal from '../../assets/components/rwaCreditNavModal/RwaCreditModal'
import styles from '../layout/styles/nav.module.scss'
import { useRouter } from 'next/router';

const links = [
    {
        title:'NFT Market',
        href:'/marketplace'
    },
    {
        title:'RWA & Credit',
        isBtn:true,
    },
    {
        title:'Leaderboard',
        href:'/leaderboard'
    },
    {
        title:'Dashboard',
        href:'/dashboard'
    },
    {
        title:'Blog',
        href:'/blog'
    },
    {
        title:'Vote',
        href:'/vote'
    },
    {
        title:'Calendar',
        href:'/calendar'
    },

    {
        title:'Waitlist',
        href:'/waitinglist'
    },
]

const mobileLinks = [
    {
        title:'NFT Marketplace',
        href:'/marketplace'
    },
    {
        title:'RWA & Credit',
        isBtn:true,
    },
    {
        title:'Leaderboard',
        href:'/leaderboard'
    },
    {
        title:'Dashboard',
        href:'/dashboard'
    },
    {
        title:'Blog',
        href:'/blog'
    },
    {
        title:'Vote',
        href:'/vote'
    },
    {
        title:'Calendar',
        href:'/calendar'
    },
    {
        title:'Waiting list',
        href:'/waitinglist'
    },
    {
        title:'L2P Info',
        href:'/info'
    },
]

const Nav = ({userData}) => {
    const walletState = useSelector((state) => state.modals.wallet.state)
    const navModalState = useSelector((state) => state.modals.nav.state)
    const rwaModalState = useSelector((state) => state.modals.rwa.state)
    const [modal,setModal] = useState(false)
    const [config,setConfig] = useState({})
    const {loading,connectWallet} = useWallet()
    const {cart} = useCart()
    const dispatch = useDispatch()
    const router = useRouter()

    const disconnectHandler = () => {
        dispatch(setUserData({address:'',balance:'',isAuth:false}))
        dispatch(closeModal('settings'))
        localStorage.setItem('l2pad-auth',false)
    }

    const connect = async () => {
        await connectWallet('Metamask')
    }

    const modalHandler = (event) => {
        event.stopPropagation()
        if(event.target.id === 'remove-block'){
            blockScroll('remove')
        }
        if(event.target.id === 'brg-btn' || event.target.id === 'modal'){
            walletState && walletsHandler()
            setModal(!modal)
            dispatch(closeModal('settings'))
            dispatch(closeModal('nav'))
        }
    }

    const rwaModalHandler = () => {
        dispatch(closeModalWithoutBlock('nav'))
        dispatch(toggleModalWithoutBlock('rwa'))
    }
    const navModalHandler = () => {
        dispatch(closeModalWithoutBlock('rwa'))
        dispatch(toggleModalWithoutBlock('nav'))
    }
  
    if(loading){
        return <LoaderCustom/>
    }

    return (
        <>
        <div onClick={modalHandler} className={styles.row}>
            <div className={styles.logo}>
                <Link href={'/'}>
                   <Image width={'160'} src={logo} alt='logo'/>
                </Link>
            </div>
            <div className={styles.infoLink}>
                <Link href={'/info'}>
                    L2P info
                </Link>
            </div>
            <div className={styles.input}>
                <SearchBar/>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.links}>
                <li className={styles.investsBtn}>
                    <a 
                    className={navModalState ? styles.rotate + " " + styles.link : styles.link}
                    onClick={(e) => {
                        e.preventDefault()
                        if(userData?.isAuth){
                            navModalHandler(e)
                        }else{
                            router.push('/invite')
                        }   
                    }}>
                        Invest
                    </a>
                </li>
                {links.map((link,index) => {
                    if(link?.isBtn){
                        return (
                            <li className={styles.secondBtn} key={index}>
                                <a 
                                onClick={(e) => {
                                    e.preventDefault()
                                    rwaModalHandler(e)
                                }}
                                className={rwaModalState ? styles.rotate + ' ' + styles.link : styles.link}
                                href={``}>
                                    {link.title}
                                </a>
                                <RwaCreditModal isVisible={rwaModalState} handler={rwaModalHandler}/>
                            </li>
                        )
                    }
                    if(link.href === '/waitinglist' && userData._id){
                        return (
                            <li key={index}>
                                <Link 
                                className={styles.link} 
                                href={`${link.href}/${userData._id}`}>
                                    {link.title}
                                </Link>
                            </li>
                        )
                    }

                    return (
                        <li key={index}>
                            <Link 
                            className={styles.link} 
                            href={`${link.href}`}>
                                {link.title}
                            </Link>
                        </li>
                    )
                })}
                </ul>
                <div className={styles.navModalWrapper}>
                <NavModal isVisible={navModalState}/>
                </div>
            </nav>
            <div className={styles.btn}>
                {
                    userData.isAuth
                    ?
                    <UserSettings user={userData} disconnect={disconnectHandler}/>
                    :
                    <PinkBtn 
                    handler={() => router.push('/invite')} 
                    text={
                        'Connect wallet' 
                    } 
                    href={''} 
                    id={'wallet-btn'}
                    />
                }
            </div>
            <button
            onClick={() => dispatch(openModal('cart'))}
            className={styles.cartBtn}
            >
                <Image src={cartSvg} alt='cart'/>
                <div className={styles.cartCount}>
                    {cart.length}
                </div>
            </button>
            <Wallets 
            config={config} 
            connect={connect} 
            isVisible={walletState}
            />
            <Burger/>
            <MobileNav 
            navModalHandler={navModalHandler}
            rwaModalHandler={rwaModalHandler}
            navModalState={navModalState}
            rwaModalState={rwaModalState}
            disconnect={disconnectHandler} 
            user={userData} 
            isAuth={userData.isAuth} 
            isVisible={modal} 
            modalHandler={modalHandler} 
            links={mobileLinks}
            />
            {/* <SuccessWalletConnect userData={userData}/> */}
            <CartModal/>
        </div>
        </>
    );
}

export default Nav;
