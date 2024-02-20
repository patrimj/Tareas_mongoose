import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TareaService } from '../../servicios/tarea.service';
import { validar } from './validaciones';

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-tarea.component.html',
  styleUrl: './crear-tarea.component.css'
})
export class CrearTareaComponent {
  title = 'Crear Tarea';
  descripcion: string = '';
  dificultad: string = '';
  horas_previstas: number = 0;
  horas_realizadas: number = 0;
  porcentaje_realizacion: number = 0;
  completada: boolean = false;

  mensaje: string = '';


  constructor(private tareaService: TareaService, private router: Router) { }

  handleSubmit(): void {

    //MENSAJES DE VALIDACION
    const mensajeValidado = validar(this.descripcion, this.dificultad, this.horas_previstas, this.horas_realizadas, this.porcentaje_realizacion, this.completada);
    if (mensajeValidado) {
      this.mensaje = mensajeValidado;
      return;
    }

    this.tareaService.crearTarea(this.descripcion, this.dificultad, this.horas_previstas, this.horas_realizadas, this.porcentaje_realizacion, this.completada).subscribe(

      data => {
        if (data) {
          this.mensaje = 'Tarea creada';
        }
      },
      error => {
        this.mensaje = 'Error, tarea no creada';

      }
    );
  }
  inicio(): void {
    this.router.navigate(['tareas']);
  }

}
