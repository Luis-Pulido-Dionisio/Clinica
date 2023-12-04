import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../interfaces/Doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {

  private myAppUrl: string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/doctores/'
   }
   getDoctores(): Observable<Doctor[]>{
   return this.http.get<Doctor[]>(`${this.myAppUrl}${this.myApiUrl}`)
   }
   deleteDoctor(idDoctores: number):Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${idDoctores}`)
   }

   addDoctor(Doctor:Doctor):Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, Doctor)
  }
  getDoctor(idDoctores: number):Observable<Doctor>{
    return this.http.get<Doctor>(`${this.myAppUrl}${this.myApiUrl}${idDoctores}`)
  }
  updateDoctor(idDoctores:number, Doctor: Doctor):Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${idDoctores}`, Doctor)
  }
}
