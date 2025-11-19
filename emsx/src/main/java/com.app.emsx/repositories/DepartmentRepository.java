package com.app.emsx.repositories;

import com.app.emsx.entities.Department;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 🏢 DepartmentRepository
 * -----------------------------------------------------
 * Permite acceder y consultar la entidad Department.
 */
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    /**
     * ✅ Verifica si existe un departamento con el nombre dado.
     * Spring Data JPA genera automáticamente la query:
     * SELECT COUNT(*) > 0 FROM departments WHERE name = ?
     */
    boolean existsByName(String name);
    @Override
    @EntityGraph(attributePaths = {"employees"})
    List<Department> findAll();
}
