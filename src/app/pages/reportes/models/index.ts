export interface FiltrosReporte {
  clienteId?: number;
  tipoCuenta?: string;
  fechaInicio?: string;
  fechaFin?: string;
}

export interface ReporteCuenta {
  numeroCuenta: number;
  tipoCuenta: string;
  clienteNombre: string;
  saldoActual: number;
  fechaApertura: string;
}
