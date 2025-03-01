import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "/api/users";

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  crearUsuario(usuario: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl, usuario, { headers });
  }

  listarUsuarios(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.apiUrl, { headers });
  }

  editarUsuario(id: string, usuario: any): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, usuario, { headers });
  }

  eliminarUsuario(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, { headers });
  }
}