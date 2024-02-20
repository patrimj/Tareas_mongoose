import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { RespuestaLogin } from '../interfaces/respuesta-login';
import { tap } from 'rxjs/operators';
import { Rol } from '../clases/rol';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<RespuestaLogin | undefined> {
    return this.http.post<RespuestaLogin>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.token && response.usu) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario', response.usu.nombre);
          localStorage.setItem('id', response.usu.id.toString());
          console.log('Usuario correcto:', response)
          console.log('Usuario con token:', response.token)
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

  esAdmin(id_usuario: number): Observable<Rol[]> {

    return this.http.get<Rol[]>(`${this.baseUrl}/rol/${id_usuario}`).pipe(
      tap(response => {
        if (response) {
          console.log('Id:', response)
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


  private token: string | number = '';

  setToken(token: string | number): void { // guarda el token en el localstorage
    this.token = token;
    localStorage.setItem('token', token.toString());
  }

  getToken(): string | number { // obtiene el token del localstorage
    if (!this.token) {
      this.token = localStorage.getItem('token') || '';
    }
    return this.token;
  }

  logout(): void { // elimina el token del localstorage
    this.token = '';
    localStorage.removeItem('token');
  }

}
