import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paciente } from 'src/app/interfaces/Paciente';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-agregar-editar-pacientes',
  templateUrl: './agregar-editar-pacientes.component.html',
  styleUrls: ['./agregar-editar-pacientes.component.css']
})
export class AgregarEditarPacientesComponent {

  Genero: string[] = ['Masculino', 'Femenino'];
  form:FormGroup;

  maxDate:Date;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AgregarEditarPacientesComponent>,
    private fb:FormBuilder, private _pacienteService:PacientesService,  private _snackBar: MatSnackBar){
      this.maxDate = new Date();
      this.form = this.fb.group({
        Nombre_Pac: ['',[Validators.required, Validators.maxLength(20)]],
        Apellidos_Pac: ['',Validators.required],
        Direccion: ['',Validators.required],
        Genero: ['',Validators.required],
        Fecha_Nac: [null,Validators.required],
        Telefono: [null,Validators.required]
      })
    }

  cancelar(){
    this.dialogRef.close(false);
  }
  addEditPaciente(){

    if(this.form.invalid){
      return;
    }

    const Paciente: Paciente = {
      Nombre_Pac: this.form.value.Nombre_Pac,
      Apellidos_Pac: this.form.value.Apellidos_Pac,
      Direccion: this.form.value.Direccion,
      Genero: this.form.value.Genero,
      Telefono: this.form.value.Telefono,
      Fecha_Nac: this.form.value.Fecha_Nac.toISOString().slice(0,10)
    }

    console.log(Paciente.Fecha_Nac)

    this.loading = true;

   this._pacienteService.addPaciente(Paciente).subscribe(() => {
    this.loading = false;
    this.mensajeExito();
    this.dialogRef.close(true);
   // console.log('Persona agregada con exito')
   })

  }
  mensajeExito(){
    this._snackBar.open('La persona fue agregada con exito', ',', {
      duration: 2000
    });
  }

  
}
