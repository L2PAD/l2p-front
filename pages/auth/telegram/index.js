import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import activateCode from '../../../app/services/activateCode'
import Loader from '../../../app/assets/components/loader/Loader'
import updateUser from '../../../app/services/updateUser'

export default function AuthTwitter () {
    const [loading,setLoading] = useState(true)
    const router = useRouter()
    const params = router.query

    const activateAccount = async () => {
        const codeValue = localStorage.getItem('l2pad-code')

        const {success} = await activateCode(codeValue)

        localStorage.setItem('l2pad-auth',success)

        router.push(`/info?activated=${success}`)
    }

    useEffect(() => {
        const telegramAuth = async () => {
            if(Object.values(router.query).length){
              const {success,user} = await updateUser({telegramData:router.query})

              if(success){
                await activateAccount() 
              }

              setLoading(false)
            }
        }
        if(params?.name || params?.username){
            telegramAuth()
        }
    },[params])
    
    if(loading){
        return (
            <Loader/>
        )
    }
    return (
        <>
        </>
    )

}