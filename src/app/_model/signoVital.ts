import { Paciente } from './paciente';

export class SignoVital {
    idSignoVital: number;
    temperatura: string;
    ritmo: string;
    pulso: string;
    paciente: Paciente;
}