import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { UserPlus, Mail, Building2, Award, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function EmployeePage() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    // Cargar empleados al inicio
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await api.get("/employees");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "¿Eliminar empleado?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
        });

        if (confirm.isConfirmed) {
            try {
                await api.delete(`/employees/${id}`);
                Swal.fire("Eliminado", "El empleado fue eliminado con éxito.", "success");
                fetchEmployees();
            } catch (error) {
                Swal.fire("Error", "No se pudo eliminar el empleado.", "error");
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* 🔹 HEADER */}
            <div className="flex justify-between items-center bg-white shadow-sm rounded-xl p-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">👥 Employee List</h1>
                    <p className="text-gray-500 text-sm">
                        Lista de todos los empleados registrados en el sistema EMS.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/employees/add")}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                    <UserPlus size={18} />
                    Add Employee
                </button>
            </div>

            {/* 🔹 EMPLOYEE TABLE */}
            <div className="bg-white shadow-md rounded-xl p-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-blue-50 text-left text-gray-700 text-sm uppercase">
                        <th className="p-3 rounded-tl-lg">#</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Skills</th>
                        <th className="p-3 rounded-tr-lg text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.length > 0 ? (
                        employees.map((emp, index) => (
                            <tr
                                key={emp.id}
                                className={`border-b hover:bg-gray-50 ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                            >
                                <td className="p-3 font-medium text-gray-700">{index + 1}</td>
                                <td className="p-3 flex items-center gap-2 text-gray-800 font-semibold">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 flex items-center justify-center rounded-full font-bold">
                      {emp.name ? emp.name.charAt(0).toUpperCase() : "?"}
                    </span>
                                    {emp.name}
                                </td>
                                <td className="p-3 text-gray-600 flex items-center gap-1">
                                    <Mail size={14} className="text-gray-400" /> {emp.email}
                                </td>
                                <td className="p-3 text-gray-600 flex items-center gap-1">
                                    <Building2 size={14} className="text-gray-400" />{" "}
                                    {emp.department?.name || "—"}
                                </td>
                                <td className="p-3 text-gray-600 flex items-center gap-1">
                                    <Award size={14} className="text-gray-400" />{" "}
                                    {emp.skills?.map((s) => s.name).join(", ") || "—"}
                                </td>
                                <td className="p-3 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => navigate(`/employees/edit/${emp.id}`)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            title="Edit"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(emp.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="6"
                                className="text-center py-8 text-gray-500 italic"
                            >
                                No employees found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
