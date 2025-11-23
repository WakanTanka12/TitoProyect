package com.app.emsx.dtos.skill;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

/**
 * 🧠 SkillRequest
 * -----------------------------------------------------
 * DTO para crear o actualizar habilidades.
 * Permite opcionalmente asociar empleados mediante sus IDs.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillRequest {

    @NotBlank(message = "El nombre de la habilidad no puede estar vacío.")
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres.")
    private String name;

    @Size(max = 255, message = "La descripción no puede superar los 255 caracteres.")
    private String description;

}
