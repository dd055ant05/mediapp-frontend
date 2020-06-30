import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Especialidad } from '../_model/especialidad';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService extends GenericService<Especialidad>{

  especialidadCambio = new Subject<Especialidad[]>();
  mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(http, `${environment.HOST}/especialidades`)
  }
}
