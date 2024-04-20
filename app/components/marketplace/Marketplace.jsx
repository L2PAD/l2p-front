import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrency } from '../../store/slices/currencySlice'
import { toggleModal } from '../../store/slices/modalsSlice'
import { marketDecimals,marketChainIdValue } from '../../config/provider'
import { ethers } from 'ethers'
import SwitchModal from '../../assets/components/switchModal/SwitchModal'
import CurrencyCheckbox from '../../assets/components/currencyCheckbox/CurrencyCheckbox'
import Image from 'next/image'
import Info from '../../assets/components/info/Info'
import CollectionsFilter from '../../assets/components/collectionsFilter/CollectionsFilter'
import Collections from '../collections/Collections'
import ListForSale from '../../assets/components/ListForSale/ListForSale'
import listForSaleSvg from '../../assets/icons/listForSale.svg'
import styles from '../styles/marketplace.module.scss'

async function changeNetwork(){
    const result = await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: '0x144',
        rpcUrls: ["https://mainnet.era.zksync.io"],
        chainName: "zkSync Era Mainnet",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: marketDecimals
        },
        blockExplorerUrls: ["https://explorer.zksync.io/"]
      }]
    });
}
  

export default function Marketplace({collectionsData}) {
    const [openSwitchModal, setOpenSwitchModal] = useState(false)
    const [collections,setCollection] = useState(collectionsData)
    const listForSaleVisible = useSelector((state) => state.modals.listForSale.state)
    const currenyItems = useSelector((state) => state.currency.currencyArray)
    const dispatch = useDispatch() 

    const filterCollections = (filterValue) => {
        if(filterValue === 'all'){
            setCollection(collectionsData)

            return
        }

        const filteredCollections = collectionsData.filter((collection) => {
            return collection.type === filterValue
        })

        setCollection(filteredCollections)
    }

    const changeCurrency = () => {
        dispatch(setCurrency())
    }

    const modalHandler = (event) => {
        if(event.target.id === 'toggle-modal'){
            dispatch(toggleModal('listForSale'))
        }
    }

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

           if (chainId.chainId != marketChainIdValue){
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
    <SwitchModal
    network='zkSync'
    handler={switchModalHandler} 
    isVisible={openSwitchModal}/>
    <div className={styles.body}>
        <Info
        title={'NFT Market'}
        />
        <div className={styles.subTitle}>
        NFTs marketplace for Blast projects where you can buy/sell your NFT.
        </div>
        <div className={styles.description}>
        L2PAD has developed its own NFT Marketplace so you can easily trade your NFTs. You no longer have to look for other places to trade. L2PAD has everything you need for comfortable investing and dealing with your assets.
        </div>
        <div className={styles.collectionsWrapper}>
            <div className={styles.head}>
                <CollectionsFilter
                handleFilterChange={filterCollections}
                />
                <button 
                onClick={() => dispatch(toggleModal('listForSale'))} 
                className={styles.listBtn}>
                    <span>List for sale</span>
                    <Image src={listForSaleSvg} alt='list for sale'/>
                </button>
            </div>
            <div className={styles.currencySelect}>
                <CurrencyCheckbox
                items={currenyItems}
                hanlder={changeCurrency}
                />
            </div>
            <div className={styles.collections}>
                {
                    collections.length 
                    ?
                    <Collections collections={collections}/>
                    :
                    <div className={styles.notFound}>
                    Not found collections with current filter...
                    </div>
                }
            </div>
        </div>
    </div>
    <ListForSale 
    collections={collectionsData}
    isVisible={listForSaleVisible} 
    handler={modalHandler}
    />
    </>
  )
}
