const Tarea = require('../models/tarea.js');
const TareaAsignada = require('../models/tarea_asignada.js');

//------------------------------ RUTAS PROGRAMADOR ------------------------------

//LISTAR TAREAS LIBRES
listarTareasLibres = async (req, res) => {
    try {
        const tareasLibres = await TareaAsignada.aggregate([
            {
                $match: { id_usuario: null }
            },
            {
                $lookup: {
                    from: 'tareas',
                    localField: 'id_tarea',
                    foreignField: 'id',
                    as: 'tarea'
                }
            },
            {
                $unwind: '$tarea'
            }
        ]);

        if (tareasLibres.length > 0) {
            console.log('Tareas libres:', tareasLibres);
            res.status(200).json(tareasLibres);
            return tareasLibres;
        } else {
            console.log('No hay tareas libres.');
            res.status(404).json({ 'msg': 'No hay tareas libres' });
        }
    }
    catch (error) {
        console.error('Error al listar tareas libres:', error);
        res.status(500).json({ 'msg': 'Error al listar tareas libres' });
    }
}


//ASIGNAR TAREA QUE NO ESTÉ ASIGNADA
asignarTarea = async (req, res) => {
    try {
        const id_usuario = req.idToken;
        const id_tarea = req.params.id;

        const tareaAsignada = await TareaAsignada.findOneAndUpdate({ id_usuario: null, id_tarea: id_tarea }, { id_usuario: id_usuario }, { new: true });
        
        if (tareaAsignada) {
            console.log('Tarea asignada');
            res.status(200).json(tareaAsignada);
        } else {
            console.log('Tarea no asignada');
            res.status(404).json({ 'msg': 'Tarea no asignada' });
        }

    } catch (error) {
        console.error('Error al asignar tarea:', error);
        res.status(500).json({ 'msg': 'Error al asignar tarea' });
    }
}

//DESASIGNAR TAREA
desasignarTarea = async (req, res) => {
    try {
        const id_tarea = req.params.id;

        const tareaDesasignada = await TareaAsignada.findOneAndUpdate({ id_tarea: id_tarea }, { id_usuario: null }, { new: true });
       
        if (tareaDesasignada) {
            console.log('Tarea desasignada');
            res.status(200).json(tareaDesasignada);
        } else {
            console.log('Tarea no desasignada');
            res.status(404).json({ 'msg': 'Tarea no desasignada' });
        }

    } catch (error) {
        console.error('Error al desasignar tarea:', error);
        res.status(500).json({ 'msg': 'Error al desasignar tarea' });
    }
}

//LISTAR TODAS LAS TAREAS ASIGNADAS a mi id
listarTareasAsignadas = async (req, res) => {
    try {
        const id_usuario = req.idToken;

        const tareasAsignadas = await TareaAsignada.aggregate([
            {
                $match: { id_usuario: id_usuario }
            },
            {
                $lookup: {
                    from: 'tareas',
                    localField: 'id_tarea',
                    foreignField: 'id',
                    as: 'tarea'
                }
            },
            {
                $unwind: '$tarea'
            }
        ]);

        if (tareasAsignadas.length > 0) {
            console.log('Tareas asignadas:', tareasAsignadas);
            res.status(200).json(tareasAsignadas);
            return tareasAsignadas;
        } else {
            console.log('No hay tareas asignadas.');
            res.status(404).json({ 'msg': 'No hay tareas asignadas' });
        }
    }
    catch (error) {
        console.error('Error al listar tareas asignadas:', error);
        res.status(500).json({ 'msg': 'Error al listar tareas asignadas' });
    }
}

