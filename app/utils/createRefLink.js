import { host } from "../config/api"        

export default (id,code) => {
    return `${host}ref/${id}/${code}`
}