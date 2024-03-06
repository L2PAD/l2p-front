import {config} from '../config/api.js'

export default async (code) => {
    try{
        const address = window?.ethereum?.selectedAddress 

        const responce = await fetch(config.createUrl(`user/code/activate/${code}/${address}`),{
            method:'POST',
        })

        const {success} = await responce.json()

        return {success}

    }catch(error){
        console.log(error)
        return {succes:false}
    }
}