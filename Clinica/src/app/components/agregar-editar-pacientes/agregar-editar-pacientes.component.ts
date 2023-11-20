import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Paciente } from 'src/app/interfaces/Paciente';

@Component({
  selector: 'app-agregar-editar-pacientes',
  templateUrl: './agregar-editar-pacientes.component.html',
  styleUrls: ['./agregar-editar-pacientes.component.css']
})
export class AgregarEditarPacientesComponent {

  Genero: string[] = ['Masculino', 'Femenino'];
  form:FormGroup;

  maxDate:Date

  constructor(public dialogRef: MatDialogRef<AgregarEditarPacientesComponent>,
    private fb:FormBuilder){
      this.maxDate = new Date();
      this.form = this.fb.group({
        Nombre_Pac: ['',[Validators.required, Validators.maxLength(20)]],
        Apellido_Pac: ['',Validators.required],
        Direccion: ['',Validators.required],
        Genero: ['',Validators.required],
        Fecha_Nac: [null,Validators.required],
        Telefono: [[null,Validators.required,Validators.pattern("^[0-9]*$")]]
      })
    }

  cancelar(){
    this.dialogRef.close();
  }
  addEditPaciente(){

    if(this.form.invalid){
      return;
    }

    const Paciente: Paciente = {
      Nombre_Pac: this.form.value.Nombre_Pac,
      Apellido_Pac: this.form.value.Apelldo_Pac,
      Direccion: this.form.value.Direccion,
      Genero: this.form.value.Genero,
      Telefono: this.form.value.Telefono,
      Fecha_Nac: this.form.value.Fecha_Nac
    }
    console.log(Paciente);
  }
}
