
export interface Tarea {
    id: number;
    descripcion: string;
    dificultad: string;
    horas_previstas: number;
    horas_realizadas: number;
    porcentaje_realizacion: number;
    completada: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TareaAsignadaPro {
    id_tarea: number;
    id_usuario: number;
    createdAt: string;
    updatedAt: string;
    tarea: Tarea;
}