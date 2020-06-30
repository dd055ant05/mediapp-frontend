import { Component, OnInit, ViewChild } from '@angular/core';
import { Medico } from 'src/app/_model/medico';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MedicoService } from '../../_service/medico.service';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  displayedColumns: string[] = ['idMedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  dataSource: MatTableDataSource<Medico>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private medicoService: MedicoService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.medicoService.medicoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    this.medicoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 })
    })

    this.medicoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(medico?: Medico) {
    let med = medico != null ? medico : new Medico();
    this.dialog.open(MedicoDialogoComponent, {
      width: '250px', data: med
    })
  }

  eliminar(idMedico: number) {
    this.medicoService.eliminar(idMedico).pipe(switchMap(() => {
      return this.medicoService.listar();
    })).subscribe(data => {
      this.medicoService.medicoCambio.next(data);
      this.medicoService.mensajeCambio.next('Se elimino');
    });
  }

}
