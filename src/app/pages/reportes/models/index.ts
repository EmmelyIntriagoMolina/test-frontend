export interface FiltrosReporte {
  clienteId?:     number;
  tipoCuenta?:    string;
  fechaInicio?:   string;
  fechaFin?:      string;
}

export interface ReporteCuenta {
  cliente:        string;
  numeroCuenta:   number;
  tipoMovimiento: string;
  fecha:          string;
  valor:          string;
  saldo:          string;
}
