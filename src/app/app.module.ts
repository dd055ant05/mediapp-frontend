import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MedicoComponent } from './pages/medico/medico.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MedicoDialogoComponent } from './pages/medico/medico-dialogo/medico-dialogo.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaEspecialComponent } from './pages/consulta/consulta-especial/consulta-especial.component';
import { WizardComponent } from './pages/consulta/wizard/wizard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { BuscarDialogoComponent } from './pages/buscar/buscar-dialogo/buscar-dialogo.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginComponent } from './pages/login/login.component';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SignoVitalComponent } from './pages/signo-vital/signo-vital.component';
import { SignoVitalEdicionComponent } from './pages/signo-vital/signo-vital-edicion/signo-vital-edicion.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    MedicoComponent,
    ExamenComponent,
    EspecialidadComponent,
    PacienteEdicionComponent,
    MedicoDialogoComponent,
    EspecialidadEdicionComponent,
    ExamenEdicionComponent,
    ConsultaComponent,
    ConsultaEspecialComponent,
    WizardComponent,
    BuscarComponent,
    BuscarDialogoComponent,
    ReporteComponent,
    LoginComponent,
    Not403Component,
    Not404Component,
    SignoVitalComponent,
    SignoVitalEdicionComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    PdfViewerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/login/enviarCorreo']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
