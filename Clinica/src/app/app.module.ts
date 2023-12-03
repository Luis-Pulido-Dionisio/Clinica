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


@NgModule({
  declarations: [
    AppComponent,
    ListPacientesComponent,
    AgregarEditarPacientesComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
