import {config} from '../config/api.js'
import updateUserData from '../utils/updateUserData.js'

export default async (data) => {
    try{
        const address = window?.ethereum?.selectedAddress || localStorage.getItem('l2pad-wallet')

        const responce = await fetch(config.createUrl(`user/${address}`),{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })

        const {success,user} = await responce.json()

        if(success){
            updateUserData(user)
        }

        return {success,user}

    }catch(error){
        console.log(error)
        return {success:false,user:{}}
    }
}