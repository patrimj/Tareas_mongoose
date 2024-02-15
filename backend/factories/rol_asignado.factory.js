
const { Rol_Asignado, Roles, User } = require('../models');

const genRolesAsignados = async (ctos = 1) => { 
    let rolAsignadoGen = []

    //TODO: FAKER DE ROL_ASIGNADO PARA FUTUROS USOS
    // TODO: sacamos los roles y usuarios que tenemos en la bbdd para asignarlos
    const roles = await Roles.findAll();
    const usuarios = await User.findAll();

    // para no se repitan las combinaciones
    let datos = [];
    let asignaciones = {}; 

    for (let i = 0; i < usuarios.length; i++) {
        // Primera combinación: usuario con el primer rol [admin]
        datos.push({ id_rol: roles[1].id, id_usuario: usuarios[i].id });
        asignaciones[usuarios[i].id] = [roles[1].id]; //guardamos la asignación

        // Segunda combinación: usuario con el segundo rol [progrmador]
        if (roles.length > 1 && Math.random() > 0.5 && !asignaciones[usuarios[i].id].includes(roles[0].id)) { 
            datos.push({ id_rol: roles[0].id, id_usuario: usuarios[i].id });
            asignaciones[usuarios[i].id].push(roles[0].id);
        }
    }

    // mezclamos pero no repetimos
    datos.sort(() => Math.random());

    // si hay menos combinaciones que ctos, se para el bucle para evitar errores de insercion ya que no hay mas combinaciones
    for(let i = 0; i < ctos; i++) {
        if (i >= datos.length) {
            break;
        }
        let rolAsignado = datos[i];
        rolAsignado.createdAt = new Date();
        rolAsignado.updatedAt = new Date();
        rolAsignadoGen.push(rolAsignado);
    }
    return rolAsignadoGen;
}

module.exports = {
    genRolesAsignados
}