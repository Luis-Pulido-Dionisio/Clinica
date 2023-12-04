import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Laboratorio } from 'src/app/interfaces/Laboratorio';
import { LaboratoriosService } from '../../services/laboratorios.service';
import { AgregarEditarLaboratoriosComponent } from '../agregar-editar-laboratorios/agregar-editar-laboratorios.component';

@Component({
  selector: 'app-list-laboratorios',
  templateUrl: './list-laboratorios.component.html',
  styleUrls: ['./list-laboratorios.component.css']
})
export class ListLaboratoriosComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['Nombre_Lab', 'Horario', 'Direccion', 'Correo', 'Telefono', 'Acciones'];
  dataSource: MatTableDataSource<Laboratorio>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _laboratoriosService: LaboratoriosService, private _snackBar: MatSnackBar){
    this.dataSource = new MatTableDataSource();
  }
  
  ngOnInit(): void {
    this.obtenerLaboratorios();
  }

  ngAfterViewInit():void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator._intl.itemsPerPageLabel = "item por pagina"
  }

  obtenerLaboratorios() {
    this.loading = true;
    setTimeout(() => {
      
    }, 2000);
    this._laboratoriosService.getLaboratorios().subscribe(data => {
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

  addEditLaboratorio(idLaboratorios?:number){
    const dialogRef = this.dialog.open(AgregarEditarLaboratoriosComponent, {
     width: '550px',
     disableClose: true,
     data: {idLaboratorios : idLaboratorios}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Cancelado xd');
      if(result){
        this.obtenerLaboratorios();
      }
      
    });
    
  }

  deleteLaboratorio(idLaboratorios: number){
    this.loading = true;
    this._laboratoriosService.deleteLaboratorio(idLaboratorios).subscribe(() => {
      this.obtenerLaboratorios();
      this.mensajeExito();
    })
  }

  mensajeExito(){
    this._snackBar.open('El laboratorio fue eliminada con exito', ',', {
      duration: 2000
    });
  }
}
