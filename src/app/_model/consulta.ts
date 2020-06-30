import { Paciente } from 'src/app/_model/paciente';
import { Medico } from './medico';
import { Especialidad } from './especialidad';
import { DetalleConsulta } from './detalleConsulta';

export class Consulta {
    idConsulta: number;
    paciente: Paciente;
    medico: Medico;
    especialidad: Especialidad;
    fecha: string;
    numConsultorio: string;
    detalleConsulta: DetalleConsulta[];
}