import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente.model';

const baseUrl = 'http://localhost:8090/rest/crudDocente';

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
  constructor(private http: HttpClient) {}

  consultaDocente(filtro: any): Observable<any> {
    return this.http.get(baseUrl + '/listaDocentePorNombreLike/' + filtro);
  }

  registraDocente(aux: Docente): Observable<any> {
    return this.http.post(baseUrl + '/registraDocente', aux);
  }

  actualizaDocente(aux: Docente): Observable<any> {
    return this.http.put(baseUrl + '/actualizaDocente', aux);
  }
}
