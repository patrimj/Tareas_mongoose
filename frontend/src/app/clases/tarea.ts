export class Tarea {

    constructor(
        public id: number,
        public descripcion: string,
        public dificultad: string,
        public horas_previstas: number,
        public horas_realizadas: number,
        public porcentaje_realizacion: number,
        public completada: boolean,
    ) {

    }
}
