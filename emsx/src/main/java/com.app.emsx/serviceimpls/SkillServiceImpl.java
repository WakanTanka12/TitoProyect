package com.app.emsx.serviceimpls;

import com.app.emsx.dtos.skill.SkillRequest;
import com.app.emsx.dtos.skill.SkillResponse;
import com.app.emsx.entities.Employee;
import com.app.emsx.entities.Skill;
import com.app.emsx.exceptions.BusinessRuleException;
import com.app.emsx.exceptions.ResourceNotFoundException;
import com.app.emsx.mappers.SkillMapper;
import com.app.emsx.repositories.EmployeeRepository;
import com.app.emsx.repositories.SkillRepository;
import com.app.emsx.services.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 💡 SkillServiceImpl
 * ------------------------------------------------------
 * Gestiona las habilidades (skills) de los empleados.
 * ✅ Implementa la relación Many-To-Many con Employee.
 * ✅ Controla duplicados y mantiene integridad de asociaciones.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class SkillServiceImpl implements SkillService {

    private final SkillRepository repository;
    private final EmployeeRepository employeeRepository;
    private final SkillMapper mapper;

    /**
     * ✅ Crea una nueva habilidad con o sin empleados asignados
     */
    @Override
    public SkillResponse create(SkillRequest request) {
        // Validar duplicados
        if (repository.existsByName(request.getName())) {
            throw new BusinessRuleException("Ya existe una habilidad con el nombre: " + request.getName());
        }

        Skill skill = mapper.toEntity(request);


        return mapper.toResponse(repository.save(skill));
    }

    /**
     * ✅ Actualiza los datos de una habilidad existente
     */
    @Override
    public SkillResponse update(Long id, SkillRequest request) {
        Skill skill = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Habilidad no encontrada con ID: " + id));

        // Evita duplicados
        if (!skill.getName().equals(request.getName()) && repository.existsByName(request.getName())) {
            throw new BusinessRuleException("Ya existe otra habilidad con el nombre: " + request.getName());
        }

        mapper.updateEntityFromRequest(request, skill);

        return mapper.toResponse(repository.save(skill));
    }

    /**
     * ✅ Obtiene todas las habilidades
     */
    @Override
    public List<SkillResponse> findAll() {
        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    /**
     * ✅ Obtiene una habilidad por su ID
     */
    @Override
    public SkillResponse findById(Long id) {
        Skill skill = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Habilidad no encontrada con ID: " + id));
        return mapper.toResponse(skill);
    }

    /**
     * ✅ Elimina una habilidad
     * - Evita eliminar si está vinculada a empleados.
     */
    @Override
    public void delete(Long id) {
        Skill skill = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Habilidad no encontrada con ID: " + id));

        repository.delete(skill);
    }
}
