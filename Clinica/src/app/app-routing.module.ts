import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPacientesComponent } from './components/list-pacientes/list-pacientes.component';
import { ListDoctoresComponent } from './doctor/list-doctores/list-doctores.component';
import { ListLaboratoriosComponent } from './laboratorio/list-laboratorios/list-laboratorios.component';
import { ListConsultasComponent } from './consultas/list-consultas/list-consultas.component';
import { ListAnalisisComponent } from './analisis/list-analisis/list-analisis.component';

const routes: Routes = [
  {path:'pacientes', component:ListPacientesComponent},
  {path:'doctores', component:ListDoctoresComponent},
  {path:'laboratorios', component: ListLaboratoriosComponent},
  {path: 'consultas', component: ListConsultasComponent},
  {path: 'analisis', component: ListAnalisisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
