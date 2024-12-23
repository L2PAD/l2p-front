import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import useAuth from "./useAuth";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../store/slices/modalsSlice";


export default function useWallet() {
    const {disconnectHandler,changeAccount} = useAuth()
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    
    async function connectWallet (walletType) {
        try{
          setLoading(true)
          let providerOptions = null
          
          if(walletType === 'Metamask'){
            providerOptions = {}
          }
          if(walletType === 'TrustWallet'){
            providerOptions = {
              package: WalletConnectProvider,
              options: {
                infuraId: 'c3aa2dd660a1a5a1922e0dbdfc712912',
              }
            }
          }
      
          if(!providerOptions){
            return {success:false,account:''}
          }
      
          let web3modal = new Web3Modal({
            network:'mainnet',
            cacheProvider:false,
            providerOptions,
          })
          
          web3modal.on('connect',changeAccount)
          web3modal.on('accountsChanged',changeAccount)
          web3modal.on('disconnect',disconnectHandler)

          const web3ModalInstance = await new web3modal.connect()
          const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance)
          const web3Accounts = await web3ModalProvider.listAccounts();
          
          // setTimeout(() => {
          //   dispatch(closeModal('wallet'))
          // },100)  

          setLoading(false)
        }catch(e){
          console.log(e)
        }
    }

  return {connectWallet,loading}
}
