import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Analisis } from '../interfaces/Analisis';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {

  private myAppUrl: string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/analisis/'
   }
   getAnalisis_Lab(): Observable<Analisis[]>{
   return this.http.get<Analisis[]>(`${this.myAppUrl}${this.myApiUrl}`)
   }
   deleteAnalisis(idAnalisis: number):Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${idAnalisis}`)
   }

   addAnalisis(Analisis:Analisis):Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, Analisis)
  }
  getAnalisis(idAnalisis: number):Observable<Analisis>{
    return this.http.get<Analisis>(`${this.myAppUrl}${this.myApiUrl}${idAnalisis}`)
  }
  updateAnalisis(idAnalisis:number, Analisis: Analisis):Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${idAnalisis}`, Analisis)
  }
}
