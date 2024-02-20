const UserModel = require('../models/user');
const RolAsignadoModel = require('../models/rol_asignado');

const esAdmin = async (req, res, next) => {
    console.log('idToken:', req.idToken);  

    if (!req.idToken) {
        return res.status(500).json({ 'msg': 'No es posible el acceso como administrador.' });
    }

    try {

        const usuario = await UserModel.findOne({ id: req.idToken });

        console.log('Usuario:', usuario);  

        if (!usuario) {
            return res.status(404).json({ 'msg': 'Usuario no encontrado.' });
        }

        console.log (usuario.id);
        id_usuario = Number(usuario.id);
        const rolAsignado = await RolAsignadoModel.findOne({ id_usuario: id_usuario });

        console.log('Rol asignado:', rolAsignado); 


        if (!rolAsignado || rolAsignado.id_rol !== 1) {
            return res.status(403).json({ 'msg': 'Acceso denegado. No tienes permisos de administrador.' });
        }

        console.log(usuario.nombre + " accediendo como administrador.");
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 'msg': 'Error al verificar el rol del usuario.', 'error': error.message });
    }
};

module.exports = {
    esAdmin
};