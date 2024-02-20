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
}, {collection: 'tarea_asignadas' , versionKey:false});

const TareaAsignadaModel = mongooose.model('TareaAsignada', tareaAsignadaSchema);

module.exports = TareaAsignadaModel;

