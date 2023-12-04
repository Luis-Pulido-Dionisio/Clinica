import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consulta } from '../interfaces/Consultas';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private myAppUrl: string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/consultas/'
   }
   getConsultas(): Observable<Consulta[]>{
   return this.http.get<Consulta[]>(`${this.myAppUrl}${this.myApiUrl}`)
   }
   deleteConsulta(idConsultas: number):Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${idConsultas}`)
   }

   addConsulta(Consulta:Consulta):Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, Consulta)
  }
  getConsulta(idConsultas: number):Observable<Consulta>{
    return this.http.get<Consulta>(`${this.myAppUrl}${this.myApiUrl}${idConsultas}`)
  }
  updateConsulta(idConsultas:number, Consulta: Consulta):Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${idConsultas}`, Consulta)
  }
}
