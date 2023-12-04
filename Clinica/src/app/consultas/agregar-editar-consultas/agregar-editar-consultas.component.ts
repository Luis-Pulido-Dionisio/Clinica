import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultasService } from '../../services/consultas.service';
import { Consulta } from 'src/app/interfaces/Consultas';

@Component({
  selector: 'app-agregar-editar-consultas',
  templateUrl: './agregar-editar-consultas.component.html',
  styleUrls: ['./agregar-editar-consultas.component.css']
})
export class AgregarEditarConsultasComponent implements OnInit{
  
  form:FormGroup;

  maxDate:Date;
  loading: boolean = false;
  operacion: string = 'Agregar ';

  idConsultas: number | undefined;

  constructor(public dialogRef: MatDialogRef<AgregarEditarConsultasComponent>,
    private fb:FormBuilder, private _consultasService:ConsultasService,  private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any){
      this.maxDate = new Date();
      this.form = this.fb.group({
        Nombre_Pac: ['',[Validators.required, Validators.maxLength(20)]],
        Nombre_Doc: ['',Validators.required],
        No_Consultorio: ['',Validators.required],
        Hora: ['',Validators.required],
        Motivo: [null,Validators.required],
        Fecha_Nac: [null,Validators.required]
        
      })
      console.log('Estoy en el modal', data)
      this.idConsultas = data.idConsultas;
    }

    ngOnInit(): void {
      this.esEditar(this.idConsultas)
    }

    esEditar(idConsultas:number | undefined){
      if(idConsultas !== undefined){
        this.operacion = 'Editar ';
        this.getConsulta(idConsultas);
      }
    }

    getConsulta(idConsulta:number){
      this._consultasService.getConsulta(idConsulta).subscribe(data => {
        this.form.setValue({
          Nombre_Pac: data.Nombre_Pac,
          Nombre_Doc: data.Nombre_Doc,
          No_Consultorio: data.No_Consultorio,
          Hora: data.Hora,
          Motivo: data.Motivo,
          Fecha_Con: new Date(data.Fecha_Con)
        })
        
      })
    }

  cancelar(){
    this.dialogRef.close(false);
  }
  addEditConsulta(){

    if(this.form.invalid){
      return;
    }

    const Consulta: Consulta = {
      Nombre_Pac: this.form.value.Nombre_Pac,
      Nombre_Doc: this.form.value.Nombre_Doc,
      No_Consultorio: this.form.value.No_Consultorio,
      Hora: this.form.value.Hora,
      Motivo: this.form.value.Motivo,
      Fecha_Con: this.form.value.Fecha_Con.toISOString().slice(0,10)
    }


    this.loading = true;

    if(this.idConsultas == undefined) {
      this._consultasService.addConsulta(Consulta).subscribe(() => {
        this.mensajeExito('agregada');
       // console.log('Persona agregada con exito')
       })
    }else{
      //Editar
      this._consultasService.updateConsulta(this.idConsultas, Consulta).subscribe(data => { 
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
