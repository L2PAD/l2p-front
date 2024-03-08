import { useCallback , useEffect, useState} from "react"
import { useDispatch } from "react-redux"
import { setUserData } from "../store/slices/authSlice"
import auth from "../services/auth"
import getInviter from '../utils/getInviterInfo'
import balanceParse from "../utils/balanceParse"

export default function useAuth() {
    const [adderss,setAddress] = useState('')
    const dispatch = useDispatch()
    
    const disconnectHandler = useCallback(() => {
        localStorage.removeItem('userData')
        localStorage.removeItem('l2pad-auth')
        dispatch(setUserData({address:'',balance:'',isAuth:false,favourites:[]}))
    },[])

    const changeAccount = useCallback( (data = '') => {
        try{
            let address = window?.ethereum?.selectedAddress
            const inviter = getInviter()
   
            balanceParse(address.toString()).then(async (balance) => {
                const authData = {
                    address:address.toString().toLowerCase(),
                    balance,
                }
           
                if(inviter?.user?.address){
                    authData.inviter = inviter.user.address
                }

                const {success,user} = await auth(authData)
        
                setAddress(address.toString().toLowerCase())
                
                const isAuth = 
                user?.twitterData?.username 
                && 
                user?.telegramData?.username 
                && 
                window?.ethereum?.selectedAddress
                &&
                user.isActive 

                if(success){
                    localStorage.setItem('l2pad-wallet',window?.ethereum?.selectedAddress)
                    dispatch(setUserData({...user,isAuth:isAuth}))
                    setTimeout(() => {
                        window.location.reload()
                    },100)
                }
            })
        }catch(error){
            console.log(error)
        }
    },[adderss])

    const checkAuth = async () => {
        try{
            const isConnect = localStorage.getItem('l2pad-auth')
      
            if(isConnect === 'false') return 
            
            const authData = {
                address:window?.ethereum?.selectedAddress,
            }
            
            const {success,user} = await auth(authData)

            const isAuth = 
            user?.twitterData?.username 
            && 
            user?.telegramData?.username 
            && 
            window?.ethereum?.selectedAddress
            &&
            user.isActive 
            
            if(success){
                localStorage.setItem('l2pad-wallet',window?.ethereum?.selectedAddress)
                dispatch(setUserData({...user,isAuth:isAuth}))
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))

        if(userData?.address){
            dispatch(setUserData(userData))
        }

        checkAuth()

        setTimeout(() => {
            if(!window?.ethereum?.selectedAddress){
                disconnectHandler()
                return
            }
        },1500)
    },[])
  
  return {disconnectHandler,changeAccount,adderss}
}
