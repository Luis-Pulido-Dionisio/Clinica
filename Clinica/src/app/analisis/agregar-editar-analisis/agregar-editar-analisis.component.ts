import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Analisis } from 'src/app/interfaces/Analisis';
import { AnalisisService } from '../../services/analisis.service';

@Component({
  selector: 'app-agregar-editar-analisis',
  templateUrl: './agregar-editar-analisis.component.html',
  styleUrls: ['./agregar-editar-analisis.component.css']
})
export class AgregarEditarAnalisisComponent implements OnInit{

  Tipo: string[] = ['Masculino', 'Femenino'];
  form:FormGroup;

  maxDate:Date;
  loading: boolean = false;
  operacion: string = 'Agregar ';

  idAnalisis: number | undefined;

  constructor(public dialogRef: MatDialogRef<AgregarEditarAnalisisComponent>,
    private fb:FormBuilder, private _analisisService:AnalisisService,  private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any){
      this.maxDate = new Date();
      this.form = this.fb.group({
        Nombre_Pac: ['',[Validators.required, Validators.maxLength(20)]],
        Nombre_Lab: ['',Validators.required],
        Descripcion: ['',Validators.required],
        Tipo: ['',Validators.required],
        Fecha: [null,Validators.required],
      })
      console.log('Estoy en el modal', data)
      this.idAnalisis = data.idAnalisis
    }

    ngOnInit(): void {
      this.esEditar(this.idAnalisis)
    }

    esEditar(idAnalisis:number | undefined){
      if(idAnalisis !== undefined){
        this.operacion = 'Editar ';
        this.getAnalisis(idAnalisis);
      }
    }

    getAnalisis(idAnalisis:number){
      this._analisisService.getAnalisis(idAnalisis).subscribe(data => {
        this.form.setValue({
          Nombre_Pac: data.Nombre_Pac,
          Nombre_Lab: data.Nombre_Lab,
          Descripcion: data.Descripcion,
          Tipo_Analisis: data.Tipo_Analisis,
          Fecha: new Date(data.Fecha)
        })
        
      })
    }

  cancelar(){
    this.dialogRef.close(false);
  }
  addEditAnalisis(){

    if(this.form.invalid){
      return;
    }

    const Analisis: Analisis = {
      Nombre_Pac: this.form.value.Nombre_Pac,
      Nombre_Lab: this.form.value.Nombre_Lab,
      Descripcion: this.form.value.Descripcion,
      Tipo_Analisis: this.form.value.Tipo_Analisis,
      Fecha: this.form.value.Fecha.toISOString().slice(0,10)
    }


    this.loading = true;

    if(this.idAnalisis == undefined) {
      this._analisisService.addAnalisis(Analisis).subscribe(() => {
        this.mensajeExito('agregado');
       // console.log('Persona agregada con exito')
       })
    }else{
      //Editar
      this._analisisService.updateAnalisis(this.idAnalisis, Analisis).subscribe(data => { 
        this.mensajeExito('actualizado');
        //this.obtenerPacientes();
        
      })
    }
    this.loading = false;
    this.dialogRef.close(true);

   
  }
  mensajeExito(operacion: string){
    this._snackBar.open(`El analisis fue ${operacion} con exito`, ',', {
      duration: 2000
    });
  }


}
