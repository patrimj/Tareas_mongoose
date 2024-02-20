# EJERCICIO RESUMEN NODEJS
---

## ÍNDICE
[1. COMANDOS UTILIZADOS](#1-comandos-utilizados)

[2. ESTRUCTURA DE ARCHIVOS](#2-estructuración-de-archivos)

[3. MANUAL DE USO DE LA API](#3-manual-de-uso-de-la-api)

---
## 1. COMANDOS UTILIZADOS
- Crea el package.json e ``inicializa el proyecto``
```bash
npm init -y 
```
- Instalación de la librería ``express``
```bash
npm install express
```
- Instalación global de ``nodemon``, para que se reinicie el servidor cada vez que se haga un cambio
```bash
npm install -g nodemon 
npm install --save-dev nodemon 
```
- Instalación de la librería dotenv, para crear el archivo ``.env``
```bash
npm install dotenv --save 
```
-  Instalación de todas las dependencias del package.json y la carpeta ``node_modules``
``` bash
npm install 
```
- Instalación de la librería cors, para evitar problemas de ``CORS``
```bash
npm install cors
```
- Instalación de la librería ``mysql2``, para trabajar con la base de datos
```bash
npm install mysql2 
```
- Instalación de la librería ``bcrypt``, para encriptar contraseñas
```bash
npm install bcrypt 
```
- Instalación de la librería ``validator``, para validar campos en las rutas
```bash
npm install validator
npm install express-validator
```
- Instalación de la librería ``jsonwebtoken``, para generar tokens
```bash
npm install jsonwebtoken 
```
- Instalación de la librería ``faker``, para generar datos falsos
```bash
npm i @faker-js/faker 
```
- Instalación de la librería ``sequelize``, para trabajar con la base de datos
```bash
npm install --save sequelize 
npm install sequelize sqlite3 
```
- Para instalar las dependecias de ``migrations``
```bash
npm install --save-dev sequelize-cli

```
- Instalación de ``sequelize-cli``, para trabajar con la base de datos
```bash
npx sequelize-cli init 
```
- Crear ``modelos``
```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string 
```
- Crear y migrar``tablas``
```bash
npx sequelize-cli db:migrate 
npx sequelize-cli db:migrate --to 20240121203206-create-roles.js
npx sequelize-cli db:migrate --to 20240116185326-create-user.js  
npx sequelize-cli db:migrate --to 20240121203217-create-rol-asignado.js
npx sequelize-cli db:migrate --to 20240121203253-create-tarea.js  
npx sequelize-cli db:migrate --to 20240121203310-create-tarea-asignada.js
```
- Hacer un rollback de las ``tablas``
```bash
npx sequelize-cli db:migrate:undo 
```
- Crear ``seeders``
```bash
npx sequelize-cli seed:generate --name userSeeder
npx sequelize-cli seed:generate --name rolSeeder
npx sequelize-cli seed:generate --name rolAsigSeeder
npx sequelize-cli seed:generate --name tareaSeeder
npx sequelize-cli seed:generate --name tareaAsigSeeder
```
- Introducir datos en las ``tablas``
```bash
npx sequelize-cli db:seed --seed 20240121203409-rolSeeder.js
npx sequelize-cli db:seed --seed 20240121203400-userSeeder.js 
npx sequelize-cli db:seed --seed 20240121203419-rolAsigSeeder.js
npx sequelize-cli db:seed --seed 20240121203428-tareaSeeder.js
npx sequelize-cli db:seed --seed 20240121203435-tareaAsigSeeder.js
```
---

## 2. ESTRUCTURACIÓN DE ARCHIVOS
> ## app
> > ``app.js`` [copiado el archivo ``app.js`` del profesor]

> > ``server.js`` [copiado en un principio el archivo ``server.js`` del profesor]

> ## config
> > ``config.js`` [copiado el archivo ``config.js`` del profesor]
```bash
require('dotenv').config();

module.exports ={
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DEV,
    "host": process.env.HOST,
    "dialect": process.env.DB_DIALECT
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_TEST,
    "host": process.env.HOST,
    "dialect": process.env.DB_DIALECT
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_PROD,
    "host": process.env.HOST,
    "dialect": process.env.DB_DIALECT
  }
}
```

> ## controllers
> > ``tarea.controller.js``

> > ``usuario.controller.js``

> ## database
> > ``ConexionSequelize.js`` 

> > ``connection.js``

> > ``tarea.conexion.js``

> > ``usuario.conexion.js``

> ## factories 

> [!NOTE]
> Las factorias se crean [SIN] comando

> > ``rol.factory.js`` [faker]

> > ``rol_asignado.factory.js`` [faker] 

> > ``usuario.factory.js`` [faker]

> > ``tarea.factory.js`` [faker]

> > ``tarea_asignada.factory.js`` [faker] 


> ## helpers
> > ``CustomError.js`` [copiado el archivo ``CustomError.js`` del profesor]

> > ``db-validators.js`` [se encuentran los validators personalizados]

> > ``generate_jwt.js`` [se encuentra la función para generar el token] 
```javascript
const jwt = require('jsonwebtoken')

const generarJWT = (id_usuario = '') => {

    console.log("id:" + id_usuario)
    let token = jwt.sign({ id_usuario }, process.env.SECRETORPRIVATEKEY, { 
        expiresIn: '4y' // 24 hours
      });
    return token;
}

module.exports ={
    generarJWT
}
```
*** en ``.env`` se encuentra la clave secreta para generar el ``token`` ***
```bash
SECRETORPRIVATEKEY=eST0EsmiPiblic@key
```
*** en ``controllers`` pondriamos una función para generar el token ***
```javascript
const { generarJWT } = require('../helpers/jwt');

const login =  (req, res = response) => {
    const {email, password} = req.body;
    try{
        //Verificar si existe el usuario.
        const conx = new ConexionUsuario();
        u = conx.login(email, password)    
            .then( usu => {
                console.log('Usuario correcto!  ' + usu[0].id);
                const token = generarJWT(usu[0].id)
                console.log(usu)
                console.log(token);
                res.status(200).json({usu, token});
            })
            .catch( err => {
                console.log('No hay registro de ese usuario.');
                res.status(500).json({'msg':'Login incorrecto.'});
            });
            

        //res.status(200).json({'msg':'Login ok', DNI, Clave});
    }
    catch(error){
        console.log(error);
        res.status(500).json({'msg':'Error en el servidor.'});
    }
}
```
-  y asi cada vez que se inicie sesión se generará un token con el id del usuario

> ## middlewares
> > ``validar-admin.js`` [ para validar si el usuario es admin]

> > ``validarJWT.js`` [ para validar el token]
```javascript
const jwt = require('jsonwebtoken');
const {response, request} = require('express')  //Incorporamos esto aquí porque vamos a añadir elementos a req que sacaremos del token.

const validarJWT = (req , res , next) => {  //Estas asignaciones son necesarias para almacenar en el request los datos que extraigamos del token.
    const token = req.header('x-token');  //Este nombre será establecido en el cliente también.

    if (!token){
        return res.status(401).json({'msg':'No hay token en la petición.'});
    }

    try {
        
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.idToken = id;
        console.log(id);
        console.log(token);
        next();
        
    }catch(error){
        console.log(error);
        res.status(401).json({'msg':'Token no válido.'});
    }
}

module.exports = {
    validarJWT
}
```

> ## migrations y models
>
> > ``index.js`` [es el archivo que se encarga de la conexión con la base de datos]

> [!NOTE]
> CUIDADO CON INDEX.JS (no sacarlo de la carpeta models)  
> Cambiar de congif/config.json a config/config.js 
```bash
Const config = require(__dirname + '/../config/config.js')[env]; 
```

> > ``roles.js`` [es el modelo que seguira la tabla roles] y ``20240121203206-create-roles.js``
```bash
npx sequelize-cli model:generate --name Roles --attributes nombre:string  
```
> > ``rol_asignado.js`` [es el modelo que seguira la tabla rol_asignado] y ``20240121203217-create-rol-asignado.js``
```bash
npx sequelize-cli model:generate --name Rol_Asignado --attributes id_rol:integer,id_usuario:integer 
```
> > ``user.js`` [es el modelo que seguira la tabla usuarios] y ``20240116185326-create-user.js``
```bash
npx sequelize-cli model:generate --name User --attributes nombre:string,email:string,password:string
```
> > ``tarea.js`` [es el modelo que seguira la tabla tareas] y ``20240121203253-create-tarea.js``
```bash
npx sequelize-cli model:generate --name Tarea --attributes descripcion:string,dificultad:string,horas_previstas:integer,horas_realizadas:integer,porcentaje_realizacion:integer,completada:boolean
```
> > ``tarea_asignada.js`` [es el modelo que seguira la tabla tarea_asignada] y ``20240121203310-create-tarea-asignada.js``
```bash
npx sequelize-cli model:generate --name Tarea_Asignada --attributes id_tarea:integer,id_usuario:integer
```
> [!CAUTION]
> id:integer > no se pone porque viene por defecto

> [!IMPORTANT]
>Todos estos comandos crearán un archivo de tipo `XXXXXXXXXXXXXX-create-user.j` en la carpeta `/migrations` y un archivo `user.js` en la carpeta `/models`

> ## routes
> > ``tareaRoutes.js``

> > ``usuarioRoutes.js``

> ## seeders
> > ```20240121203409-rolSeeder.js```
```bash
npx sequelize-cli db:seed --seed 20240121203409-rolSeeder.js
```
> > ```20240121203400-userSeeder.js```
```bash
npx sequelize-cli db:seed --seed 20240121203400-userSeeder.js 
```
> > ```20240121203419-rolAsigSeeder.js```
```bash
npx sequelize-cli db:seed --seed 20240121203419-rolAsigSeeder.js
```
> > ```20240121203428-tareaSeeder.js```
```bash
npx sequelize-cli db:seed --seed 20240121203428-tareaSeeder.js
```
> > ```20240121203435-tareaAsigSeeder.js```
```bash
npx sequelize-cli db:seed --seed 20240121203435-tareaAsigSeeder.js
```
> ## .env
```bash
PORT=9090

DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""

DB_DEV="tareaMigSeedNode_dev"
DB_PROD="tareaMigSeedNode_prod"
DB_TEST="tareaMigSeedNode_test"

DB_DIALECT="mysql"
DB_HOST="localhost"
DB_PORT=3306
DB_MAXCONNECTIONS=5

SECRETORPRIVATEKEY=eST0EsmiPiblic@key
```
---
## 3. MANUAL DE USO DE LA API

## RUTAS USUARIOS

---
#### Registrar usuario

- URL: `http://localhost:9090/api/registrarse`
- Método: `POST`
- Datos requeridos:
  - `nombre`: Nombre del usuario (string, requerido)
  - `email`: Email del usuario (string, requerido, único)
  - `password`: Contraseña del usuario (string, requerido)

##### Ejemplo de solicitud para registrar usuario
```json
{
  "nombre" : "Patricia",
  "email" : "patricia@correo.com",
  "password": "admin123"
}
```
---
#### Iniciar sesión

- URL: `http://localhost:9090/api/login`
- Método: `POST`
- Datos requeridos:
  - `email`: Email del usuario (string, requerido)
  - `password`: Contraseña del usuario (string, requerido)
- Datos de respuesta:
  - `token`: Token de autenticación (string)
  
##### Ejemplo de solicitud para iniciar sesión
```json
{
  "email" : "patricia@correo.com",
  "password": "admin123"
}
```
##### Ejemplo de respuesta al iniciar sesión 
*** El token no caducará en 4 años ***
```json
{
  "usu": {
    "id": 6,
    "nombre": "Patricia",
    "email": "patricia@correo.com",
    "password": "admin123",
    "createdAt": "2024-01-22T18:11:01.000Z",
    "updatedAt": "2024-01-22T18:11:01.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjo2LCJpYXQiOjE3MDU5NDkxMTEsImV4cCI6MTgzMjE3OTUxMX0.vQtwVqQhZuKAERIPvuP9AkUNnwknbW4HuSyySEQokOg"
}
```

- El token deberá ser enviado en el header de las peticiones que lo requieran, con el nombre `x-token`.
- Headers > x-token > eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjo2LCJpYXQiOjE3MDU5NDk3NTQsImV4cCI6MTgzMjE4MDE1NH0.jd6Kv7BDy6ogLXMyK5QpNS5e8eoz_1BHueRNIBmpmhE
---

#### Cambiar contraseña

- URL: `http://localhost:9090/api/perfil/password/:email`
- Método: `PUT`
- Datos requeridos:
  - `password`: Contraseña del usuario (string, requerido)
  - `token`: Token de autenticación (string)
- Parámetros de ruta:
  - `email`: Email del usuario (string, requerido)

##### Ejemplo de solicitud para cambiar contraseña
```json
{
  "password": "admin123"
}
```
---
## RUTAS PROGRAMADORES
---
#### LISTAR TAREAS LIBRES

- URL: `http://localhost:9090/api/tareas/libres`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)
---
#### ASIGNAR TAREA

- URL: `http://localhost:9090/api/tarea/asignar/:id`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID de la tarea (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)
---
#### QUITARSE TAREA

- URL: `http://localhost:9090/api/tarea/desasignar/:id`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID de la tarea (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)
---
#### LISTAR TAREAS ASIGNADAS

- URL: `http://localhost:9090/api/tareas/asignadas`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)
---
#### CONSULTAR TAREA ASIGNADA

- URL: `http://localhost:9090/api/tarea/asignada/:id`
- Método: `GET`
- Parámetros de ruta:
  - `id`: ID de la tarea (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)
---
#### LISTAR TODAS LAS TAREAS

- URL: `http://localhost:9090/api/tareas`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)
---
## RUTAS ADMINISTRADORES
---
#### Dar de alta usuario

