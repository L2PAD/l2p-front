import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from '../../app/components/head/Head'
import getUserById from '../../app/services/getUserById'
import getUserData from '../../app/utils/getUserData'

const RefPage = () => {
    const router = useRouter()
    const { slug } = router.query

    const getUser = async () => {        
        const id = slug[0]
        const code = slug[1]
        const {success,user} = await getUserById(id)

        const currentUserData = getUserData()

        if(currentUserData?._id === id){
            router.push('/info?error=true')
            return
        }
        
        if(user && success){
            localStorage.setItem('noname-inviter',JSON.stringify({id,user}))
            localStorage.setItem('l2pad-code',code)
            router.push('/invite')
        }
    } 

    useEffect(() => {
        if(!slug) return

        getUser()
    },[slug])

    return (
      <>
        <Head title={'Referral'}/>
      </>
    );
}

export default RefPage;


