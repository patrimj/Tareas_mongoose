const mongooose = require ('mongoose');

const tareaAsignadaSchema = new mongooose.Schema({
    id_tarea: {
        type: Number,
        required: true
    },
    id_usuario: {
        type: Number,
        required: true
    }
}, {collection: 'Tarea_Asignadas' , versionKey:false});

const TareaAsignadaModel = mongooose.model('Tarea_Asignada', tareaAsignadaSchema);

module.exports = TareaAsignadaModel;

