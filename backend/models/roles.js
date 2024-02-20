const mongooose = require ('mongoose');

const rolSchema = new mongooose.Schema({
    nombre: {
        type: String,
        required: true
    }
}, {collection: 'roles' , versionKey:false});

const RolModel = mongooose.model('Rol', rolSchema); 

module.exports = RolModel;


