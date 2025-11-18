import axios from "axios";

const API_URL = "http://localhost:9090/api/employees";
const DEPT_URL = "http://localhost:9090/api/departments";
const SKILL_URL = "http://localhost:9090/api/skills";
const DEPENDENT_URL = "http://localhost:9090/api/dependents";

export const getAllEmployees = () => axios.get(API_URL);
export const getEmployeeById = (id) => axios.get(`${API_URL}/${id}`);
export const createEmployee = (employee) => axios.post(API_URL, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);

// Related data
export const getAllDepartments = () => axios.get(DEPT_URL);
export const getAllSkills = () => axios.get(SKILL_URL);
export const getDependentsByEmployee = (id) => axios.get(`${DEPENDENT_URL}/byEmployee/${id}`);
