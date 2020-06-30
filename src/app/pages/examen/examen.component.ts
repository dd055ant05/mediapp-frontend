import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Examen } from '../../_model/examen';
import { ExamenService } from '../../_service/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  displayedColumns: string[] = ['idExamen', 'nombre', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private examenService: ExamenService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.examenService.examenCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.examenService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 })
    })

    this.examenService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idPaciente: number) {
    this.examenService.eliminar(idPaciente).pipe(switchMap(() => {
      return this.examenService.listar();
    })).subscribe(data => {
      this.examenService.examenCambio.next(data);
      this.examenService.mensajeCambio.next('Se elimino');
    });
  }

}
