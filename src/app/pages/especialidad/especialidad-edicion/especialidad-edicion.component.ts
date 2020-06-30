import { Component, OnInit } from '@angular/core';
import { Especialidad } from '../../../_model/especialidad';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { EspecialidadService } from '../../../_service/especialidad.service';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(private route: ActivatedRoute, private especialidadService: EspecialidadService, private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      "id": new FormControl(0),
      "nombre": new FormControl(''),
    })

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    })
  }

  initForm() {
    if (this.edicion) {
      this.especialidadService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          "id": new FormControl(data.idEspecialidad),
          "nombre": new FormControl(data.nombre),
        });
      });
    }
  }

  operar() {
    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.form.value['id'];
    especialidad.nombre = this.form.value['nombre'];

    if (this.edicion) {
      //FORMA COMUN
      this.especialidadService.modificar(especialidad).subscribe(() => {
        this.especialidadService.listar().subscribe(data => {
          this.especialidadService.especialidadCambio.next(data);
          this.especialidadService.mensajeCambio.next('Se Modifico');
        });
      });
    } else {
      //BUENA PRACTICA
      this.especialidadService.registrar(especialidad).pipe(switchMap(() => {
        return this.especialidadService.listar();
      })).subscribe(data => {
        this.especialidadService.especialidadCambio.next(data);
        this.especialidadService.mensajeCambio.next('Se Registro');
      });
    }
    this.router.navigate(['especialidad']);

  }

}
