import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Paciente } from 'src/app/interfaces/Paciente';


const listPaciente : Paciente[] = [
  {Nombre_Pac: "Luis", Apellido_Pac : "Pulido", Direccion : "Guillermo Hernandez", Genero: "Masculino", Telefono: "274-175-5442", Fecha_Nac :new Date},
  {Nombre_Pac: "Shirel", Apellido_Pac : "Vazquez", Direccion : "", Genero: "", Telefono: "Femenino", Fecha_Nac :new Date},
  {Nombre_Pac: "Deisy", Apellido_Pac : "Castro", Direccion : "", Genero: "Femenino", Telefono: "", Fecha_Nac :new Date},
  {Nombre_Pac: "Kimberley", Apellido_Pac : "Perez", Direccion : "", Genero: "Femenino", Telefono: "", Fecha_Nac :new Date},
  {Nombre_Pac: "Keila", Apellido_Pac : "XD", Direccion : "", Genero: "Femenino", Telefono: "", Fecha_Nac :new Date},
  {Nombre_Pac: "XD", Apellido_Pac : "XD", Direccion : "", Genero: "Femenino", Telefono: "", Fecha_Nac :new Date}
];

@Component({
  selector: 'app-list-pacientes',
  templateUrl: './list-pacientes.component.html',
  styleUrls: ['./list-pacientes.component.css']
})
export class ListPacientesComponent implements AfterViewInit {

  displayedColumns: string[] = ['Nombre_Pac', 'Apellido_Pac', 'Direccion', 'Genero', 'Fecha_Nac', 'Acciones'];
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
