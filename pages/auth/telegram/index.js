import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import Loader from '../../../app/assets/components/loader/Loader'
import updateUser from '../../../app/services/updateUser'

export default function AuthTwitter () {
    const [loading,setLoading] = useState(true)
    const router = useRouter()
    const params = router.query

    useEffect(() => {
        const telegramAuth = async () => {
            if(Object.values(router.query).length){
              const {success,user} = await updateUser({telegramData:router.query})
              setLoading(false)
              if(success){
                  router.push('/invite')
              }
            }
        }
        if(params?.name){
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