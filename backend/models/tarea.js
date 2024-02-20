const mongooose = require ('mongoose');

const tareaSchema = new mongooose.Schema({
    descripcion: {  
        type: String,
        required: true
    },
    dificultad: {
        type: String,
        required: true
    },  
    horas_previstas: {
        type: Number,
        required: true
    },
    horas_realizadas: {
        type: Number,
        required: true
    },
    porcentaje_realizacion: {
        type: Number,
        required: true
    },
    completada: {
        type: Boolean,
        required: true
    }
}, {collection: 'tareas' , versionKey:false});

const TareaModel = mongooose.model('Tarea', tareaSchema);

module.exports = TareaModel;

