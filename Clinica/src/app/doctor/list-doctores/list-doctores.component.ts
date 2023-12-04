import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from '../../interfaces/Doctor';
import { DoctoresService } from '../../services/doctores.service';
import { AgregarEditarDoctoresComponent } from '../agregar-editar-doctores/agregar-editar-doctores.component';

@Component({
  selector: 'app-list-doctores',
  templateUrl: './list-doctores.component.html',
  styleUrls: ['./list-doctores.component.css']
})
export class ListDoctoresComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['Nombre_Doc', 'Apellidos_Doc', 'Especialidad', 'Turno', 'No_Consultorio','Telefono', 'Acciones'];
  dataSource: MatTableDataSource<Doctor>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _doctoresService: DoctoresService, private _snackBar: MatSnackBar){
    this.dataSource = new MatTableDataSource();
  }
  
  ngOnInit(): void {
    this.obtenerDoctores();
  }

  ngAfterViewInit():void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator._intl.itemsPerPageLabel = "item por pagina"
  }

  obtenerDoctores() {
    this.loading = true;
    setTimeout(() => {
      
    }, 2000);
    this._doctoresService.getDoctores().subscribe(data => {
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

  addEditDoctor(idDoctores?:number){
    const dialogRef = this.dialog.open(AgregarEditarDoctoresComponent, {
     width: '550px',
     disableClose: true,
     data: {idDoctores : idDoctores}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Cancelado xd');
      if(result){
        this.obtenerDoctores();
      }
      
    });
    
  }

  deleteDoctor(idDoctores: number){
    this.loading = true;
    this._doctoresService.deleteDoctor(idDoctores).subscribe(() => {
      this.obtenerDoctores();
      this.mensajeExito();
    })
  }

  mensajeExito(){
    this._snackBar.open('El Doctor fue eliminado con exito', ',', {
      duration: 2000
    });
  }

}
