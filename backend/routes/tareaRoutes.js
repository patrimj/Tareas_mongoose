const { Router } = require('express');
const controladorTarea = require('../controllers/tarea.controller');
const router = Router();
const { check } = require('express-validator');
const midsJWT = require("../middlewares/validarJWT");
const midsRoles = require("../middlewares/validarRoles");

// ---------------------------- RUTAS PROGRAMADOR ----------------------------

//LISTAR TAREAS LIBRES
router.get('/tareas/libres', midsJWT.validarJWT, controladorTarea.listarTareasLibres);

//ASIGNAR TAREA
router.put('/tarea/asignar/:id', midsJWT.validarJWT, controladorTarea.asignarTarea);

//QUITARSE TAREA
router.put('/tarea/desasignar/:id', midsJWT.validarJWT, controladorTarea.desasignarTarea);

//LISTAR TAREAS ASIGNADAS
router.get('/tareas/asignadas', midsJWT.validarJWT,  controladorTarea.listarTareasAsignadas);

// CONSULTAR TAREA ASIGNADA
router.get('/tarea/asignada/:id', midsJWT.validarJWT, controladorTarea.consultarTareaAsignada);

//LISTAR TODAS LAS TAREAS
router.get('/tareas', midsJWT.validarJWT,  controladorTarea.listarTareas);

//MODIFICAR TAREA
router.put('/tareaPro/modificar/:id',
    [
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('dificultad', 'La dificultad es obligatoria').not().isEmpty(),
        check ('horas_previstas', 'Las horas previstas son obligatorias').not().isEmpty(),
        check ('horas_realizadas', 'Las horas realizadas son obligatorias').not().isEmpty(),
        check ('porcentaje_realizacion', 'El porcentaje de realización es obligatorio').not().isEmpty(),
        check ('completada', 'El campo completada es obligatorio').not().isEmpty(),
    ], midsJWT.validarJWT, controladorTarea.modificarTareaPro);

// ---------------------------- RUTAS ADMIN ----------------------------

//CREAR TAREA
router.post('/tarea/crear',
    [
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('dificultad', 'La dificultad es obligatoria').not().isEmpty(),
        check ('horas_previstas', 'Las horas previstas son obligatorias').not().isEmpty(),
        check ('horas_realizadas', 'Las horas realizadas son obligatorias').not().isEmpty(),
        check ('porcentaje_realizacion', 'El porcentaje de realización es obligatorio').not().isEmpty(),
        check ('completada', 'El campo completada es obligatorio').not().isEmpty(),
    ], midsJWT.validarJWT, midsRoles.esAdmin, controladorTarea.crearTarea);

//MODIFICAR TAREA
router.put('/tarea/modificar/:id',
    [
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('dificultad', 'La dificultad es obligatoria').not().isEmpty(),
        check ('horas_previstas', 'Las horas previstas son obligatorias').not().isEmpty(),
        check ('horas_realizadas', 'Las horas realizadas son obligatorias').not().isEmpty(),
        check ('porcentaje_realizacion', 'El porcentaje de realización es obligatorio').not().isEmpty(),
        check ('completada', 'El campo completada es obligatorio').not().isEmpty(),
    ], midsJWT.validarJWT,midsRoles.esAdmin, controladorTarea.modificarTarea);

//ELIMINAR TAREA
router.delete('/tarea/eliminar/:id', midsJWT.validarJWT,midsRoles.esAdmin, controladorTarea.eliminarTarea);

//ASIGNAR TAREA A USUARIO
router.put('/tarea/asignar/:id/:id_usuario', midsJWT.validarJWT,midsRoles.esAdmin, controladorTarea.asignarTareaAUsuario);

// VER TAREAS PROGRAMADOR
router.get('/tareas/programador/:id_usuario', controladorTarea.verTareasProgramador);

// VER TODAS LAS TAREAS REALIZADAS
router.get('/tareas/realizadas',midsJWT.validarJWT,midsRoles.esAdmin,  controladorTarea.verTareasRealizadas);

// VER TODAS LAS TAREAS PENDIENTES
router.get('/tareas/pendientes',midsJWT.validarJWT,midsRoles.esAdmin,  controladorTarea.verTareasPendientes);

// VER RANKING DE TAREAS
router.get('/ranking',midsJWT.validarJWT,midsRoles.esAdmin,  controladorTarea.ranking);

module.exports = router;