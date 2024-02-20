import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TareasComponent } from './components/tareas/tareas.component';
import { LoginComponent } from './components/login/login.component';
import { ModificarTareaComponent } from './components/modificar-tarea/modificar-tarea.component';
import { InicioProgramadorComponent } from './components/inicio-programador/inicio-programador.component';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';
import { ConsultarTareaComponent } from './components/consultar-tarea/consultar-tarea.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TareasComponent, LoginComponent, ModificarTareaComponent,InicioProgramadorComponent, CrearTareaComponent, ConsultarTareaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tareas Cliente';
}
