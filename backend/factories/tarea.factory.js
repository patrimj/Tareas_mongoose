const { faker, fakerES } = require('@faker-js/faker');

const genTareas = async (ctos = 1) => { 
    let tareasGen = []
    for (let i = 1; i <= ctos; i++) {

        const dificultades = ['XS', 'S', 'M', 'L', 'XL'];
        let u =
        {
            descripcion: fakerES.lorem.sentence(),
            dificultad: dificultades[Math.floor(Math.random() * dificultades.length)],
            horas_previstas: faker.datatype.number({ min: 1, max: 10 }),
            horas_realizadas: faker.datatype.number({ min: 1, max: 10 }),
            porcentaje_realizacion: faker.datatype.number({ min: 1, max: 100 }),
            completada: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        tareasGen.push(u)
    }
    return Promise.all(tareasGen);
}

module.exports = {
    genTareas
}