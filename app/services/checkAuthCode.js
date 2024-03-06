import {config} from '../config/api.js'

export default async (code) => {
    try{
        const responce = await fetch(config.createUrl(`user/code/${code}`),{
            method:'POST',
        })

        const {success} = await responce.json()

        return {success}

    }catch(error){
        console.log(error)
        return {succes:false}
    }
}