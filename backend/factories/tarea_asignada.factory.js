const { Tarea_Asignada, Tarea, User } = require('../models');

//TODO: FAKER DE TAREA_ASIGNADA PARA FUTUROS USOS (SE PUEDE MEJORAR)

const genTareasAsignadas = async (ctos = 1) => {
    let tareasAsignadasGen = []


    const tareas = await Tarea.findAll();
    const usuarios = await User.findAll();

    // Para no repetir las combinaciones
    let datos = [];
    let asignaciones = {};
    for (let i = 0; i < usuarios.length; i++) {
        // Seleccionamos una tarea aleatoria
        let tareaAleatoria = tareas[Math.floor(Math.random() * tareas.length)];
    
        // usuario con la tarea aleatoria
        datos.push({ id_tarea: tareaAleatoria.id, id_usuario: usuarios[i].id });
    
        if (!asignaciones[usuarios[i].id]) {
            asignaciones[usuarios[i].id] = [];
        }
        asignaciones[usuarios[i].id].push(tareaAleatoria.id);
    
        // Si tenemoz más de una tarea, sacamos una segunda tarea aleatoria que no sea la misma que la primera
        if (tareas.length > 1) {
            let segundaTarea;
            do {
                segundaTarea = tareas[Math.floor(Math.random() * tareas.length)];
            } while (segundaTarea.id === tareaAleatoria.id && !asignaciones[usuarios[i].id].includes(segundaTarea.id))
    
            datos.push({ id_tarea: segundaTarea.id, id_usuario: usuarios[i].id });
            asignaciones[usuarios[i].id].push(segundaTarea.id);
        }
    }
    // Mezclamos pero no repetimos
    datos.sort(() => Math.random());

    // Si hay menos combinaciones que ctos, se para el bucle para evitar errores de inserción ya que no hay más combinaciones
    for (let i = 0; i < ctos; i++) {
        if (i >= datos.length) {
            break;
        }
        let tareaAsignada = datos[i];
        tareaAsignada.createdAt = new Date();
        tareaAsignada.updatedAt = new Date();
        tareasAsignadasGen.push(tareaAsignada);
    }
    return tareasAsignadasGen;
}

module.exports = {
    genTareasAsignadas
}