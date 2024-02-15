const { User, Rol_Asignado } = require('../models'); 

const esAdmin = async (req, res, next) => {
    if (!req.idToken) {
        return res.status(500).json({'msg':'No es posible el acceso como administrador.'});
    }

    try {

        const usuario = await User.findOne({
            where: { id: req.idToken }
        });

        if (!usuario) {
            return res.status(404).json({'msg':'Usuario no encontrado.'});
        }

        const rolAsignado = await Rol_Asignado.findOne({
            where: { id_usuario: usuario.id }
        });

        if (!rolAsignado || rolAsignado.id_rol !== 1) {
            return res.status(403).json({'msg':'Acceso denegado. No tienes permisos de administrador.'});
        }

        console.log(usuario.nombre + " accediendo como administrador.");
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({'msg':'Error al verificar el rol del usuario.', 'error': error.message});
    }
};

module.exports = {
    esAdmin
};