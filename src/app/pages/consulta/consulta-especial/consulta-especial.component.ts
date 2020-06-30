import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaListaExamenDTO } from 'src/app/_dto/consultaListaExamenDTO';

@Component({
  selector: 'app-consulta-especial',
  templateUrl: './consulta-especial.component.html',
  styleUrls: ['./consulta-especial.component.css']
})
export class ConsultaEspecialComponent implements OnInit {

  form: FormGroup;

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

  myControlPaciente: FormControl = new FormControl();
  myControlMedico: FormControl = new FormControl();

  pacienteFiltrados: Observable<any[]>;
  medicoFiltrados: Observable<any[]>;

  mensaje: string;


  constructor(private pacienteService: PacienteService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private examenService: ExamenService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'paciente': this.myControlPaciente,
      'especialidad': new FormControl(),
      'medico': this.myControlMedico,
      'fecha': new FormControl(new Date()),
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl('')
    });

    this.listarPacientes();
    this.listarEspecialidad();
    this.listarMedicos();
    this.listarExamenes();

    this.pacienteFiltrados = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));
    this.medicoFiltrados = this.myControlMedico.valueChanges.pipe(map(val => this.filtrarMedicos(val)));
  }

  filtrarPacientes(val: any) {
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(x =>
        x.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || x.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()));
    }
    else {
      return this.pacientes.filter(x =>
        x.nombres.toLowerCase().includes(val.toLowerCase()) || x.apellidos.toLowerCase().includes(val.toLowerCase()));
    }
  }

  filtrarMedicos(val: any) {
    if (val != null && val.idMedico > 0) {
      return this.medicos.filter(x =>
        x.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || x.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()));
    }
    else {
      return this.medicos.filter(x =>
        x.nombres.toLowerCase().includes(val.toLowerCase()) || x.apellidos.toLowerCase().includes(val.toLowerCase()));
    }
  }

  mostrarPaciente(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  mostrarMedico(val: Medico) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
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

  seleccionarMedico(e: any) {
    this.medicoSeleccionado = e.option.value;
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

  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.especialidadSeleccionado === null || this.medicoSeleccionado === null || this.pacienteSeleccionado === null);
  }

  aceptar() {
    let consulta = new Consulta();
    consulta.especialidad = this.form.value['especialidad']; //this.especialidadSeleccionado
    consulta.medico = this.form.value['medico'];
    consulta.paciente = this.form.value['paciente'];
    consulta.numConsultorio = "C1E";
    consulta.fecha = moment().format('YYYY-MM-DDTHH:mm:ss');
    consulta.detalleConsulta = this.detalleConsulta;

    let consultaListaExamenDTO = new ConsultaListaExamenDTO();
    consultaListaExamenDTO.consulta = consulta;
    consultaListaExamenDTO.lstExamen = this.examenesSeleccionados;

    this.consultaService.registrarTransaccion(consultaListaExamenDTO).subscribe(() => {
      this.snackBar.open("Se registró", "Aviso", { duration: 2000 });

      setTimeout(() => {
        this.limpiarControles();
      }, 2000)
    });
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
  }


}
