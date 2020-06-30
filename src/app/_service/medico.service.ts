import { Injectable } from '@angular/core';
import { Medico } from '../_model/medico';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico>{

  medicoCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();

  //url: string = `${environment.HOST}/medicos`;

  constructor(http: HttpClient) {
    super(http, `${environment.HOST}/medicos`);
  }

}
