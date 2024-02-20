# EJERCICIO TAREAS CLIENTES EN ANGULAR

---

## ÍNDICE

[0. PASOS PARA COMPROBAR EL FUNCIONAMIENTO DE LA APLICACIÓN](#0-pasos-para-comprobar-el-funcionamiento-de-la-aplicación)

[1. DATOS QUE NECESITAS](#1-datos-que-necesitas)

[2. COMANDOS UTILIZADOS](#2-comandos-utilizados)

[3. ESTRUCTURACIÓN DEL PROYECTO](#3-estructuración-del-proyecto)

[4. PASOS SEGUIDOS](#4-pasos-seguidos)

[5. RUTAS](#5-rutas)


## 0. PASOS PARA COMPROBAR EL FUNCIONAMIENTO DE LA APLICACIÓN

### 1. Añadir ``.env`` en la carpeta ``backend`` e importar la BBDD ``tareaMigSeedNode_dev.sql`` en MySQL (crearla con el mismo nombre)

- ``.env`` 
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
-  Si se quiere comprobar el funcionamiento de las rutas con Thunder Client, importar  la colección con el archivo ``thunder-collection_Node_tareas.json`` 
-   Cualquier duda con backend (rutas o bbdd) --> README_NODE.MD 


### 2. Iniciar la aplicación (necesitaremos 2 terminales)

- Terminal 1: Para abrir el navegador (en ``esta`` carpeta)

```bash
npm install 
ng serve --open es para 
```

- Terminal 2: Iniciar el servidor de Node (en la carpeta ``backend``)

```bash
cd backend
npm install 
nodemon
```
-  Si está funcionando correctamente, en la terminal deberá aparecer el mensaje ``Servidor escuchando en: 9090``

---

## 1. DATOS QUE NECESITAS

### 1.1. INICIAR SESIÓN

- **ADMINISTRADOR**
  - email: ``admin@correo.com``
  - password:``admin1234``

- **PROGRAMADOR**
  - email: ``correo@usuario.com``
  - password: ``user1234``

- **TODOS LOS ROLES**
  - email:  ``correo@todosroles.com``
  - password: ``admin1234

### 1.1. DATOS A RELLENAR EN UNA TAREA
- Descripcción: ``Tarea de prueba``
- Dificultad: ``XL`` (SOLO SE PERMITE EN EL SERVIDOR XL, L, M, S, XS)
- Horas previstas: ``10``
- Horas realizadas: ``0``
- Porcentaje: ``0``
- Completada: ``false``

### 1.2. ID DE PROGRMADORES 
- 6
- 4

## 2. COMANDOS UTILIZADOS

### Crear un nuevo proyecto

```bash
ng new mi-proyecto
```

### Iniciar el servidor

```bash
ng serve --open
```

### Generar componentes

```bash
ng generate component nuevo-componente
```

### Generar interfaces

```bash
ng generate interface nueva-interfaz
```

### Generar clases

```bash
ng generate class clases/usuario
```

## POPUP TEMAS (no la he utilizado)
```bash
ng add @angular/material
```

## 3. ESTRUCTURACIÓN DEL PROYECTO

### APP 

##### [COMPONENTES](#COMPONENTES) 

Los componentes son los que controlan las vistas de la aplicación. Dividir componentes en pantallas o partes de la aplicación.

- ``consultar-tarea``: Componente que muestra los diferentes tipos de consultas que puede hacer el Admin (Ranking de Programadores, tareas pendientes, tareas realizadas y tareas de un programador en concreto )
- ``crear-tarea``: Componente que permite crear una nueva tarea al Administrador. 
- ``inicio-programador``: Componente donde se listan todas las tareas, acceder a su detalle y modificar el porcentaje al Programador.
- ``login``: Componente que permite el acceso a los usuarios (admin - progrmador)
-  ``modificar-tarea``: Componente que permite modificar una tarea al Administrador.
-  ``tareas``: el menu de inicio, aquí se encontrá enlace a crear, modificar y consultar tareas, para el Administrador. O Listar tareas para el Programador.
- ``app.component``: Componente principal de la aplicación.
- ``app.routes``: Archivo de rutas de la aplicación.
- ``app.config``: Archivo de configuración de la aplicación. Importaremos el módulo HttpClient para poder hacer peticiones HTTP.

##### [CLASES](#CLASES) 

- ``tarea``: Clase que contiene los atributos de una tarea.
- ``usuario``: Clase que contiene los atributos de un usuario.
- ``rol``: Clase que contiene los atributos de los roles.
- ``tarea-asignada``: Clase que contiene los atributos de una tarea asignada (ranking).

##### [INTERFACES](#INTERFACES) 
- ``tarea``: Interfaz que contiene los atributos de una tarea.
- ``usuario``: Interfaz que contiene los atributos de un usuario.
- ``respuesta-login``: Interfaz que contiene los atributos de la respuesta del login. (el usuario y su token)
- ``tarea-asignada``: Interfaz que contiene los atributos de una tarea asignada (tabla tarea asignada y tarea con sus detalles).

##### [ENVIROMENTS](#ENVIROMENTS) 
- ``environment``: Archivo de configuración de la aplicación, con la url del servidor.

```bash
    baseUrl:'http://localhost:9090/api'
```

##### [SERVICIOS](#SERVICIOS) 
- ``tarea.service``: Servicio que contiene los métodos para la gestión de las tareas.
- ``auth.service``: Servicio que contiene los métodos para la gestión de la autenticación.
  

## 4. PASOS SEGUIDOS

### IMPORTAMOS ``HTTPCLIENT`` EN ``app.config.ts``

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Importamos el módulo HttpClient para poder hacer peticiones HTTP

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient()]
};
```

### CREAMOS LAS RUTAS EN ``app.routes.ts``

```typescript

import { Routes } from '@angular/router';
import { TareasComponent } from './tareas/tareas.component';
import { LoginComponent } from './login/login.component';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { ModificarTareaComponent } from './modificar-tarea/modificar-tarea.component';
import { ConsultarTareaComponent } from './consultar-tarea/consultar-tarea.component';
import { InicioProgramadorComponent } from './inicio-programador/inicio-programador.component';

export const routes: Routes = [
    //{path: '', pathMatch: 'full', redirectTo: '/login'}, // Si no se pone nada en la url, redirige a login
    {path: 'login', component: LoginComponent},
    {path: 'tareas', component: TareasComponent}, // Tareas para mi es el [INICIO] donde se encontrarán las diferentes funciones [crear, modificar, colsultar] --> ADMIN & [inicio] --> USUARIO
    {path: 'tareas/crear', component: CrearTareaComponent}, // ADMIN
    {path: 'tareas/modificar', component: ModificarTareaComponent}, //ADMIN
    {path: 'tareas/consultar', component: ConsultarTareaComponent},  //ADMIN
    {path: 'tareas/inicio', component: InicioProgramadorComponent}, //PROGRAMADOR
];
```

## 5. RUTAS

```bash
http://localhost:9090/api/registrarse                       // POST
http://localhost:9090/api/login                             // POST
http://localhost:9090/api/perfil/password/:email            // PUT
http://localhost:9090/api/tareas/libres                     // GET
http://localhost:9090/api/tarea/asignar/:id                 // PUT
http://localhost:9090/api/tarea/desasignar/:id              // PUT
http://localhost:9090/api/tareas/asignadas                  // GET
http://localhost:9090/api/tarea/asignada/:id                // GET
http://localhost:9090/api/tareas                            // GET
http://localhost:9090/api/usuario/alta                      // POST
http://localhost:9090/api/usuario/baja/:id                  // DELETE 
http://localhost:9090/api/usuario/modificar/:id             // PUT
http://localhost:9090/api/tarea/crear                       // POST
http://localhost:9090/api/tarea/modificar/:id               // PUT
http://localhost:9090/api/tarea/eliminar/:id                // DELETE
http://localhost:9090/api/tarea/asignar/:id/:id_usuario     // PUT
http://localhost:9090/api/tareas/programador/:id_usuario    // GET
http://localhost:9090/api/tareas/realizadas                 // GET
http://localhost:9090/api/tareas/pendientes                 // GET
http://localhost:9090/api/ranking                           // GET
```



