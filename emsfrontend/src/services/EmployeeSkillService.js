// src/services/EmployeeSkillService.js
import axios from "axios";

// ⚙️ Cambia el puerto si tu backend usa otro (por ejemplo 9090)
const BASE_URL = "http://localhost:9090/api";

/**
 * ============================================================
 * FUNCIONES CRUD RELACIONADAS CON EMPLOYEE - SKILLS
 * ============================================================
 */

/**
 * 🔹 Obtiene todas las relaciones employee-skill
 * (solo si tienes un endpoint general /employee-skills en tu backend)
 */
export const getAllEmployeeSkills = () =>
    axios.get(`${BASE_URL}/employee-skills`).catch(() => []);

/**
 * 🔹 Obtiene todas las skills asignadas a un empleado
 */
export const getSkillsByEmployee = (employeeId) =>
    axios.get(`${BASE_URL}/employees/${employeeId}/skills`);

/**
 * 🔹 Obtiene una relación específica Employee-Skill
 * (usado en el formulario al editar)
 */
export const getEmployeeSkillById = (relationId) =>
    axios.get(`${BASE_URL}/employee-skills/${relationId}`);

/**
 * 🔹 Crea una nueva relación Employee-Skill
 * (usado al crear desde el formulario)
 */
export const createEmployeeSkill = (relation) =>
    axios.post(`${BASE_URL}/employee-skills`, relation);

/**
 * 🔹 Actualiza (reemplaza) una relación Employee-Skill existente
 * (usado al editar en el formulario)
 */
export const updateEmployeeSkill = (relationId, relation) =>
    axios.put(`${BASE_URL}/employee-skills/${relationId}`, relation);

/**
 * 🔹 Elimina una skill específica de un empleado
 * (usado en la tabla EmployeeSkillList)
 */
export const removeSkillFromEmployee = (employeeId, skillId) =>
    axios.delete(`${BASE_URL}/employees/${employeeId}/skills/${skillId}`);

/**
 * ============================================================
 * FUNCIONES AUXILIARES
 * ============================================================
 */

/**
 * 🔹 Obtiene todos los empleados
 */
export const getAllEmployees = () => axios.get(`${BASE_URL}/employees`);

/**
 * 🔹 Obtiene todas las skills disponibles
 */
export const getAllSkills = () => axios.get(`${BASE_URL}/skills`);

/**
 * 🔹 Elimina una relación Employee-Skill
 * Compatible con el endpoint DELETE /api/employee-skills/remove
 */
export const deleteEmployeeSkill = async (employeeId, skillId) => {
    try {
        const payload = { employeeId, skillId };
        const response = await axios.delete(`${BASE_URL}/employee-skills/remove`, { data: payload });
        return response.data;
    } catch (error) {
        console.error("❌ Error al eliminar habilidad del empleado:", error);
        throw error;
    }
};
