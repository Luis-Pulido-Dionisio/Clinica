import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LaboratoriosService } from '../../services/laboratorios.service';
import { Laboratorio } from '../../interfaces/Laboratorio';

@Component({
  selector: 'app-agregar-editar-laboratorios',
  templateUrl: './agregar-editar-laboratorios.component.html',
  styleUrls: ['./agregar-editar-laboratorios.component.css']
})
export class AgregarEditarLaboratoriosComponent implements OnInit{
 
  form:FormGroup;

  maxDate:Date;
  loading: boolean = false;
  operacion: string = 'Agregar ';

  idLaboratorios: number | undefined;

  constructor(public dialogRef: MatDialogRef<AgregarEditarLaboratoriosComponent>,
    private fb:FormBuilder, private _laboratoriosService:LaboratoriosService,  private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any){
      this.maxDate = new Date();
      this.form = this.fb.group({
        Nombre_Lab: ['',[Validators.required, Validators.maxLength(20)]],
        Horario: ['',Validators.required],
        Direccion: ['',Validators.required],
        Correo: ['',Validators.required],
        Telefono: [null,Validators.required]
      })
      console.log('Estoy en el modal', data)
      this.idLaboratorios = data.idLaboratorios
    }

    ngOnInit(): void {
      this.esEditar(this.idLaboratorios)
    }

    esEditar(idLaboratorios:number | undefined){
      if(idLaboratorios !== undefined){
        this.operacion = 'Editar ';
        this.getLaboratorio(idLaboratorios);
      }
    }

    getLaboratorio(idLaboratorios:number){
      this._laboratoriosService.getLaboratorio(idLaboratorios).subscribe(data => {
        this.form.setValue({
          Nombre_Lab: data.Nombre_Lab,
          Horario: data.Horario,
          Direccion: data.Direccion,
          Correo: data.Correo,
          Telefono: data.Telefono
        })
        
      })
    }

  cancelar(){
    this.dialogRef.close(false);
  }
  addEditLaboratorio(){

    if(this.form.invalid){
      return;
    }

    const Laboratorio: Laboratorio = {
      Nombre_Lab: this.form.value.Nombre_Lab,
      Horario: this.form.value.Horario,
      Direccion: this.form.value.Direccion,
      Correo: this.form.value.Correo,
      Telefono: this.form.value.Telefono
    }


    this.loading = true;

    if(this.idLaboratorios == undefined) {
      this._laboratoriosService.addLaboratorio(Laboratorio).subscribe(() => {
        this.mensajeExito('agregada');
       // console.log('Laboratorio agregada con exito')
       })
    }else{
      //Editar
      this._laboratoriosService.updateLaboratorio(this.idLaboratorios, Laboratorio).subscribe(data => { 
        this.mensajeExito('actualizado');
        //this.obtenerPacientes();
        
      })
    }
    this.loading = false;
    this.dialogRef.close(true);

   
  }
  mensajeExito(operacion: string){
    this._snackBar.open(`La persona fue ${operacion} con exito`, ',', {
      duration: 2000
    });
  }

}
