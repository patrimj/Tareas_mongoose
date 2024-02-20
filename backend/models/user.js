const mongooose = require ('mongoose');

const userSchema = new mongooose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
}, {collection: 'Users' , versionKey:false});

const UserModel = mongooose.model('User', userSchema);

module.exports = UserModel;
