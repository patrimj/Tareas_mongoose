import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../servicios/tarea.service';
import { TareaAsignadaPro } from '../../interfaces/tarea-asignada';
import { Tarea } from '../../clases/tarea';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio-programador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inicio-programador.component.html',
  styleUrl: './inicio-programador.component.css'
})
export class InicioProgramadorComponent implements OnInit {

  nombre: string = '';
  id: number = 0;

  tareasPro: TareaAsignadaPro[] = [];
  tareaPro: TareaAsignadaPro = { id_tarea: 0, id_usuario: 0, createdAt: '', updatedAt: '', tarea: { id: 0, descripcion: '', dificultad: '', horas_previstas: 0, horas_realizadas: 0, porcentaje_realizacion: 0, completada: false, createdAt: '', updatedAt: '' } };

  tareas: Tarea[] = [];
  tarea: Tarea = { id: 0, descripcion: '', dificultad: '', horas_previstas: 0, horas_realizadas: 0, porcentaje_realizacion: 0, completada: false };

  mensaje: string = '';
  constructor(private tareaService: TareaService, private router: Router) {
  }

  ngOnInit(): void {
    let nombre = this.getLocal('usuario'); // el getLocal es lo mismo que el getItem pero daba error en el ngOnInit
    this.nombre = nombre !== null ? nombre : ''; // con esto evitamos que nos salga null en el nombre y nos de error

    this.tareaService.listarTareasAsignadas().subscribe(tareas => {
      this.tareasPro = tareas;
    });
  }

  getLocal(valueSearch: string): string { // funcion para obtener el valor de un localstorage by Badr
    return localStorage.getItem(valueSearch) || '';
  }

  seleccionar(tarea: TareaAsignadaPro) {
    this.tareaPro.id_tarea = tarea.id_tarea;
    this.tareaPro.id_usuario = tarea.id_usuario;
    this.tareaPro.createdAt = tarea.createdAt;
    this.tareaPro.updatedAt = tarea.updatedAt;
    this.tareaPro.tarea = tarea.tarea;
  }

  modificar() {
    for (let x = 0; x < this.tareasPro.length; x++) {
      if (this.tareasPro[x].id_tarea == this.tareaPro.id_tarea) {
        this.tareasPro[x].tarea.porcentaje_realizacion = this.tareaPro.tarea.porcentaje_realizacion;

        if (this.tareasPro[x].tarea.porcentaje_realizacion == 100) {
          this.tareasPro[x].tarea.completada = true;
        } else {
          this.tareasPro[x].tarea.completada = false;
        }

        this.tareaService.modificarTareaPro(this.tareasPro[x]).subscribe();
        this.mensaje = 'Tarea modificada';

        return;
      }
    }
    alert('No existe el id de la tarea a modificar');
  }

  inicio(): void {
    this.router.navigate(['tareas']);
  }
}