// CONSULTAR TAREA ASIGNADA a mi id
consultarTareaAsignada = async (req, res) => {
    try {
        const id_usuario = req.idToken;

        const tareaAsignada = await TareaAsignada.aggregate([
            {
                $match: { id_usuario: id_usuario }
            },
            {
                $lookup: {

                    from: 'tareas',
                    localField: 'id_tarea',
                    foreignField: 'id',
                    as: 'tarea'
                }
            },
            {
                $unwind: '$tarea'
            },
            {
                $match: { 'tarea.id': Number(req.params.id) } // el number es para que lo reconozca como número (si no da error, porque lo encuentra como string)
            }
        ]);

        if (tareaAsignada.length > 0) {
            console.log('Tarea asignada:', tareaAsignada);
            res.status(200).json(tareaAsignada);
            return tareaAsignada;
        } else {
            console.log('No hay tareas asignadas.');
            res.status(404).json({ 'msg': 'No hay tareas asignadas' });
        }
    }
    catch (error) {
        console.error('Error al listar tareas asignadas:', error);
        res.status(500).json({ 'msg': 'Error al listar tareas asignadas' });
    }
}

//LISTAR TODAS LAS TAREAS
listarTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find({});

        if (tareas.length > 0) {
            console.log('Tareas:', tareas);
            res.status(200).json(tareas);
            return tareas;
        } else {
            console.log('No hay tareas.');
            res.status(404).json({ 'msg': 'No hay tareas' });
        }
    }
    catch (error) {
        console.error('Error al listar tareas:', error);
        res.status(500).json({ 'msg': 'Error al listar tareas' });
    }
}

//MODIFICAR TAREA 

modificarTareaPro = async (req, res) => {
    try {
        const tarea = await Tarea.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (tarea) {
            console.log('Tarea modificada');
            res.status(200).json(tarea);
        } else {
            console.log('Tarea no encontrada');
            res.status(404).json({ 'msg': 'Tarea no encontrada' });
        }
    } catch (error) {
        console.error('Error al modificar tarea:', error);
        res.status(500).json({ 'msg': 'Error al modificar tarea' });
    }
}

///CREAR TAREA
crearTarea = async (req, res) => {
    try {
        const tarea = await Tarea.create(req.body);
        if (tarea) {
            console.log('Tarea creada');
            res.status(200).json(tarea);
        } else {
            console.log('Tarea no creada');
            res.status(404).json({ 'msg': 'Tarea no creada' });
        }
    } catch (error) {
        console.error('Error al crear tarea:', error);
        res.status(500).json({ 'msg': 'Error al crear tarea' });
    }
}

//MODIFICAR TAREA 
modificarTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (tarea) {
            console.log('Tarea modificada');
            res.status(200).json(tarea);
        } else {
            console.log('Tarea no encontrada');
            res.status(404).json({ 'msg': 'Tarea no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al modificar tarea:', error);
        res.status(500).json({ 'msg': 'Error al modificar tarea' });
    }
}
//ELIMINAR TAREA

