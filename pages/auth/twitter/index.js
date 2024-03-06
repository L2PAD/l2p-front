import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import Loader from '../../../app/assets/components/loader/Loader'
import updateUser from '../../../app/services/updateUser'

export default function AuthTwitter () {
    const [loading,setLoading] = useState(true)
    const router = useRouter()
    const params = router.query

    useEffect(() => {
        const twitterAuth = async () => {
            if(Object.values(router.query).length){
                console.log(router.query)
              const {success,user} = await updateUser({twitterData:router.query})
              setLoading(false)
              if(success){
                  router.push('/invite')
              }
            }
        }
        if(params?.name){
            twitterAuth()
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