import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Paciente } from 'src/app/interfaces/Paciente';


const listPaciente : Paciente[] = [
  {Nombre_Pac: "Luis", Apellido_Pac : "Pulido", Direccion : "", Genero: "", Telefono: "", Fecha_Nac :new Date},
  {Nombre_Pac: "Luis", Apellido_Pac : "Pulido", Direccion : "", Genero: "", Telefono: "", Fecha_Nac :new Date},
  {Nombre_Pac: "Luis", Apellido_Pac : "Pulido", Direccion : "", Genero: "", Telefono: "", Fecha_Nac :new Date},
  {Nombre_Pac: "Luis", Apellido_Pac : "Pulido", Direccion : "", Genero: "", Telefono: "", Fecha_Nac :new Date},
  {Nombre_Pac: "Luis", Apellido_Pac : "Pulido", Direccion : "", Genero: "", Telefono: "", Fecha_Nac :new Date},
  {Nombre_Pac: "Luis", Apellido_Pac : "Pulido", Direccion : "", Genero: "", Telefono: "", Fecha_Nac :new Date}
];

@Component({
  selector: 'app-list-pacientes',
  templateUrl: './list-pacientes.component.html',
  styleUrls: ['./list-pacientes.component.css']
})
export class ListPacientesComponent implements AfterViewInit {

  displayedColumns: string[] = ['Nombre_Pac', 'Apellido_Pac', 'Direccion', 'Genero', 'Fecha_Nac'];
  dataSource: MatTableDataSource<Paciente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(){
    this.dataSource = new MatTableDataSource(listPaciente);
  }


  ngAfterViewInit():void {
    this.dataSource.paginator = this.paginator;
   // this.dataSource.paginator._intl.itemsPerPageLabel = "item por pagina"
   this.dataSource.sort = this.sort;
  }
}
