import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { FiltroConsultaDTO } from 'src/app/_dto/filtroConsultaDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Consulta } from 'src/app/_model/consulta';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BuscarDialogoComponent } from './buscar-dialogo/buscar-dialogo.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  displayedColumns = ['paciente', 'medico', 'especialidad', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<Consulta>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private consultaService: ConsultaService, private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'dni': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta': new FormControl()
    });
  }

  buscar() {
    let filtro = new FiltroConsultaDTO(this.form.value['dni'],
      this.form.value['nombreCompleto'], this.form.value['fechaConsulta']);

    if (filtro.fechaConsulta) {
      delete filtro.dni;
      delete filtro.nombreCompleto;
    } else {
      delete filtro.fechaConsulta;
      if (filtro.dni.length === 0) {
        delete filtro.dni;
      }
      if (filtro.nombreCompleto.length === 0) {
        delete filtro.nombreCompleto;
      }
    }
    console.log(filtro);
    this.consultaService.buscar(filtro).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  verDetalle(consulta: Consulta) {
this.dialog.open(BuscarDialogoComponent, {
  data: consulta
})
  }
}
