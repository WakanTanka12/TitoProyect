import axios from "axios";

const API_URL = "http://localhost:9090/api/skills";

export const getAllSkills = () => axios.get(API_URL);
export const getSkillById = (id) => axios.get(`${API_URL}/${id}`);
export const createSkill = (skill) => axios.post(API_URL, skill);
export const updateSkill = (id, skill) => axios.put(`${API_URL}/${id}`, skill);
export const deleteSkill = (id) => axios.delete(`${API_URL}/${id}`);
