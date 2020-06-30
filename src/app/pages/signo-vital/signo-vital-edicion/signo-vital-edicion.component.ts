import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SignoVitalService } from '../../../_service/signo-vital.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SignoVital } from 'src/app/_model/signoVital';
import { switchMap } from 'rxjs/operators'
import { Paciente } from 'src/app/_model/paciente';
import { Observable } from 'rxjs';
import { PacienteService } from 'src/app/_service/paciente.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signo-vital-edicion',
  templateUrl: './signo-vital-edicion.component.html',
  styleUrls: ['./signo-vital-edicion.component.css']
})
export class SignoVitalEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  pacientes: Paciente[];
  pacienteSeleccionado: Paciente;
  myControlPaciente: FormControl = new FormControl();

  pacienteFiltrados: Observable<any[]>;

  constructor(private route: ActivatedRoute, private router: Router,
    private signoVitalService: SignoVitalService, private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "id": new FormControl(0),
      "temperatura": new FormControl(''),
      "ritmo": new FormControl(''),
      "pulso": new FormControl(''),
      "paciente": this.myControlPaciente,
    })

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    })

    this.listarPacientes();

    this.pacienteFiltrados = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));
  }

  initForm() {
    if (this.edicion) {
      this.signoVitalService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          "id": new FormControl(data.idSignoVital),
          "temperatura": new FormControl(data.temperatura),
          "ritmo": new FormControl(data.ritmo),
          "pulso": new FormControl(data.pulso),
          "paciente": new FormControl(data.paciente),
        });
      });
    }
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

  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    })
  }

  mostrarPaciente(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }

  operar() {
    let sv = new SignoVital();
    sv.idSignoVital = this.form.value['id'];
    sv.temperatura = this.form.value['temperatura'];
    sv.ritmo = this.form.value['ritmo'];
    sv.pulso = this.form.value['pulso'];
    sv.paciente = this.form.value['paciente'];
    if (this.edicion) {
      this.signoVitalService.modificar(sv).pipe(switchMap(() => {
        return this.signoVitalService.listar();
      })).subscribe(data => {
        this.signoVitalService.signoVitalCambio.next(data);
        this.signoVitalService.mensajeCambio.next('Se Modificó');
      });
    } else {
      this.signoVitalService.registrar(sv).pipe(switchMap(() => {
        return this.signoVitalService.listar();
      })).subscribe(data => {
        this.signoVitalService.signoVitalCambio.next(data);
        this.signoVitalService.mensajeCambio.next('Se Registro');
      });
    }
    this.router.navigate(['signoVital']);

  }

}
