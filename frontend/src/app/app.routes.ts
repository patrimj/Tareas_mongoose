import { Routes } from '@angular/router';
import { TareasComponent } from './components/tareas/tareas.component';
import { LoginComponent } from './components/login/login.component';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';
import { ModificarTareaComponent } from './components/modificar-tarea/modificar-tarea.component';
import { ConsultarTareaComponent } from './components/consultar-tarea/consultar-tarea.component';
import { InicioProgramadorComponent } from './components/inicio-programador/inicio-programador.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/login'}, // Si no se pone nada en la url, redirige a login
    {path: 'login', component: LoginComponent},
    {path: 'tareas', component: TareasComponent}, // Tareas para mi es el [INICIO] donde se encontrarán las diferentes funciones [crear, modificar, colsultar] --> ADMIN & [inicio] --> USUARIO
    {path: 'tareas/crear', component: CrearTareaComponent}, // ADMIN
    {path: 'tareas/modificar', component: ModificarTareaComponent}, //ADMIN
    {path: 'tareas/consultar', component: ConsultarTareaComponent},  //ADMIN
    {path: 'tareas/inicio', component: InicioProgramadorComponent}, //PROGRAMADOR
];

    