
import axiosConfig from "./axiosConfig"
import { serverURL } from "./serverURL"


// teacher login api
export const getTeacherLoginAPI = async () => {
    return await axiosConfig("GET", `${serverURL}/teachers`)
}