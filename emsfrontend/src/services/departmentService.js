import axios from "axios";

const API_URL = "http://localhost:9090/api/departments";

export const getAllDepartments = () => axios.get(API_URL);
export const getDepartmentById = (id) => axios.get(`${API_URL}/${id}`);
export const createDepartment = (department) => axios.post(API_URL, department);
export const updateDepartment = (id, department) => axios.put(`${API_URL}/${id}`, department);
export const deleteDepartment = (id) => axios.delete(`${API_URL}/${id}`);
