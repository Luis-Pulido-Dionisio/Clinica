import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paciente } from 'src/app/interfaces/Paciente';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-agregar-editar-pacientes',
  templateUrl: './agregar-editar-pacientes.component.html',
  styleUrls: ['./agregar-editar-pacientes.component.css']
})
export class AgregarEditarPacientesComponent implements OnInit{

  Genero: string[] = ['Masculino', 'Femenino'];
  form:FormGroup;

  maxDate:Date;
  loading: boolean = false;
  operacion: string = 'Agregar ';

  idPacientes: number | undefined;

  constructor(public dialogRef: MatDialogRef<AgregarEditarPacientesComponent>,
    private fb:FormBuilder, private _pacienteService:PacientesService,  private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any){
      this.maxDate = new Date();
      this.form = this.fb.group({
        Nombre_Pac: ['',[Validators.required, Validators.maxLength(20)]],
        Apellidos_Pac: ['',Validators.required],
        Direccion: ['',Validators.required],
        Genero: ['',Validators.required],
        Fecha_Nac: [null,Validators.required],
        Telefono: [null,Validators.required]
      })
      console.log('Estoy en el modal', data)
      this.idPacientes = data.idPacientes
    }

    ngOnInit(): void {
      this.esEditar(this.idPacientes)
    }

    esEditar(idPacientes:number | undefined){
      if(idPacientes !== undefined){
        this.operacion = 'Editar ';
        this.getPaciente(idPacientes);
      }
    }

    getPaciente(idPacientes:number){
      this._pacienteService.getPaciente(idPacientes).subscribe(data => {
        this.form.setValue({
          Nombre_Pac: data.Nombre_Pac,
          Apellidos_Pac: data.Apellidos_Pac,
          Direccion: data.Direccion,
          Genero: data.Genero,
          Fecha_Nac: new Date(data.Fecha_Nac),
          Telefono: data.Telefono
        })
        
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


    this.loading = true;

    if(this.idPacientes == undefined) {
      this._pacienteService.addPaciente(Paciente).subscribe(() => {
        this.mensajeExito('agregada');
       // console.log('Persona agregada con exito')
       })
    }else{
      //Editar
      this._pacienteService.updatePaciente(this.idPacientes, Paciente).subscribe(data => { 
        this.mensajeExito('actualizada');
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
