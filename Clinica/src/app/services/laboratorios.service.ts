import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Laboratorio } from '../interfaces/Laboratorio';

@Injectable({
  providedIn: 'root'
})
export class LaboratoriosService {

  private myAppUrl: string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/laboratorios/'
   }
   getLaboratorios(): Observable<Laboratorio[]>{
   return this.http.get<Laboratorio[]>(`${this.myAppUrl}${this.myApiUrl}`)
   }
   deleteLaboratorio(idLaboratorios: number):Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${idLaboratorios}`)
   }

   addLaboratorio(Laboratorio:Laboratorio):Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, Laboratorio)
  }
  getLaboratorio(idLaboratorios: number):Observable<Laboratorio>{
    return this.http.get<Laboratorio>(`${this.myAppUrl}${this.myApiUrl}${idLaboratorios}`)
  }
  updateLaboratorio(idLaboratorios:number, Laboratorio: Laboratorio):Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${idLaboratorios}`, Laboratorio)
  }
}
