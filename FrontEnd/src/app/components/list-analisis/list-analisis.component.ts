import { Component } from '@angular/core';
import { Analisi } from '../interfaces/analisis';



const listAnalisis: Analisi[] = [
  {nombre: "Luis", apellido: "Pulido", laboratorio: "ADN", resultados: "", fecha: new Date()}
];

@Component({
  selector: 'app-list-analisis',
  templateUrl: './list-analisis.component.html',
  styleUrls: ['./list-analisis.component.css']
})
export class ListAnalisisComponent {

  displayedColumns: string[] = ['nombre', 'apellido', 'laboratorio', 'resultados', 'fecha'];
  dataSource = listAnalisis;

}
