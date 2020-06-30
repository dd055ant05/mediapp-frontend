import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaEspecialComponent } from './pages/consulta/consulta-especial/consulta-especial.component';
import { WizardComponent } from './pages/consulta/wizard/wizard.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { LoginComponent } from './pages/login/login.component';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { SignoVitalComponent } from './pages/signo-vital/signo-vital.component';
import { SignoVitalEdicionComponent } from './pages/signo-vital/signo-vital-edicion/signo-vital-edicion.component';
import { PerfilComponent } from './pages/perfil/perfil.component';


const routes: Routes = [
  {
    path: 'paciente', component: PacienteComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ]
  },
  { path: 'medico', component: MedicoComponent },
  {
    path: 'examen', component: ExamenComponent, children: [
      { path: 'nuevo', component: ExamenEdicionComponent },
      { path: 'edicion/:id', component: ExamenEdicionComponent }
    ]
  },
  {
    path: 'especialidad', component: EspecialidadComponent, children: [
      { path: 'nuevo', component: EspecialidadEdicionComponent },
      { path: 'edicion/:id', component: EspecialidadEdicionComponent }
    ]
  },
  { path: 'consulta', component: ConsultaComponent },
  { path: 'consulta-especial', component: ConsultaEspecialComponent },
  { path: 'consulta-wizard', component: WizardComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'not-403', component: Not403Component },
  { path: 'not-404', component: Not404Component },
  {
    path: 'signoVital', component: SignoVitalComponent, children: [
      { path: 'nuevo', component: SignoVitalEdicionComponent },
      { path: 'edicion/:id', component: SignoVitalEdicionComponent }
    ]
  },
  { path: 'perfil', component: PerfilComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
