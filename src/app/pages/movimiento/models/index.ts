import { Cuenta } from '../../cuenta/models/index';
export interface Movimiento {
    id:              number;
    numeroCuenta:    number;
    valor:           number;
    fecha:           string;
    estado:          boolean;
    tipoMovimiento:  string;
    cuenta:          Cuenta;
}