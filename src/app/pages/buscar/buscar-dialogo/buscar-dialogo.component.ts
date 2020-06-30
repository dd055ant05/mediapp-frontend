import { Component, OnInit, Inject } from '@angular/core';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaListaExamenDTO } from '../../../_dto/consultaListaExamenDTO';

@Component({
  selector: 'app-buscar-dialogo',
  templateUrl: './buscar-dialogo.component.html',
  styleUrls: ['./buscar-dialogo.component.css']
})
export class BuscarDialogoComponent implements OnInit {

  consulta: Consulta;
  examenes: ConsultaListaExamenDTO[];

  constructor(private consultaService: ConsultaService,
    private dialogRef: MatDialogRef<BuscarDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Consulta) { }

  ngOnInit(): void {
    this.consulta = this.data;
    this.listarExamenes();
  }

  listarExamenes() {
    this.consultaService.listarExamenPorConsulta(this.consulta.idConsulta).subscribe(data => {
      this.examenes = data;
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

}
