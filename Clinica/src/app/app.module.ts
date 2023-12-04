import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPacientesComponent } from './components/list-pacientes/list-pacientes.component';
import { AgregarEditarPacientesComponent } from './components/agregar-editar-pacientes/agregar-editar-pacientes.component';

/*Modulos*/
import { SharedModule } from './shared/shared.module';
import { NavComponent } from './components/nav/nav.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ListDoctoresComponent } from './doctor/list-doctores/list-doctores.component';
import { AgregarEditarDoctoresComponent } from './doctor/agregar-editar-doctores/agregar-editar-doctores.component';
import { ListConsultasComponent } from './consultas/list-consultas/list-consultas.component';
import { AgregarEditarConsultasComponent } from './consultas/agregar-editar-consultas/agregar-editar-consultas.component';
import { ListAnalisisComponent } from './analisis/list-analisis/list-analisis.component';
import { AgregarEditarAnalisisComponent } from './analisis/agregar-editar-analisis/agregar-editar-analisis.component';
import { ListLaboratoriosComponent } from './laboratorio/list-laboratorios/list-laboratorios.component';
import { AgregarEditarLaboratoriosComponent } from './laboratorio/agregar-editar-laboratorios/agregar-editar-laboratorios.component';


@NgModule({
  declarations: [
    AppComponent,
    ListPacientesComponent,
    AgregarEditarPacientesComponent,
    NavComponent,
    ListDoctoresComponent,
    AgregarEditarDoctoresComponent,
    ListConsultasComponent,
    AgregarEditarConsultasComponent,
    ListAnalisisComponent,
    AgregarEditarAnalisisComponent,
    ListLaboratoriosComponent,
    AgregarEditarLaboratoriosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
