import { Component, OnInit } from '@angular/core';
import { FiltrosReporte, ReporteCuenta } from '../../pages/reportes/models';
import * as xlsx from 'xlsx';
import Swal from 'sweetalert2';
import { ReportesService } from '../../pages/reportes/service/reportes.service';
import { Cliente } from '../cliente/models';
import * as moment from 'moment';
import { ClienteService } from '../cliente/service/cliente.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  clientes: any[] = [];
  detalleReporte: ReporteCuenta[] = [];

  filtros: FiltrosReporte = {
    clienteId: 0,
    tipoCuenta: '',
    fechaInicio: moment().format("YYYY-MM-DD"),
    fechaFin: moment().format("YYYY-MM-DD")
  };

  cargando = false;

  constructor(
    private readonly _reporteService: ReportesService,
    private readonly _clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.cargarClientes()
  }

  cargarClientes() {
    this._clienteService
      .obtenerClientes()
      .then((resp: any) => {
        this.clientes = resp
      }).catch((error) => {
        Swal.fire('Error', 'No se pudieron cargar los clientes', 'error')
      })
  }

  generarReporte() {
    this.cargando = true
    this._reporteService
    .generarReporte(this.filtros)
    .subscribe({
      next: (data) => {
        this.detalleReporte = data
        this.cargando = false
      },
      error: (error) => {
        console.log(error)
        this.cargando = false
      }
    })
  }
  limpiarFiltros() {
    this.filtros = {
      clienteId: 0,
      tipoCuenta: '',
      fechaInicio: moment().format("YYYY-MM-DD"),
      fechaFin: moment().format("YYYY-MM-DD")
    }
    this.detalleReporte = []
  }

  descargarPdf() {
    this._reporteService
    .descargarPdf(this.filtros)
    .subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob)
        const link: HTMLAnchorElement = document.createElement("a");
        link.href = url;
        link.download = `reporte.pdf`;
        link.click();
        window.URL.revokeObjectURL(url)
      },
      error: (error) => console.log(error)
    })
  }

  descargarExcel() {
    let rows = []
    let cabecera = [
      "Fecha",
      "Cliente",
      "Número Cuenta",
      "Movimiento",
      "Saldo"
    ]
    rows.push(cabecera)
    this.detalleReporte.forEach((n) => {
      rows.push([
        n.fecha,
        n.cliente,
        n.numeroCuenta,
        `${n.tipoMovimiento} de $${n.valor}`,
        n.saldo
      ])
    })
    let workbook = xlsx.utils.book_new();
    const ws: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(rows)
    xlsx.utils.book_append_sheet(workbook, ws, 'Reporte Movimientos')
    ws["!cols"] = [
      { wch: 10 }, { wch: 20 }, { wch: 15 }, { wch: 25 }, { wch: 10 }
    ]
    xlsx.writeFile(workbook, `reporte.xlsx`);
  }
}
