import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async () => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl('users'),{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })

        const {success,users} = await responce.json()
        return {success,users}
    }catch(error){
        console.log(error)
        return {success:false,users:[]}
    }
}