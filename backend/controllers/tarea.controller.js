const { response, request } = require('express');
const ConexionTarea = require('../database/tarea.conexion');

//------------------------------ RUTAS PROGRAMADOR ------------------------------

//LISTAR TAREAS LIBRES
const listarTareasLibres = (req = request, res = response) => {
    const conx = new ConexionTarea();

    conx.listarTareasLibres()
        .then(msg => {
            console.log('Listado correcto!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No hay registros');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

//ASIGNAR TAREA
const asignarTarea = (req = request, res = response) => {
    const conx = new ConexionTarea();
    const id = req.params.id;
    const id_usuario = req.idToken;

    conx.asignarTarea(id, id_usuario)
        .then(msg => {
            console.log('Tarea asignada correctamente!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No se ha podido asignar la tarea');
            res.status(200).json({ 'msg': 'No se ha podido asignar la tarea' });
        });
}

//QUITARSE TAREA QUE TENGA MI ID ES DECIR QUE ESTÉ ASIGNADA A MI
const desasignarTarea = (req = request, res = response) => {
    const conx = new ConexionTarea();
    const id = req.params.id;
    const id_usuario = req.idToken;

    conx.desasignarTarea(id, id_usuario)
        .then(msg => {
            console.log('Tarea desasignada correctamente!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No se ha podido desasignar la tarea');
            res.status(200).json({ 'msg': 'No se ha podido desasignar la tarea' });
        });
}

//LISTAR TAREAS ASIGNADAS
const listarTareasAsignadas = (req = request, res = response) => {
    const conx = new ConexionTarea();
    const id_usuario = req.idToken;

    conx.listarTareasAsignadas(id_usuario)
        .then(msg => {
            console.log('Tareas asignadas!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No hay registros');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
            console.log(id_usuario);
        });
}

// CONSULTAR TAREA ASIGNADA
const consultarTareaAsignada = (req = request, res = response) => {
    const conx = new ConexionTarea();
    const id = req.params.id;
    const id_usuario = req.idToken;

    conx.consultarTareaAsignada(id, id_usuario)
        .then(msg => {
            console.log('Tarea asignada');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No hay registros');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

//LISTAR TODAS LAS TAREAS
const listarTareas = (req = request, res = response) => {
    const conx = new ConexionTarea();

    conx.listarTareas()
        .then(msg => {
            console.log('Tareas!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No hay registros');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

//MODIFICAR TAREA 
const modificarTareaPro = (req = request, res = response) => {
    const conx = new ConexionTarea();
    const id = req.params.id;

    conx.modificarTareaPro(id, req.body)
        .then(msg => {
            console.log('Tarea modificada correctamente!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No se ha podido modificar la tarea');
            res.status(200).json({ 'msg': 'No se ha podido modificar la tarea' });
        });
}

// ------------------------------ RUTAS ADMIN ------------------------------

///CREAR TAREA
const crearTarea = (req = request, res = response) => {
    const conx = new ConexionTarea();

    conx.crearTarea(req.body)
        .then(msg => {
            console.log('Tarea creada correctamente!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No se ha podido crear la tarea');
            res.status(200).json({ 'msg': 'No se ha podido crear la tarea' });
        });
}

//MODIFICAR TAREA 
const modificarTarea = (req = request, res = response) => {
    const conx = new ConexionTarea();
    const id = req.params.id;

    conx.modificarTarea(id, req.body)
        .then(msg => {
            console.log('Tarea modificada correctamente!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No se ha podido modificar la tarea');
            res.status(200).json({ 'msg': 'No se ha podido modificar la tarea' });
        });
}

//ELIMINAR TAREA
const eliminarTarea = (req = request, res = response) => {
    const conx = new ConexionTarea();
    const id = req.params.id;

    conx.eliminarTarea(id)
        .then(msg => {
            console.log('Tarea eliminada correctamente!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No se ha podido eliminar la tarea');
            res.status(200).json({ 'msg': 'No se ha podido eliminar la tarea' });
        });
}

//ASIGNAR TAREA A USUARIO
const asignarTareaAUsuario = (req = request, res = response) => {
    const conx = new ConexionTarea();
    const id = req.params.id;
    const id_usuario = req.params.id_usuario;

    conx.asignarTarea(id, id_usuario)
        .then(msg => {
            console.log('Tarea asignada correctamente!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No se ha podido asignar la tarea');
            res.status(200).json({ 'msg': 'No se ha podido asignar la tarea' });
        });
}

// VER TAREAS PROGRAMADOR
const verTareasProgramador = (req = request, res = response) => {
    const conx = new ConexionTarea();

    conx.verTareasProgramador(req.params.id_usuario)
        .then(msg => {
            console.log('Tareas programador!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No hay registros');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

// VER TODAS LAS TAREAS REALIZADAS 
const verTareasRealizadas = (req = request, res = response) => {
    const conx = new ConexionTarea();

    conx.verTareasRealizadas()
        .then(msg => {
            console.log('Tareas realizadas!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No hay registros');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

// VER TODAS LAS TAREAS PENDIENTES 
const verTareasPendientes = (req = request, res = response) => {
    const conx = new ConexionTarea();

    conx.verTareasPendientes()
        .then(msg => {
            console.log('Tareas pendientes!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No hay registros');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

// VER RANKING DE TAREAS 
const ranking = (req = request, res = response) => {
    const conx = new ConexionTarea();

    conx.ranking()
        .then(msg => {
            console.log('Ranking!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No hay registros');
            res.status(200).json({ 'msg': 'No se han encontrado registros' });
        });
}

// -------------------------------- EXPORTACIONES -------------------------------- 

module.exports = {
    listarTareasLibres,
    asignarTarea,
    desasignarTarea,
    listarTareasAsignadas,
    consultarTareaAsignada,
    listarTareas,
    crearTarea,
    modificarTarea,
    eliminarTarea,
    asignarTareaAUsuario,
    verTareasProgramador,
    verTareasRealizadas,
    verTareasPendientes,
    ranking,
    modificarTareaPro
}
