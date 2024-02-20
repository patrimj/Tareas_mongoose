import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Tarea } from '../clases/tarea';
import { AuthService } from './auth.service';
import { TareaAsignada } from '../clases/tarea-asignada';
import { TareaAsignadaPro } from '../interfaces/tarea-asignada';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient,  private authService: AuthService) { }

  crearTarea(descripcion: string, dificultad:string, horas_previstas: number, horas_realizadas: number, porcentaje_realizacion: number, completada: boolean): Observable<Tarea | undefined> {
    const headers = new HttpHeaders({
      'x-token' : this.authService.getToken(),
    });
    return this.http.post<Tarea>(`${this.baseUrl}/tarea/crear`, { descripcion, dificultad, horas_previstas, horas_realizadas, porcentaje_realizacion, completada }, { headers }).pipe(
      tap(response => {
        console.log('Response:', response);
        if (response) {
          console.log('Tarea creada:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error; 
      })
    );
  }

  modificarTarea(id: number, descripcion: string, dificultad:string, horas_previstas: number, horas_realizadas: number, porcentaje_realizacion: number, completada: boolean): Observable<Tarea | undefined> {
    const headers = new HttpHeaders({
      'x-token' : this.authService.getToken(),
    });
    return this.http.put<Tarea>(`${this.baseUrl}/tarea/modificar/${id}`, { descripcion, dificultad, horas_previstas, horas_realizadas, porcentaje_realizacion, completada }, { headers }).pipe(
       tap(response => {
         if (response && response.descripcion && response.dificultad && response.horas_previstas && response.horas_realizadas && response.porcentaje_realizacion && response.completada) {
           console.log('Tarea modificada:', response)
         } else {
           throw new Error('Error, datos incorrectos');
         }
       }),
       catchError((error) => {
         console.error(error);
         throw error; 
       })
    );
   }

   eliminarTarea(id: number): Observable<Tarea | undefined> {

    const headers = new HttpHeaders({
      'x-token' : this.authService.getToken(),
    });
    return this.http.delete<Tarea>(`${this.baseUrl}/tarea/eliminar/${id}`, { headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Tarea eliminada:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error; 
      })
    );
   }

   getTareas(): Observable<Tarea[]> {
    const headers = new HttpHeaders({
      'x-token' : this.authService.getToken(),
    });
    return this.http.get<Tarea[]>(`${this.baseUrl}/tareas`,{ headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Tareas:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error; 
      })
    );
   }
   
   ranking (): Observable<TareaAsignada[]> {
    const headers = new HttpHeaders({
      'x-token' : this.authService.getToken(),
    });
    return this.http.get<TareaAsignada[]>(`${this.baseUrl}/ranking`,{ headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Ranking:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error; 
      })
    );
   }

   tareasRealizadas (): Observable<Tarea[]> {
    const headers = new HttpHeaders({
      'x-token' : this.authService.getToken(),
    });
    return this.http.get<Tarea[]>(`${this.baseUrl}/tareas/realizadas`,{ headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Tareas realizadas:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error; 
      })
    );
   }

   tareasPendientes (): Observable<Tarea[]> {
    const headers = new HttpHeaders({
      'x-token' : this.authService.getToken(),
    });
    return this.http.get<Tarea[]>(`${this.baseUrl}/tareas/pendientes`,{ headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Tareas pendientes:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error; 
      })
    );
   }

   tareasProgramadorID (id: number): Observable<TareaAsignadaPro[]> {
    const headers = new HttpHeaders({
      'x-token' : this.authService.getToken(),
    });
    console.log('id:', id);
    return this.http.get<TareaAsignadaPro[]>(`${this.baseUrl}/tareas/programador/${id}`,{headers}).pipe(
      tap(response => {
        if (response) {
          console.log('Tareas de programador:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error; 
      })
    );
   }

   listarTareasAsignadas(): Observable<TareaAsignadaPro[]> {
    const headers = new HttpHeaders({
      'x-token' : this.authService.getToken(),
    });
    return this.http.get<TareaAsignadaPro[]>(`${this.baseUrl}/tareas/asignadas`,{ headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Tareas asignadas:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error; 
      })
    );
   }


   modificarTareaPro(tareaAsignada: TareaAsignadaPro): Observable<TareaAsignadaPro | undefined> {
    const headers = new HttpHeaders({
       'x-token': this.authService.getToken(),
    });
    return this.http.put<TareaAsignadaPro>(`${this.baseUrl}/tareaPro/modificar/${tareaAsignada.tarea.id}`, tareaAsignada, { headers }).pipe(
       tap(response => {
         if (response && response.tarea && response.tarea.descripcion && response.tarea.dificultad && response.tarea.horas_previstas && response.tarea.horas_realizadas && response.tarea.porcentaje_realizacion && response.tarea.completada) {
           console.log('Tarea asignada modificada:', response);
         } else {
           throw new Error('Error, datos incorrectos');
         }
       }),
       catchError((error) => {
         console.error(error);
         throw error;
       })
    );
   }

}