import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Examen } from '../_model/examen';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends GenericService<Examen>{

  examenCambio = new Subject<Examen[]>();
  mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(http,`${environment.HOST}/examenes`);
   }
}
