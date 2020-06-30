import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Paciente } from '../_model/paciente';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends GenericService<Paciente>{

  pacienteCambio = new Subject<Paciente[]>();
  mensajeCambio = new Subject<string>();

  //url: string = `${environment.HOST}/pacientes`;

  constructor(http: HttpClient) {
    super(http, `${environment.HOST}/pacientes`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

}
