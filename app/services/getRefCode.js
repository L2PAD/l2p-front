import { config } from "../config/api"

export default async () => {
    try{
        const address = window?.ethereum?.selectedAddress
        
        const response = await fetch(config.createUrl(`user/code/${address}`),{
            method:'GET',
        })

        const {success,code} = await response.json()

        return {success,code}
    }catch(error){
        console.log(error)

        return {success:false}
    }
}