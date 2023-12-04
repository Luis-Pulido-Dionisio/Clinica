import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctoresService } from '../../services/doctores.service';
import { Doctor } from '../../interfaces/Doctor';

@Component({
  selector: 'app-agregar-editar-doctores',
  templateUrl: './agregar-editar-doctores.component.html',
  styleUrls: ['./agregar-editar-doctores.component.css']
})
export class AgregarEditarDoctoresComponent implements OnInit{
  Turno: string[] = ['Matutino', 'Vespertino'];
  form:FormGroup;

  maxDate:Date;
  loading: boolean = false;
  operacion: string = 'Agregar ';

  idDoctores: number | undefined;

  constructor(public dialogRef: MatDialogRef<AgregarEditarDoctoresComponent>,
    private fb:FormBuilder, private _doctoresService:DoctoresService,  private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any){
      this.maxDate = new Date();
      this.form = this.fb.group({
        Nombre_Doc: ['',[Validators.required, Validators.maxLength(20)]],
        Apellidos_Doc: ['',Validators.required],
        Especialidad: ['',Validators.required],
        Turno: ['',Validators.required],
        No_Consultorio: ['', Validators.required],
        Telefono: [null,Validators.required]
      })
      console.log('Estoy en el modal', data)
      this.idDoctores = data.idDoctores
    }

    ngOnInit(): void {
      this.esEditar(this.idDoctores)
    }

    esEditar(idDoctores:number | undefined){
      if(idDoctores !== undefined){
        this.operacion = 'Editar ';
        this.getDoctor(idDoctores);
      }
    }

    getDoctor(idDoctores:number){
      this._doctoresService.getDoctor(idDoctores).subscribe(data => {
        this.form.setValue({
          Nombre_Doc: data.Nombre_Doc,
          Apellidos_Doc: data.Apellidos_Doc,
          Especialidad: data.Especialidad,
          Turno: data.Telefono,
          No_Consultorio: data.No_Consultorio,
          Telefono: data.Telefono
        })
        
      })
    }

  cancelar(){
    this.dialogRef.close(false);
  }
  addEditDoctor(){

    if(this.form.invalid){
      return;
    }

    const Doctor: Doctor = {
      Nombre_Doc: this.form.value.Nombre_Doc,
      Apellidos_Doc: this.form.value.Apellidos_Doc,
      Especialidad: this.form.value.Especialidad,
      Turno: this.form.value.Turno,
      No_Consultorio: this.form.value.No_Consultorio,
      Telefono: this.form.value.Telefono,
    }


    this.loading = true;

    if(this.idDoctores == undefined) {
      this._doctoresService.addDoctor(Doctor).subscribe(() => {
        this.mensajeExito('agregado');
       // console.log('Doctor agregado con exito')
       })
    }else{
      //Editar
      this._doctoresService.updateDoctor(this.idDoctores, Doctor).subscribe(data => { 
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
