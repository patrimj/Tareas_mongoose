const mysql = require('mysql2');
const Conexion = require('./ConexionSequelize');
const { Sequelize, Op } = require('sequelize'); // Op es para los operadores de sequelize
const models = require('../models/index.js'); //Esto tiene acceso a todos los modelos., lo genera solo el sequelize-cli

class TareaConexion {

    constructor() {
        this.conexion = new Conexion();
    }

    conectar = () => {
        this.conexion.conectar();
    }

    desconectar = () => {
        this.conexion.desconectar();
    }

    // ------------------------------ RUTAS PROGRAMADOR ------------------------------

    //LISTAR TAREAS LIBRES
    listarTareasLibres = async () => {
        let resultado = [];
        this.conectar();
        resultado = await models.Tarea_Asignada.findAll({
            where: { id_usuario: null },
            include: [{
                model: models.Tarea,
                as: 'tarea'
            }]
        });
        this.desconectar();
        return resultado;
    }

    //ASIGNAR TAREA QUE NO ESTÉ ASIGNADA
    asignarTarea = async (id_tarea, id_usuario) => {
        let resultado = 0;
        this.conectar();
        try {
            const tareaAsignada = await models.Tarea_Asignada.update({
                id_usuario: id_usuario
            }, {
                where: {
                    id_tarea: id_tarea
                }
            });

            if (tareaAsignada[0] !== 0) {
                resultado = 1;
            }
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                console.log(`La tarea ${id_tarea} ya está asignada al usuario ${id_usuario}.`);
            } else {
                console.log('Ocurrió un error desconocido: ', error);
            }
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }


    //QUITARSE TAREA QUE TENGA MI ID ES DECIR QUE ESTÉ ASIGNADA A MI
    desasignarTarea = async (id_tarea, id_usuario) => {
        this.conectar();
        let resultado = await models.Tarea_Asignada.update({
            id_usuario: null
        }, {
            where: {
                id_tarea: id_tarea,
                id_usuario: id_usuario
            }
        });

        if (resultado[0] === 0) {
            this.desconectar();
            throw new Error('No se encontró la tarea asignada al usuario especificado.');
        }

        this.desconectar();
        return resultado;
    }

    //LISTAR TODAS LAS TAREAS ASIGNADAS a mi id
    listarTareasAsignadas = async (id_usuario) => {
        let resultado = [];
        this.conectar();
        resultado = await models.Tarea_Asignada.findAll({
            where: { id_usuario: id_usuario },
            include: [{
                model: models.Tarea,
                as: 'tarea',
            }]
        });
        this.desconectar();
        return resultado;
    }

    // CONSULTAR TAREA ASIGNADA a mi id
    consultarTareaAsignada = async (id_tarea, id_usuario) => {
        let resultado = [];
        this.conectar();
        resultado = await models.Tarea_Asignada.findAll({
            where: { id_usuario: id_usuario, id_tarea: id_tarea },
            include: [{
                model: models.Tarea,
                as: 'tarea'
            }]
        });
        this.desconectar();
        return resultado;
    }

    //LISTAR TODAS LAS TAREAS
    listarTareas = async () => {
        let resultado = [];
        this.conectar();
        resultado = await models.Tarea.findAll({
            attributes: ['id', 'descripcion', 'dificultad', 'horas_previstas', 'horas_realizadas', 'porcentaje_realizacion', 'completada'],
        });
        this.desconectar();
        return resultado;
    }

