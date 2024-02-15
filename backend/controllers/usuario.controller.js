const { response, request } = require('express');
const ConexionUsuario = require('../database/usuario.conexion');
const { generarJWT } = require('../helpers/generate_jwt');

//LOGIN SIN TOKEN 

/*const login = (req = request, res = response) => {
    const conx = new ConexionUsuario();

    conx.login(req.body.email, req.body.password)
        .then(msg => {
            console.log('Usuario iniciado');
            res.status(201).json(msg);
        })
        .catch(err => {
            console.log('Fallo en el inicio de sesión');
            console.log(err);
            res.status(203).json(err);
        })
}*/

//LOGIN CON TOKEN
const login = (req = request, res = response) => {
    const conx = new ConexionUsuario();

    conx.login(req.body.email, req.body.password)
        .then(usu => {
            if (usu) {
                console.log('Usuario iniciado' + usu.id);
                const token = generarJWT(usu.id)
                console.log(usu)
                console.log(token);
                res.status(200).json({usu, token});
            } else {
                console.log('No se encontró ningún usuario con ese correo electrónico y contraseña');
                res.status(400).json({error: 'No se encontró ningún usuario con ese correo electrónico y contraseña'});
            }
        })
        .catch(err => {
            console.log('Fallo en el inicio de sesión');
            console.log(err);
            res.status(203).json(err);
        })
}

// REGISTRARSE
const registro = (req, res = response) => {
    const conx = new ConexionUsuario();

    conx.registro(req.body)
        .then(msg => {
            console.log('Registrado correcto!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('Error al registrarse');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

// CAMBIAR PASSWORD
const cambiarPassword = (req, res = response) => {
    const conx = new ConexionUsuario();

    conx.cambiarPassword(req.params.email, req.body.password)
        .then(msg => {
            console.log('Contraseña modificada correctamente!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No se pudo modificar la contraseña');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

//ALTA USUARIO
const altaUsuario = (req, res = response) => {
    const conx = new ConexionUsuario();

    conx.altaUsuario(req.body)
        .then(msg => {
            console.log('usuario dado de alta correctamente!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('el usuario no se ha podido dar de alta');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

//BAJA USUARIO
const bajaUsuario = (req, res = response) => {  
    const conx = new ConexionUsuario();

    conx.bajaUsuario(req.params.id)
        .then(msg => {
            console.log('usuario dado de baja correctamente!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('el usuario no se ha podido dar de baja');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

//MODIFICAR USUARIO
const modificarUsuario = (req, res = response) => {
    const conx = new ConexionUsuario();

    conx.modificarUsuario(req.params.id, req.body)
        .then(msg => {
            console.log('usuario modificado correctamente !');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('el usuario no se ha podido modificar');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

const esAdmin = (req, res = response) => {
    const conx = new ConexionUsuario();

    conx.esAdmin(req.params.id_usuario)
        .then(msg => {
            console.log('los roles del usuario !');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log(err)
            console.log('el usuario no se ha podiod encontrar');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

module.exports = {
    login,
    registro,
    cambiarPassword,
    altaUsuario,
    bajaUsuario,
    modificarUsuario,
    esAdmin
}