const mongooose = require ('mongoose');

const rolAsignadoSchema = new mongooose.Schema({
    id_rol: {
        type: Number,
        required: true
    },
    id_usuario: {
        type: Number,
        required: true
    }
}, {collection: 'rol_asignados' , versionKey:false});

const RolAsignadoModel = mongooose.model('rol_asignados', rolAsignadoSchema);

module.exports = RolAsignadoModel;

