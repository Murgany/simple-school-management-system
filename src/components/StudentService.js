import http from "../http-common";


const token = "Token " + sessionStorage.getItem("token")

let config = {
    headers: {
      "Authorization": "Token " + sessionStorage.getItem("token"),
      "Accept-Language" : "ar",
    },
  };

const getUser = (id) => {return http.get("user", {
    headers: {
        "Authorization": `Token ${token}`
    }
})};

const getAllStudents = () => {return http.get("student_info", config)};
const viewStudent = id => {return http.get(`student_info/${id}`)};
const createStudent = data => {return http.post("student_info", data, config)};
const updateStudent = (id, data) => {return http.put(`student_info/${id}`, data, config)};
const deleteStudent = id => {return http.delete(`student_info/${id}`, config)};
const filteredNames = name => {return http.get(`student_info?name=${name}`)};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

export default {
  getAllStudents,
  viewStudent, 
  createStudent, 
  updateStudent, 
  deleteStudent, 
  filteredNames, 
  getUser
};