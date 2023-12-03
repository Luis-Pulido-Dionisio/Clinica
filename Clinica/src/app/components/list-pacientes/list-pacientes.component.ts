import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Paciente } from 'src/app/interfaces/Paciente';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarPacientesComponent } from '../agregar-editar-pacientes/agregar-editar-pacientes.component';
import { PacientesService } from 'src/app/services/pacientes.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-list-pacientes',
  templateUrl: './list-pacientes.component.html',
  styleUrls: ['./list-pacientes.component.css']
})
export class ListPacientesComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['Nombre_Pac', 'Apellidos_Pac', 'Direccion', 'Genero', 'Fecha_Nac', 'Acciones'];
  dataSource: MatTableDataSource<Paciente>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _pacienteService: PacientesService, private _snackBar: MatSnackBar){
    this.dataSource = new MatTableDataSource();
  }
  
  ngOnInit(): void {
    this.obtenerPacientes();
  }

  ngAfterViewInit():void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator._intl.itemsPerPageLabel = "item por pagina"
  }

  obtenerPacientes() {
    this.loading = true;
    setTimeout(() => {
      
    }, 2000);
    this._pacienteService.getPacientes().subscribe(data => {
      //console.log(data);
      this.loading = false;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditPaciente(){
    const dialogRef = this.dialog.open(AgregarEditarPacientesComponent, {
     width: '550px',
     disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Cancelado xd');
      if(result){
        this.obtenerPacientes();
      }
      
    });
  }

  deletePaciente(idPacientes: number){
    this.loading = true;
    this._pacienteService.deletePaciente(idPacientes).subscribe(() => {
      this.obtenerPacientes();
      this.mensajeExito();
    })
  }

  mensajeExito(){
    this._snackBar.open('La persona fue eliminada con exito', ',', {
      duration: 2000
    });
  }
}
