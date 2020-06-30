import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators'
import { ExamenService } from '../../../_service/examen.service';
import { Examen } from 'src/app/_model/examen';

@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(private examenService: ExamenService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "id": new FormControl(0),
      "nombre": new FormControl(''),
      "descripcion": new FormControl(''),
    })

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    })
  }

  initForm() {
    if (this.edicion) {
      this.examenService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          "id": new FormControl(data.idExamen),
          "nombre": new FormControl(data.nombre),
          "descripcion": new FormControl(data.descripcion),
        });
      });
    }
  }

  operar() {
    let examen = new Examen;
    examen.idExamen = this.form.value['id'];
    examen.nombre = this.form.value['nombre'];
    examen.descripcion = this.form.value['descripcion'];

    if (this.edicion) {
      //FORMA COMUN
      this.examenService.modificar(examen).subscribe(() => {
        this.examenService.listar().subscribe(data => {
          this.examenService.examenCambio.next(data);
          this.examenService.mensajeCambio.next('Se Modifico');
        });
      });
    } else {
      //BUENA PRACTICA
      this.examenService.registrar(examen).pipe(switchMap(() => {
        return this.examenService.listar();
      })).subscribe(data => {
        this.examenService.examenCambio.next(data);
        this.examenService.mensajeCambio.next('Se Registro');
      });
    }
    this.router.navigate(['examen']);

  }

}
