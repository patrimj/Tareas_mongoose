# EJERCICIO MONGOOSE - NODEJS
---

## ÍNDICE
[1. COMANDOS UTILIZADOS](#1-comandos-utilizados)

[2. MANUAL DE USO DE LA API](#2-manual-de-uso-de-la-api)

---
## 1. COMANDOS UTILIZADOS
- Instalar ``MongoDB``
```bash
npm install mongodb
```
- Instalar ``Mongoose``
```bash
npm install mongoose
```
-  Instalación de todas las dependencias del package.json y la carpeta ``node_modules``
``` bash
npm install 
```
---
## 2. MANUAL DE USO DE LA API

## RUTAS USUARIOS

---
#### Registrar usuario

- URL: `http://localhost:9090/api/registrarse`
- Método: `POST`
- Datos requeridos:
  - `id`: ID del usuario (integer, requerido, único)
  - `nombre`: Nombre del usuario (string, requerido)
  - `email`: Email del usuario (string, requerido, único)
  - `password`: Contraseña del usuario (string, requerido)

##### Ejemplo de solicitud para registrar usuario
```json
{
  "id":2,
  "nombre": "Administrador",
  "email": "admin@correo.com",
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
  "email": "admin@correo.com",
  "password": "admin123"
}
```
##### Ejemplo de respuesta al iniciar sesión 
>  [!NOTE] El token no caducará en 4 años 
```json
{
  "usuario": {
    "_id": "65d7ce80bc7d8230e9551a98",
    "id": 2,
    "nombre": "Administrador",
    "email": "admin@correo.com",
    "password": "admin123"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA4NjQyMjA2LCJleHAiOjE4MzQ4NzI2MDZ9.fLgn3Ne7aHlng-U3f5KtNy-nb3NKo4LWpS68m-79idM"
}
```
>  [!NOTE] El token deberá ser enviado en el header de las peticiones que lo requieran, con el nombre [x-token].
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
  "password": "admin1234"
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
  
> [!NOTE] Solo se puede asignar una tarea en la que el id_usuario sea null
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
  - `id`: ID del usuario (integer, requerido, único)
  - `nombre`: Nombre del usuario (string, requerido)
  - `email`: Email del usuario (string, requerido, único)
  - `password`: Contraseña del usuario (string, requerido)
  - `token`: Token de autenticación (string)

##### Ejemplo de solicitud para dar de alta usuario
```json
{
  "id": 3,
  "nombre": "Usuario Alta",
  "email": "alta@correo.com",
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
  - `ID`: ID del usuario (integer, requerido, único)
  - `nombre`: Nombre del usuario (string, requerido)
  - `email`: Email del usuario (string, requerido, único)
  - `password`: Contraseña del usuario (string, requerido)
  - `token`: Token de autenticación (string)

##### Ejemplo de solicitud para modificar usuario
```json
{
  "id":3,
  "nombre": "Usuario Modificar",
  "email": "modificar@correo.com",
  "password": "admin"
}
```
---
#### Crear tarea

- URL: `http://localhost:9090/api/tarea/crear`
- Método: `POST`
- Datos requeridos:
  - `id`: ID de la tarea (integer, requerido, único)
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
  "id":1,
  "descripcion": "Tarea 1",
  "dificultad": "XL",
  "horas_previstas": 13,
  "horas_realizadas": 0,
  "porcentaje_realizacion": 0,
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
  "id":1,
  "descripcion": "Tarea Modificada",
  "dificultad": "XL",
  "horas_previstas": 13,
  "horas_realizadas": 0,
  "porcentaje_realizacion": 0,
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