- URL: `http://localhost:9090/api/usuario/alta`
- Método: `POST`
- Datos requeridos:
  - `nombre`: Nombre del usuario (string, requerido)
  - `email`: Email del usuario (string, requerido, único)
  - `password`: Contraseña del usuario (string, requerido)
  - `token`: Token de autenticación (string)

##### Ejemplo de solicitud para dar de alta usuario
```json
{
  "nombre" : "Patricia",
  "email" : "patricia@correo.com",
  "password": "admin123"
}
```
---
#### Dar de baja usuario

- URL: `http://localhost:9090/api/usuario/baja/:id`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID del usuario (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)
---
#### Modificar usuario

- URL: `http://localhost:9090/api/usuario/modificar/:id`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del usuario (integer, requerido)
- Datos requeridos:
  - `nombre`: Nombre del usuario (string, requerido)
  - `email`: Email del usuario (string, requerido, único)
  - `password`: Contraseña del usuario (string, requerido)
  - `token`: Token de autenticación (string)

##### Ejemplo de solicitud para modificar usuario
```json
{
  "nombre" : "Patricia",
  "email" : "patricia@correo.com",
  "password": "admin123"
}
```
---
#### Crear tarea

- URL: `http://localhost:9090/api/tarea/crear`
- Método: `POST`
- Datos requeridos:
  - `descripcion`: Descripción de la tarea (string, requerido)
  - `dificultad`: Dificultad de la tarea (string, requerido)
  - `horas_previstas`: Horas previstas de la tarea (integer, requerido)
  - `horas_realizadas`: Horas realizadas de la tarea (integer, requerido)
  - `porcentaje_realizacion`: Porcentaje de realización de la tarea (integer, requerido)
  - `completada`: Completada de la tarea (boolean, requerido)
  - `token`: Token de autenticación (string)

