import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => { // intercepta todas las llamadas http y ejecuta codigo antes de que se realice la llamada
  console.log('interceptor');
  return next(req);
};
