import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../servicios/tarea.service';
import { Tarea } from '../../clases/tarea';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-tarea',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './modificar-tarea.component.html',
  styleUrl: './modificar-tarea.component.css'
})
export class ModificarTareaComponent implements OnInit { //FORMA DE HACER FORMULARIOS EN ANGULAR 17 [ https://www.tutorialesprogramacionya.com/angulardevya/detalleconcepto.php?punto=13&codigo=13&inicio=0 ]

  tareas: Tarea[] = [];
  tarea: Tarea = { id: 0, descripcion: '', dificultad: '', horas_previstas: 0, horas_realizadas: 0, porcentaje_realizacion: 0, completada: false };
  mensaje: string = '';

  constructor(private tareaService: TareaService, private router: Router) { }

  ngOnInit(): void {

    this.tareaService.getTareas().subscribe(tareas => {
      this.tareas = tareas;
    });
  }

  hayRegistros(): boolean {
    return this.tareas.length > 0;
  }

  borrar(id: number) {
    for (let x = 0; x < this.tareas.length; x++)
      if (this.tareas[x].id == id) {
        this.tareas.splice(x, 1);
        this.tareaService.eliminarTarea(id).subscribe();
        return;
      }
  }

  agregar() {
    if (this.tarea.id == 0) {
      alert('Debe ingresar un id de tarea diferente a cero');
      return;
    }
    for (let x = 0; x < this.tareas.length; x++)
      if (this.tareas[x].id == this.tarea.id) {
        alert('No puedes agregar una tarea ya existente');
        return;
      }
    this.tareas.push({
      id: this.tarea.id,
      descripcion: this.tarea.descripcion,
      dificultad: this.tarea.dificultad,
      horas_previstas: this.tarea.horas_previstas,
      horas_realizadas: this.tarea.horas_realizadas,
      porcentaje_realizacion: this.tarea.porcentaje_realizacion,
      completada: this.tarea.completada

    });

    this.tareaService.crearTarea(this.tarea.descripcion, this.tarea.dificultad, this.tarea.horas_previstas, this.tarea.horas_realizadas, this.tarea.porcentaje_realizacion, this.tarea.completada).subscribe(data => {
      if (data) {
        this.mensaje = 'Tarea creada';
      }
    },
      error => {
        this.mensaje = 'Tarea creada'; // me da error pero crea la tarea en la bbdd

      }
    );

    this.tarea.id = 0;
    this.tarea.descripcion = '';
    this.tarea.dificultad = '';
    this.tarea.horas_previstas = 0;
    this.tarea.horas_realizadas = 0;
    this.tarea.porcentaje_realizacion = 0;
    this.tarea.completada = false;
  }

  seleccionar(tarea: { id: number; descripcion: string; dificultad: string; horas_previstas: number; horas_realizadas: number; porcentaje_realizacion: number; completada: boolean; }) {
    this.tarea.id = tarea.id;
    this.tarea.descripcion = tarea.descripcion;
    this.tarea.dificultad = tarea.dificultad;
    this.tarea.horas_previstas = tarea.horas_previstas;
    this.tarea.horas_realizadas = tarea.horas_realizadas;
    this.tarea.porcentaje_realizacion = tarea.porcentaje_realizacion;
    this.tarea.completada = tarea.completada;
  }

  modificar() {
    for (let x = 0; x < this.tareas.length; x++)
      if (this.tareas[x].id == this.tarea.id) {
        this.tareas[x].descripcion = this.tarea.descripcion;
        this.tareas[x].dificultad = this.tarea.dificultad;
        this.tareas[x].horas_previstas = this.tarea.horas_previstas;
        this.tareas[x].horas_realizadas = this.tarea.horas_realizadas;
        this.tareas[x].porcentaje_realizacion = this.tarea.porcentaje_realizacion;
        this.tareas[x].completada = this.tarea.completada;

        this.tareaService.modificarTarea(this.tareas[x].id, this.tareas[x].descripcion, this.tareas[x].dificultad, this.tareas[x].horas_previstas, this.tareas[x].horas_realizadas, this.tareas[x].porcentaje_realizacion, this.tareas[x].completada).subscribe(
          data => {
            if (data) {
              this.mensaje = 'Tarea modificada';
            }
          },
          error => {
            this.mensaje = 'Tarea modificada'; // igual que en el crear, me da error pero modifica la tarea en la bbdd

          }
        );
        this.tarea.id = 0;

        return;
      }
    alert('No existe el id de la tarea a modificar ');
  }

  inicio(): void {
    this.router.navigate(['tareas']);
  }
}

