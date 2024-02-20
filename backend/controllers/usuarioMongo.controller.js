const Usuario = require('../models/user.js');
const { generarJWT } = require('../helpers/generate_jwt.js');

//LOGIN CON TOKEN
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email: email, password: password });

        if (usuario) {
            console.log('Usuario iniciado' + usuario.id);
            const token = generarJWT(usuario.id)
            console.log(usuario)
            console.log(token);
            res.status(200).json({ usuario, token });
        } else {
            console.log('Usuario no encontrado!');
            res.status(404).json({ 'msg': 'Usuario no encontrado' });
        }

    } catch (error) {
        console.error('Fallo en el inicio de sesión', error);
        res.status(500).json({ 'msg': 'Error al iniciar sesión' });
    }
}

const esAdmin = async (id_usuario) => {
    try {
        let resultado = await RolAsignado.find({ id_usuario: id_usuario }, 'id_rol');
        return resultado;
    } catch (error) {
        console.error('Error al buscar el rol del usuario:', error);
        throw error;
    }
}


// REGISTRARSE
const registro = async (req, res) => {
    const { id, nombre, email, password } = req.body;

    try {
        const usuario = await Usuario.create(req.body);
        console.log('Usuario registrado correctamente!');
        res.status(201).json(usuario);
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ 'msg': 'Error al regristrar el usuario' });
    }
}

//ALTA USUARIO
const altaUsuario = async (req, res) => {
    const { id, nombre, email, password } = req.body;

    try {
        const usuario = await Usuario.create(req.body);
        console.log('Usuario registrado correctamente!');
        res.status(201).json(usuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ 'msg': 'Error al crear usuario' });
    }
}

//BAJA USUARIO
const bajaUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.deleteOne({ id: req.params.id });
        if (usuario.deletedCount > 0) {
            console.log('Usuario eliminado');
            res.status(200).json(usuario);
        } else {
            console.log('Usuario no encontrado!');
            res.status(404).json({ 'msg': 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ 'msg': 'Error al eliminar usuario' });
    }

}

//MODIFICAR USUARIO
const modificarUsuario = async (req, res) => {
    const { id, nombre, email, password } = req.body;

    try {

        const usuario = await Usuario.updateOne({ id: req.params.id }, req.body, { new: true }); //new es optativo
        if (usuario) {
            console.log('Usuario modificado');
            res.status(200).json(usuario);
        } else {
            console.log('Usuario no encontrado');
            res.status(404).json({ 'msg': 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al modificar el usuario:', error);
        res.status(500).json({ 'msg': 'Error al modificar el usuario' });
    }
};

// CAMBIAR PASSWORD
const cambiarPassword = async (req, res) => {

    const { password } = req.body;

    try {
        const usuario = await Usuario.updateOne({ email: req.params.email }, req.body, { new: true });
        if (usuario) {
            console.log('Contraseña modificada');
            res.status(200).json(usuario);
        } else {
            console.log('Usuario no encontrado');
            res.status(404).json({ 'msg': 'Usuario no ebcontrado' });
        }
    } catch (error) {
        console.error('Error al cambiar la contraseña', error);
        res.status(500).json({ 'msg': 'Error al cambiar la contraseña' });
    }

}

const usuarioGet = async (req, res) => {

    try {
        const usuario = await Usuario.find({id: req.params.id});
        if (usuario.length > 0)  {
            console.log('Usuario encontrado!');
            res.status(200).json(usuario);
        } else {
            console.log('Usuario no encontrado!');
            res.status(404).json({ 'msg': 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ 'msg': 'Error al obtener usuario por ID' });
    }
} 


module.exports = {
    login,
    registro,
    cambiarPassword,
    altaUsuario,
    bajaUsuario,
    modificarUsuario,
    usuarioGet,
    esAdmin
}