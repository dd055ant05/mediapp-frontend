import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Paciente } from 'src/app/_model/paciente';
import { Especialidad } from 'src/app/_model/especialidad';
import { Medico } from 'src/app/_model/medico';
import { Examen } from 'src/app/_model/examen';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { PacienteService } from 'src/app/_service/paciente.service';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { MedicoService } from 'src/app/_service/medico.service';
import { ExamenService } from 'src/app/_service/examen.service';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaListaExamenDTO } from 'src/app/_dto/consultaListaExamenDTO';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  isLinear = false;
  mensaje: string;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  pacientes: Paciente[];
  especialidades: Especialidad[];
  medicos: Medico[];
  examenes: Examen[];

  pacienteSeleccionado: Paciente;
  especialidadSeleccionado: Especialidad;
  medicoSeleccionado: Medico;
  examenSeleccionado: Examen;

  maxFecha: Date = new Date();
  fechaSeleccionada: Date = new Date();

  diagnostico: string;
  tratamiento: string;

  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];

  consultorios: number[] = [];
  consultorioSeleccionado: number = 0;

  constructor(private pacienteService: PacienteService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private examenService: ExamenService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      'pacienteSeleccionado': new FormControl(),
      'fecha': new FormControl(new Date()),
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl(''),
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.listarPacientes();
    this.listarEspecialidad();
    this.listarMedicos();
    this.listarExamenes();
    this.listarConsultorios();
  }

  listarConsultorios() {
    for (let i = 1; i <= 20; i++) {
      this.consultorios.push(i);
    }
  }

  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    })
  }
  listarEspecialidad() {
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    })
  }
  listarMedicos() {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    })
  }
  listarExamenes() {
    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    })
  }

  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }

  seleccionarMedico(medico: Medico) {
    this.medicoSeleccionado = medico;
  }

  seleccionarEspecialidad(e: any) {
    this.especialidadSeleccionado = e.option.value;
  }

  cambieFecha(e: any) {
    console.log(e);
  }

  agregar() {
    if (this.diagnostico != null && this.tratamiento != null) {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);

      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.mensaje = `Debe agregar un diagnóstico y tramiento`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  removerDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1);
  }

  agregarExamen() {
    if (this.examenSeleccionado) {
      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        let examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.examenSeleccionado.idExamen) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = 'El examen ya se encuentra en la lista';
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        this.examenesSeleccionados.push(this.examenSeleccionado);
      }
    } else {
      this.mensaje = 'Debe agregar un examen';
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  removerExamen(index: number) {
    this.examenesSeleccionados.splice(index, 1);
  }

  seleccionarConsultorio(c: number) {
    this.consultorioSeleccionado = c;
  }

  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.especialidadSeleccionado === null || this.medicoSeleccionado === null || this.pacienteSeleccionado === null);
  }

  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.pacienteSeleccionado = null;
    this.especialidadSeleccionado = null;
    this.medicoSeleccionado = null;
    this.examenSeleccionado = null;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
    this.stepper.reset();
  }

  registrar() {
    let consulta = new Consulta();
    consulta.especialidad = this.especialidadSeleccionado;
    consulta.medico = this.medicoSeleccionado;
    consulta.paciente = this.pacienteSeleccionado;
    consulta.fecha = moment().format('YYYY-MM-DDTHH:mm:ss');
    consulta.detalleConsulta = this.detalleConsulta;
    consulta.numConsultorio = `C${this.consultorioSeleccionado}`;

    let consultaListaExamenDTO = new ConsultaListaExamenDTO();
    consultaListaExamenDTO.consulta = consulta;
    consultaListaExamenDTO.lstExamen = this.examenesSeleccionados;

    this.consultaService.registrarTransaccion(consultaListaExamenDTO).subscribe(() => {
      this.snackBar.open("Se registró", "Aviso", { duration: 2000 });

      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    });
  }

}
