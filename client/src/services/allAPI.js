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

export const registerStudentAPI = async (data) => {
  return await commonAPI("POST", `${serverURL}/students`, data);
};

export const getStudentAPI = async () => {
  return await commonAPI("GET", `${serverURL}/students`, {});
};

export const deleteStudentAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/students/${id}`, {});
};

export const updateStudentAPI = async (id, data) => {
  return await commonAPI("PUT", `${serverURL}/students/${id}`, data);
};

export const registerAttendanceAPI = async (data) => {
  return await commonAPI("POST", `${serverURL}/attendance`, data);
};

export const getAttendanceAPI = async () => {
  return await commonAPI("GET", `${serverURL}/attendance`, {});
};

export const updateAttendanceAPI = async (id, data) => {
  return await commonAPI("PUT", `${serverURL}/attendance/${id}`, data);
};

export const deleteAttendanceAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/attendance/${id}`, {});
};

export const registerExamAPI = async (data) => {
  return await commonAPI("POST", `${serverURL}/exams`, data);
};

export const getExamAPI = async () => {
  return await commonAPI("GET", `${serverURL}/exams`, {});
};

export const updateExamAPI = async (id, data) => {
  return await commonAPI("PUT", `${serverURL}/exams/${id}`, data);
};

export const deleteExamAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/exams/${id}`, {});
};

export const registerResultAPI = async (data) => {
  return await commonAPI("POST", `${serverURL}/results`, data);
};

export const getResultAPI = async () => {
  return await commonAPI("GET", `${serverURL}/results`, {});
};

export const updateResultAPI = async (id, data) => {
  return await commonAPI("PUT", `${serverURL}/results/${id}`, data);
};

export const deleteResultAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/results/${id}`, {});
};

export const registerTimetableAPI = async (data) => {
  return await commonAPI("POST", `${serverURL}/timetables`, data);
};

export const getTimetableAPI = async () => {
  return await commonAPI("GET", `${serverURL}/timetables`, {});
};

export const updateTimetableAPI = async (id, data) => {
  return await commonAPI("PUT", `${serverURL}/timetables/${id}`, data);
};

export const deleteTimetableAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/timetables/${id}`, {});
};

