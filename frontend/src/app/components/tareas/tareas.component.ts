import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../servicios/auth.service';
import { map } from 'rxjs/operators';
import { Rol } from '../../clases/rol';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent implements OnInit {

  nombre: string = '';
  id: number = 0;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    let nombre = this.getLocal('usuario'); // el getLocal es lo mismo que el getItem pero daba error en el ngOnInit
    this.nombre = nombre !== null ? nombre : ''; // con esto evitamos que nos salga null en el nombre y nos de error
    let id = this.getLocal('id') // recuperamos el id del usuario cuando se inicio sesion para lo de los roles y botones
    this.id = id !== null ? parseInt(id) : 0;
  }

  crearTarea(): void {
    this.router.navigate(['tareas/crear']);
  }

  getLocal(valueSearch: string): string { // funcion para obtener el valor de un localstorage [by Badr]
    return localStorage.getItem(valueSearch) || '';
  }

  modificarTarea(): void {
    this.router.navigate(['tareas/modificar']);
  }

  consultarTarea(): void {
    this.router.navigate(['tareas/consultar']);
  }
  listarAsignadas(): void {
    this.router.navigate(['tareas/inicio']);
  }


  esAdmin(): Observable<boolean> {
    return this.authService.esAdmin(this.id).pipe(
      map(rol => {
        if (rol && rol[0].id_rol == 1) {
          console.log('Rol:', rol)
          return true;
        } else {
          return false;
        }
      })
    );
  }

  esAmbos(): Observable<boolean> {
    return this.authService.esAdmin(this.id).pipe(
      map(rol => {
        if (rol && rol[0].id_rol == 2 && rol[1].id_rol == 1) {
          console.log('Rol:', rol)
          return true;
        } else {
          return false;
        }
      })
    );
  }



}
