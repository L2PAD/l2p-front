import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { toggleModal } from '../../store/slices/modalsSlice'
import useModal from '../../hooks/useModal'
import logo from '../../assets/icons/l2pad-logo.png'    
import Image from 'next/image'
import MainBtn from '../UI/buttons/MainBtn'
import Form from '../../assets/components/form/Form'
import SubTitle from '../../assets/components/subTitle/SubTitle'
import Gallery from '../../assets/components/gallery/Gallery'
import Accordion from '../accordion/Accordion'
import Roadmap from '../../assets/components/roadmap/Roadmap'
import Community from '../community/Community'
import CustomAlert from '../../assets/components/CustomAlert/CustomAlert'
import styles from '../styles/info.module.scss'

const links = [
    {
        name:'About us',
        href:'#about-us'
    },
    {
        name:'Portfolio',
        href:'#portfolio'
    },
    {
        name:'Partners',
        href:'#partners'
    },
    {
        name:'Contact',
        href:'#contact'
    },
]

export default function Info({data}) {
    const {modalHandler,state} = useModal()
    const [isError,setIsError] = useState(false)
    const [isSuccess,setIsSuccess] = useState(false)
    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(() => {
        const params = router.query

        if(params.wallet){
            dispatch(toggleModal('wallet'))
        }

        if(params?.activated === 'true'){
            setIsSuccess(true)

            return
        }

        if(params?.activated === 'false'){
            setIsError(true)

            return
        }
        
        if(params?.success){
            setIsSuccess(true)
            
            return
        }

        if(params?.error){
            setIsError(true)

            return
        }

        if(params?.login){
            dispatch(toggleModal('wallet'))
        }
    },[])
    
  return (
    <>
        <div className={styles.body}>
        <div className={styles.joinUs}>
                <nav className={styles.nav}>
                    {links.map((link,index) => {
                        return (
                            <a key={index} href={link.href}>
                                {link.name}
                            </a>
                        )
                    })}
                </nav>
            <div className={styles.text + ' ' + styles.mainText}>
                Blast-powered solution that enables users and projects to find exactly what they need. Everything in one place. Launchpad | Restaking | NFT Marketplace | RWA           
            </div>
            <MainBtn text={'Join us'} handler={modalHandler}/>
            <Form handler={modalHandler} isVisible={state}/>
        </div>
        <div id='about-us' className={styles.about}>
            <div className={styles.aboutInfo}>
                <SubTitle>
                About us
                </SubTitle>
                <div className={styles.aboutText}>
                <div>
                L2Pad is an investment platform designed to open the world of investments for you. It is said that the main rule of every investor 
                is to diversify their assets, which means to put your eggs in a different baskets.
                    <br/>
                    <p>
                    </p>
                </div>
                <b>
                That is why L2Pad offers you a various assets to invest in, such as:   
                             </b>
                <ul>
                    <li>RWA</li>
                    <li>Business</li>
                    <li>NFT Launch</li>
                    <li>Crypto.</li>
                </ul>
                <p>
                    For that, we have built a website with a simple and convenient 
                    interface. Every project available for investing will have detailed
                     descriptions about terms, perspectives etc. 
                </p>
                <b>
                On the other hand, L2Pad provides an opportunity for aspiring entrepreneurs to receive the help and support they need
                It includes:
                </b>
                <ul>
                    <li>Funding</li>
                    <li>Consulting (legal and accounting)</li>
                    <li>Partnership with other entrepreneurs</li>
                    <li>Advertising, etc.</li>
                </ul>
                <p>
                With L2Pad, the world of investments becomes simple and accessible for everyone.                </p>
                </div>
            </div>
            <div className={styles.features}>
                <SubTitle>
                Why L2Pad?                
                </SubTitle>
                <div className={styles.featuresText}>
                    <p style={{textAlign:'center'}}>
                    Learn from others, share your work, and extend your tool set with a diverse group
                    </p>
                    <div className={styles.featuresColums}>
                        <div className={styles.featuresColum}>
                            <b>Not only money</b>
                            <p >
                                Along with funding, L2Pad offers a capable team of professionals, including lawyers, accountants, business consultants, 
                                and advertising specialists who are willing to help you
                                in any way they can
                            </p>
                        </div>
                        <div className={styles.featuresColum}>
                            <b>24/7</b>
                            <p >
                                Our support is not limited by time. Once you have started - we are always here with you and for you. Step by step we help to move on, we help to overcome, we help to be successful. Our strategy 
                                is simple: Your success 
                                is our success
                            </p>
                        </div>
                        <div className={styles.featuresColum}>
                            <b>Easy and fast </b>
                            <p >
                            Start your own business within minutes with L2Pad
                            and support that we provide
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='portfolio'>
            <Gallery
            text={'Gems which we have invested in'}
            title={'Portfolio'} 
            items={data.portfolio}
            />
        </div>
        <div id='partners' className={styles.partners}>
            <Gallery 
            text={'Projects and companies which we trust to work with'} 
            title={'Partners'} 
            items={data.partners}
            />
        </div>
        <div className={styles.faq}>
            <Accordion items={data.faq} title={'FAQ'} />
        </div>
        <div className={styles.risks}>
            <Accordion items={data.risks} title={'Risks'} />
        </div>
        <div className={styles.roadmap}>
            <Roadmap items={data.roadmap}/>
        </div>
        <div id='contact'>
            <Community/>
        </div>
    </div>
    <CustomAlert
    title={'Ref link activate error'}
    text={'You can`t activate this referral link'}
    handler={() => setIsError(false)}
    isVisible={isError}
    />
    <CustomAlert
    title={'Ref link activated'}
    text={'Account activation was successful!'}
    handler={() => setIsSuccess(false)}
    isVisible={isSuccess}
    type='success'
    />
    </>
  )
}


