const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');

const genUsers = async (ctos = 1) => { 

    let usersGen = []
    for(let i = 1; i <= ctos; i++) {
        const password = await bcrypt.hash('1234', 10); //ENCRIPTACIÓN CONTRASEÑA
        let u = 
            {
                nombre: faker.person.firstName(),
                email: fakerES.internet.email(),
                password: password,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            usersGen.push(u)
    }
    return usersGen;
}

module.exports = {
    genUsers
}