eliminarTarea = async (req, res) => {
    try {
        const tarea = await Tarea.deleteOne({ id: req.params.id });
        if (tarea) {
            console.log('Tarea eliminada');
            res.status(200).json(tarea);
        } else {
            console.log('Tarea no encontrada');
            res.status(404).json({ 'msg': 'Tarea no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        res.status(500).json({ 'msg': 'Error al eliminar tarea' });
    }
}

//ASIGNAR TAREA A USUARIO

asignarTareaAUsuario = async (req, res) => {
    try {
        const id_tarea = req.params.id;
        const id_usuario = req.params.id_usuario;

        const tareaAsignada = await TareaAsignada.findOneAndUpdate({ id_tarea: id_tarea }, { id_usuario: id_usuario }, { new: true });
        if (tareaAsignada) {
            console.log('Tarea asignada');
            res.status(200).json(tareaAsignada);
        } else {
            console.log('Tarea no asignada');
            res.status(404).json({ 'msg': 'Tarea no asignada' });
        }
    } catch (error) {
        console.error('Error al asignar tarea:', error);
        res.status(500).json({ 'msg': 'Error al asignar tarea' });
    }
}

// VER TAREAS PROGRAMADOR

verTareasProgramador = async (req, res) => {
    try {
        const id_usuario = Number(req.params.id_usuario);
        console.log('id_usuario:', id_usuario);

        const tareasProgramador = await TareaAsignada.aggregate([
            {
                $match: { id_usuario: id_usuario }
            },
            {
                $lookup: {
                    from: 'tareas',
                    localField: 'id_tarea',
                    foreignField: 'id',
                    as: 'tarea'
                }
            },
            {
                $unwind: '$tarea'
            }
        ]);
        if (tareasProgramador.length > 0) {
            console.log('Tareas programador:', tareasProgramador);
            res.status(200).json(tareasProgramador);
            return tareasProgramador;
        } else {
            console.log('No hay tareas asignadas al orogramador.');
            console.log('tareas Programador:', tareasProgramador);
            res.status(404).json({ 'msg': 'No hay tareas asignadas' });
        }
    }
    catch (error) {
        console.error('Error al listar tareas asignadas:', error);
        res.status(500).json({ 'msg': 'Error al listar tareas asignadas' });
    }
}

// VER TODAS LAS TAREAS REALIZADAS

verTareasRealizadas = async (req, res) => {
    try {
        const tareasRealizadas = await TareaAsignada.aggregate([
            {
                $lookup: {
                    from: 'tareas',
                    localField: 'id_tarea',
                    foreignField: 'id',
                    as: 'tarea'
                }
            },
            {
                $unwind: '$tarea'
            },
            {
                $match: { 'tarea.completada': true }
            }
        ]);
        if (tareasRealizadas.length > 0) {
            console.log('Tareas realizadas:', tareasRealizadas);
            res.status(200).json(tareasRealizadas);
            return tareasRealizadas;
        } else {
            console.log('No hay tareas realizadas.');
            res.status(404).json({ 'msg': 'No hay tareas realizadas' });
        }
    }
    catch (error) {
        console.error('Error al listar tareas realizadas:', error);
        res.status(500).json({ 'msg': 'Error al listar tareas realizadas' });
    }
}


// VER TODAS LAS TAREAS PENDIENTES 

verTareasPendientes = async (req, res) => {
    try {
        const tareasPendientes = await TareaAsignada.aggregate([
            {
                $lookup: {
                    from: 'tareas',
                    localField: 'id_tarea',
                    foreignField: 'id',
                    as: 'tarea'
                }
            },
            {
                $unwind: '$tarea'
            },
            {
                $match: { 'tarea.completada': false }
            }
        ]);
        if (tareasPendientes.length > 0) {
            console.log('Tareas pendientes:', tareasPendientes);
            res.status(200).json(tareasPendientes);
            return tareasPendientes;
        } else {
            console.log('No hay tareas pendientes.');
            res.status(404).json({ 'msg': 'No hay tareas pendientes' });
        }
    }
    catch (error) {
        console.error('Error al listar tareas pendientes:', error);
        res.status(500).json({ 'msg': 'Error al listar tareas pendientes' });
    }
}


// VER RANKING DE TAREAS 

ranking = async (req, res) => {

    try {

        const ranking = await TareaAsignada.aggregate([
            {
                $lookup: {
                    from: 'tareas',
                    localField: 'id_tarea',
                    foreignField: 'id',
                    as: 'tarea'
                }
            },
            {
                $unwind: '$tarea'
            },
            {
                $group: {
                    _id: '$id_usuario',
                    id_usuario: { $first: '$id_usuario' },
                    total: { $sum: 1 }
                }
            },
        ]);

        if (ranking.length > 0) {

            console.log('Ranking:', ranking);
            res.status(200).json(ranking);
            return ranking;
        }
        else {
            console.log('No hay tareas realizadas.');
            res.status(404).json({ 'msg': 'No hay tareas realizadas' });
        }
    } catch (error) {
        console.error('Error al listar ranking:', error);
        res.status(500).json({ 'msg': 'Error al listar ranking' });
    }

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
