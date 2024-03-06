import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id,points) => {
    try{
        const token = getToken()

        const username = localStorage.getItem('admin')
        
        if(username !== 'admin'){
            return {success:false}
        }

        const responce = await fetch(config.createUrl(`user/points/${id}/${points}`),{
            method:'PATCH',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })
        const {success} = await responce.json()

        return {success}
    }catch(error){
        console.log(error)

        return {success:false}
    }
}