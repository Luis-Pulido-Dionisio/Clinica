import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Consulta } from '../../interfaces/Consultas';
import { AgregarEditarConsultasComponent } from '../agregar-editar-consultas/agregar-editar-consultas.component';

@Component({
  selector: 'app-list-consultas',
  templateUrl: './list-consultas.component.html',
  styleUrls: ['./list-consultas.component.css']
})
export class ListConsultasComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['Nombre_Pac', 'Nombre_Doc', 'No_Consultorio', 'Hora', 'Motivo', 'Fecha_Con', 'Acciones'];
  dataSource: MatTableDataSource<Consulta>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _consultasService: ConsultasService, private _snackBar: MatSnackBar){
    this.dataSource = new MatTableDataSource();
  }
  
  ngOnInit(): void {
    this.obtenerConsultas();
  }

  ngAfterViewInit():void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator._intl.itemsPerPageLabel = "item por pagina"
  }

  obtenerConsultas() {
    this.loading = true;
    setTimeout(() => {
      
    }, 2000);
    this._consultasService.getConsultas().subscribe(data => {
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

  addEditConsulta(idConsultas?:number){
    const dialogRef = this.dialog.open(AgregarEditarConsultasComponent, {
     width: '550px',
     disableClose: true,
     data: {idConsultas : idConsultas}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Cancelado xd');
      if(result){
        this.obtenerConsultas();
      }
      
    });
    
  }

  deleteConsulta(idConsultas: number){
    this.loading = true;
    this._consultasService.deleteConsulta(idConsultas).subscribe(() => {
      this.obtenerConsultas();
      this.mensajeExito();
    })
  }

  mensajeExito(){
    this._snackBar.open('La consulta fue eliminada con exito', ',', {
      duration: 2000
    });
  }

}
