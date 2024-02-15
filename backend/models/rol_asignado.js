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
}, {collection: 'Rol_Asignados' , versionKey:false});

const RolAsignadoModel = mongooose.model('Rol_Asignado', rolAsignadoSchema);

module.exports = RolAsignadoModel;

