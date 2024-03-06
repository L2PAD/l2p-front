import {config} from '../config/api.js'

export default async (address) => {
    try{
        const responce = await fetch(config.createUrl(`user/status/${address}`),)

        const {success,isActive} = await responce.json()

        return {success,isActive}

    }catch(error){
        console.log(error)
        return {success:false,isActive:false}
    }
}