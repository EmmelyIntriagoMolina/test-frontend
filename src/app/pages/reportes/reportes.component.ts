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
  reporte: ReporteCuenta[] = [];

  filtros: FiltrosReporte = {
    clienteId: undefined,
    tipoCuenta: '',
    fechaInicio: '',
    fechaFin: ''
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

  /*generarPDFReporte() {
    Swal.fire({
      title: 'Generando PDF...',
      text: 'Esto podría tardar unos segundos',
      footer: 'No cierres la ventana',
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading()
        Swal.disableButtons()
        this._reporteService
        .generarPDFReporte( this.listaFiltrada )
        .subscribe((resp: any) => {
          Swal.close()
          let blobUrl = URL.createObjectURL(resp);
          const link: HTMLAnchorElement = document.createElement("a");
          link.href = blobUrl;
          link.download = `reporte.pdf`;
          document.body.appendChild(link);
          link.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window,
            })
          );
        })
      }
    })
  }
  generarExcelReporte() {
    let rows = []
    let cabecera = [
      "Fecha",
      "Cliente",
      "Número Cuenta",
      "Tipo",
      "Saldo Inicial",
      "Estado",
      "Movimiento",
      "Saldo Disponible",
    ]
    rows.push(cabecera)
    this.listaFiltrada.forEach((n) => {
      rows.push([
        n.fecha,
        n.nombreCliente,
        n.numeroCuenta,
        n.tipoCuenta,
        n.saldoInicial,
        n.estado ? 'Activo' : 'Inactivo',
        n.movimiento,
        n.saldoDisponible,
      ])
    })
    let workbook = xlsx.utils.book_new();
    const ws: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(rows)
    xlsx.utils.book_append_sheet(workbook, ws, 'Listado Facturas')
    ws["!cols"] = [
      { wch: 10 }, { wch: 30 }, { wch: 10 }, { wch: 15 }, { wch: 10 }, 
      { wch: 10 }, { wch: 10 }, { wch: 10 }
    ]
    xlsx.writeFile(workbook, `reporte.xlsx`);
  }
  configurarFiltros() {
    this.listaFiltrada = this.detalleReporte.filter(r => {
      return (
        (!this.filtros.porCliente || r.idCliente == this.filtros.cliente) &&
        (!this.filtros.porTipoCuenta || r.tipoCuenta == this.filtros.tipoCuenta) &&
        (!this.filtros.porTipoMovimiento || r.tipoMovimiento == this.filtros.tipoMovimiento)
      )
    })
  }*/
}