##### Ejemplo de solicitud para crear tarea
```json
{
  "descripcion" : "Tarea 1",
  "dificultad" : "L",
  "horas_previstas": 10,
  "horas_realizadas": 5,
  "porcentaje_realizacion": 50,
  "completada": false
}
```
---
#### Modificar tarea

- URL: `http://localhost:9090/api/tarea/modificar/:id`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID de la tarea (integer, requerido)
  - `token`: Token de autenticación (string)
- Datos requeridos:
  - `descripcion`: Descripción de la tarea (string, requerido)
  - `dificultad`: Dificultad de la tarea (string, requerido)
  - `horas_previstas`: Horas previstas de la tarea (integer, requerido)
  - `horas_realizadas`: Horas realizadas de la tarea (integer, requerido)
  - `porcentaje_realizacion`: Porcentaje de realización de la tarea (integer, requerido)
  - `completada`: Completada de la tarea (boolean, requerido)
  - `token`: Token de autenticación (string)

##### Ejemplo de solicitud para modificar tarea
```json
{
  "descripcion" : "Tarea 1",
  "dificultad" : "S",
  "horas_previstas": 10,
  "horas_realizadas": 5,
  "porcentaje_realizacion": 50,
  "completada": false
}
```
---
#### Eliminar tarea

- URL: `http://localhost:9090/api/tarea/eliminar/:id`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID de la tarea (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)
---
#### Asignar tarea a usuario

- URL: `http://localhost:9090/api/tarea/asignar/:id/:id_usuario`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID de la tarea (integer, requerido)
  - `id_usuario`: ID del usuario (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)
---
#### Ver tareas programador

- URL: `http://localhost:9090/api/tareas/programador/:id_usuario`
- Método: `GET`
- Parámetros de ruta:
  - `id_usuario`: ID del usuario (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)
---
#### Ver tareas realizadas

- URL: `http://localhost:9090/api/tareas/realizadas`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)
---
#### Ver tareas pendientes

- URL: `http://localhost:9090/api/tareas/pendientes`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)
---
#### Ver ranking de tareas

- URL: `http://localhost:9090/api/ranking`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)
---