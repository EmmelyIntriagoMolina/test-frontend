import { Cliente } from "../../cliente/models";

export interface Cuenta {
    numeroCuenta:   number;
    tipoCuenta:     string;
    saldoInicial:   number;
    estado:         boolean;
    cliente:        Cliente;
}