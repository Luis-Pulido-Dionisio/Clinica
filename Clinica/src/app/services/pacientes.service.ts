import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paciente } from '../interfaces/Paciente';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private myAppUrl: string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/pacientes/'
   }
   getPacientes(): Observable<Paciente[]>{
   return this.http.get<Paciente[]>(`${this.myAppUrl}${this.myApiUrl}`)
   }
   deletePaciente(idPacientes: number):Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${idPacientes}`)
   }

   addPaciente(Paciente:Paciente):Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, Paciente)
  }
}
