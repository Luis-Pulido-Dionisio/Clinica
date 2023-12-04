import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Analisis } from 'src/app/interfaces/Analisis';
import { AnalisisService } from '../../services/analisis.service';
import { AgregarEditarAnalisisComponent } from '../agregar-editar-analisis/agregar-editar-analisis.component';

@Component({
  selector: 'app-list-analisis',
  templateUrl: './list-analisis.component.html',
  styleUrls: ['./list-analisis.component.css']
})
export class ListAnalisisComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['Nombre_Pac', 'Nombre_Lab', 'Tipo_Analisis', 'Descripcion', 'Fecha', 'Acciones'];
  dataSource: MatTableDataSource<Analisis>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _analisisService: AnalisisService, private _snackBar: MatSnackBar){
    this.dataSource = new MatTableDataSource();
  }
  
  ngOnInit(): void {
    this.obtenerAnalisis();
  }

  ngAfterViewInit():void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator._intl.itemsPerPageLabel = "item por pagina"
  }

  obtenerAnalisis() {
    this.loading = true;
    setTimeout(() => {
      
    }, 2000);
    this._analisisService.getAnalisis_Lab().subscribe(data => {
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

  addEditAnalisis(idAnalisis?:number){
    const dialogRef = this.dialog.open(AgregarEditarAnalisisComponent, {
     width: '550px',
     disableClose: true,
     data: {idAnalisis : idAnalisis}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Cancelado xd');
      if(result){
        this.obtenerAnalisis();
      }
      
    });
    
  }

  deleteAnalisis(idAnalisis: number){
    this.loading = true;
    this._analisisService.deleteAnalisis(idAnalisis).subscribe(() => {
      this.obtenerAnalisis();
      this.mensajeExito();
    })
  }

  mensajeExito(){
    this._snackBar.open('El analisis fue eliminada con exito', ',', {
      duration: 2000
    });
  }
}
