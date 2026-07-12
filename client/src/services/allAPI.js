// import commonAPI from "./commonAPI"
import commonAPI from "./axiosConfig"
import { serverURL } from "./serverURL"

export const registerAPI = async (data)=>{
    return await commonAPI("POST", `${serverURL}/principal`, data)
}

export const loginAPI = async ()=>{
    return await commonAPI("GET", `${serverURL}/principal`,{})
}

export const registerTeacherAPI = async (data)=>{
    return await commonAPI("POST", `${serverURL}/teachers`,data)
}

export const getTeacherAPI = async ()=>{
    return await commonAPI("GET", `${serverURL}/teachers`,{})
}

export const deleteTeacherAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/teachers/${id}`, {});
}


export const updateTeacherAPI = async (id, data) => {
    return await commonAPI("PUT", `${serverURL}/teachers/${id}`, data);
}


export const registerNoticeAPI = async (data) => {
    return await commonAPI("POST", `${serverURL}/notices`, data);
}

export const getNoticeAPI = async () => {
    return await commonAPI("GET", `${serverURL}/notices`, {});
}

export const deleteNoticeAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/notices/${id}`, {});
}

export const updateNoticeAPI = async (id, data) => {
    return await commonAPI("PUT", `${serverURL}/notices/${id}`, data);
}