export function validar( descripcion: string, dificultad: string, horas_previstas: number, horas_realizadas: number, porcentaje: number, completada: boolean): string {

    if (descripcion.length < 4) {
        return 'La descripcion debe tener al menos 4 caracteres';
    }

    if (porcentaje >= 0 && porcentaje > 100) {
        return 'El porcentaje debe ser mayor que 0';
    }

    return '';
}