    //MODIFICAR TAREA 
    modificarTareaPro = async (id, body) => {
        this.conectar();
        let resultado = await models.Tarea_Asignada.findByPk(id);
        if (!resultado) {
            this.desconectar();
            throw new Error('Tarea asignada no encontrada');
        }
        try {
            await resultado.update({
                id_tarea: body.id_tarea,
                id_usuario: body.id_usuario,
            });

            const tarea = await models.Tarea.findByPk(body.tarea.id);
            if (!tarea) {
                throw new Error('Tarea no encontrada');
            }
            await tarea.update({
                descripcion: body.tarea.descripcion,
                dificultad: body.tarea.dificultad,
                horas_previstas: body.tarea.horas_previstas,
                horas_realizadas: body.tarea.horas_realizadas,
                porcentaje_realizacion: body.tarea.porcentaje_realizacion,
                completada: body.tarea.completada
            });

            this.desconectar();
            return resultado;
        } catch (error) {
            this.desconectar();
            console.error('Error al actualizar la tarea asignada:', error);
            throw error;
        }
    }

    // ------------------------------ RUTAS ADMIN ------------------------------

    ///CREAR TAREA
    crearTarea = async (body) => {
        try {
            this.conectar();
            let resultado = await models.Tarea.create(body);
            this.desconectar();
            return resultado;
        } catch (error) {
            this.desconectar();
            console.error('Error al crear la tarea:', error);
            throw error;
        }
    }

    //MODIFICAR TAREA 
    modificarTarea = async (id, body) => {
        this.conectar();
        let resultado = await models.Tarea.findByPk(id);
        if (!resultado) {
            this.desconectar();
            throw error;
        }
        await resultado.update(body);
        this.desconectar();
        return resultado;
    }

    //ELIMINAR TAREA
    eliminarTarea = async (id) => {
        this.conectar();
        let resultado = await models.Tarea.findByPk(id);
        if (!resultado) {
            this.desconectar();
            throw error;
        }
        await resultado.destroy();
        this.desconectar();
        return resultado;
    }

    //ASIGNAR TAREA A USUARIO
    asignarTareaUsuario = async (id_tarea, id_usuario) => {
        let resultado = 0;
        this.conectar();
        try {
            const tareaAsignada = await models.Tarea_Asignada.create({
                id_tarea: id_tarea,
                id_usuario: id_usuario
            });
            resultado = 1;
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                console.log(`La tarea ${id_tarea} ya está asignada al usuario ${id_usuario}.`);
            } else {
                console.log('Ocurrió un error desconocido: ', error);
            }
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    // VER TAREAS PROGRAMADOR
    verTareasProgramador = async (id_usuario) => {
        console.log(id_usuario)
        let resultado = [];
        this.conectar();
        resultado = await models.Tarea_Asignada.findAll({
            where: { id_usuario: id_usuario },
            include: [{
                model: models.Tarea,
                as: 'tarea',
            }]
        });
        this.desconectar();
        return resultado;
    }

    // VER TODAS LAS TAREAS REALIZADAS
    verTareasRealizadas = async () => {
        let resultado = [];
        this.conectar();
        resultado = await models.Tarea.findAll({
            attributes: ['id', 'descripcion', 'dificultad', 'horas_previstas', 'horas_realizadas', 'porcentaje_realizacion', 'completada'],
            where: { completada: true },
        });
        this.desconectar();
        return resultado;
    }

    // VER TODAS LAS TAREAS PENDIENTES 
    verTareasPendientes = async () => {

        let resultado = [];
        this.conectar();
        resultado = await models.Tarea.findAll({
            attributes: ['id', 'descripcion', 'dificultad', 'horas_previstas', 'horas_realizadas', 'porcentaje_realizacion', 'completada'],
            where: { completada: false },
        });
        this.desconectar();
        return resultado;
    }

    // VER RANKING DE TAREAS // sacar los usuarios que más tareas terminadas tiene a su id
    ranking = async () => {
        let resultado = [];
        this.conectar();
        resultado = await models.Tarea_Asignada.findAll({
            attributes: ['id_usuario', [Sequelize.fn('COUNT', Sequelize.col('id_usuario')), 'tareas_realizadas']],
            where: { id_usuario: { [Op.ne]: null } },
            group: ['id_usuario'],
            order: [[Sequelize.fn('COUNT', Sequelize.col('id_usuario')), 'DESC']]
        });
        this.desconectar();
        return resultado;
    }

}

module.exports = TareaConexion;