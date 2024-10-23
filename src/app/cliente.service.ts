import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  buscarCliente(sharedKey: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${sharedKey}`);
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  // Búsqueda avanzada
  buscarAvanzado(filtros: any): Observable<Cliente[]> {
    let params = new HttpParams();
    
    if (filtros.sharedKey) {
      params = params.set('sharedKey', filtros.sharedKey);
    }
    if (filtros.nombre) {
      params = params.set('nombre', filtros.nombre);
    }
    if (filtros.telefono) {
      params = params.set('telefono', filtros.telefono);
    }
    if (filtros.email) {
      params = params.set('email', filtros.email);
    }
    if (filtros.fecha) {
      params = params.set('fecha', filtros.fecha);
    }

    return this.http.get<Cliente[]>(`${this.apiUrl}/buscar`, { params });
  }
}
