import { useEffect,useState } from 'react'
import { ethers } from "ethers";
import { chainIdValue,decimals } from '../../config/provider'
import Welcome from '../welcome/Welcome'
import Banner from '../banner/Banner'
import Projects from '../projects/Projects'
import Community from '../community/Community'
import HTMLReactParser from 'html-react-parser'
import SwitchModal from '../../assets/components/switchModal/SwitchModal'
import styles from '../styles/main.module.scss'

async function changeNetwork(){
  const result= await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
      chainId: '0x13e31',
      rpcUrls: ["https://rpc.blast.io"],
      chainName: "Blast",
      nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: decimals
      },
      blockExplorerUrls: ["https://blastscan.io"]
    }]
  });
}

export default function Main({type,info,projects}) {
  const [openSwitchModal, setOpenSwitchModal] = useState(false)

  const switchModalHandler= (event) => {
    if(typeof event !== 'string' && event.target.id === 'toggle-modal'){
      event.stopPropagation()
      setOpenSwitchModal(false)
      return
    }

    if(event == 'active_switch') {
      changeNetwork().then(result => setOpenSwitchModal(false))
      setOpenSwitchModal(false)
      return
    }
  }
  
  useEffect(() => {
    async function getStatus() {
      try{
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const chainId = await provider.getNetwork()
    
       if (chainId.chainId!=chainIdValue){
         return true
       }
      } catch (err) {
       return false
     }
      return false
    }
    getStatus().then((value) => setOpenSwitchModal(value))
  },[])

  return (
    <>
    <SwitchModal handler={switchModalHandler} isVisible={openSwitchModal}/>
    <main className={styles.main}>
      <Welcome type={type}/>
      <div className={styles.pageInfo}>
          <div className={styles.pageInfoTitle}>
            {info.title}
          </div>
          <div className={styles.pageInfoBody}>
            {HTMLReactParser(info.description)}
          </div>
      </div>
      <Projects allProjects={projects} type={type} />
      <Banner/>
      <Community/>
    </main>
    </>
  )
}
