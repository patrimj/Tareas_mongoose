const { Router } = require('express');
const controladorPersona = require('../controllers/usuario.controller');
const router = Router();
const { check } = require('express-validator');
const midsJWT = require("../middlewares/validarJWT");
const midsRoles = require("../middlewares/validarRoles");


// ---------------------------- RUTAS CUALQUIER USUARIO ----------------------------

//LOGIN
router.post('/login',
    [
        check('email', 'El correo no es válido').isEmail(),
        check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
        
    ], controladorPersona.login);

//REGISTRARSE
router.post('/registrarse',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo no es válido').isEmail(),
        check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    ], controladorPersona.registro);

// CAMBIAR PASSWORD
router.put('/perfil/password/:email', 
    [
        check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    ], midsJWT.validarJWT, controladorPersona.cambiarPassword);

router.get('/rol/:id_usuario', controladorPersona.esAdmin); //SACAR ID DEL ROL_ASIGNADO

// ---------------------------- RUTAS ADMINISTRADOR ---------------------------- 

// ALTA USUARIO
router.post('/usuario/alta', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo no es válido').isEmail(),
        check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    ], midsJWT.validarJWT,midsRoles.esAdmin, controladorPersona.altaUsuario);

// BAJA USUARIO
router.delete('/usuario/baja/:id', midsJWT.validarJWT,midsRoles.esAdmin, controladorPersona.bajaUsuario); 

// MODIFICAR USUARIO
router.put('/usuario/modificar/:id', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo no es válido').isEmail(),
        check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    ], midsJWT.validarJWT, midsRoles.esAdmin, controladorPersona.modificarUsuario);

module.exports = router;