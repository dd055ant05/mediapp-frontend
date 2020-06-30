import { Component, OnInit, ViewChild } from '@angular/core';
import { SignoVital } from 'src/app/_model/signoVital';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignoVitalService } from '../../_service/signo-vital.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signo-vital',
  templateUrl: './signo-vital.component.html',
  styleUrls: ['./signo-vital.component.css']
})
export class SignoVitalComponent implements OnInit {

  displayedColumns: string[] = ['idSignoVital', 'temperatura', 'ritmo', 'pulso', 'paciente', 'acciones'];
  dataSource: MatTableDataSource<SignoVital>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cantidad: number;

  constructor(private signoVitalService: SignoVitalService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.signoVitalService.signoVitalCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.signoVitalService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 })
    })

    this.signoVitalService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idSignoVital: number) {
    this.signoVitalService.eliminar(idSignoVital).pipe(switchMap(() => {
      return this.signoVitalService.listar();
    })).subscribe(data => {
      this.signoVitalService.signoVitalCambio.next(data);
      this.signoVitalService.mensajeCambio.next('Se elimino');
    });

  }

  mostrarMas(e: any) {
    this.signoVitalService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

}
