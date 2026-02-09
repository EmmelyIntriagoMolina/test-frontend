import { Component, OnInit } from '@angular/core';
import { MovimientoService } from '../../pages/movimiento/service/movimiento.service';
import { Movimiento, } from '../../pages/movimiento/models';
import Swal from 'sweetalert2';
import { questionAlert } from 'src/app/helpers/swal.helper';
import * as moment from 'moment';
import { Cuenta } from '../cuenta/models';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {

  listaMovimientos: Movimiento[] = []
  movimiento: Movimiento = {
    id: 0,
    numeroCuenta: 0,
    valor: 0,
    fecha: '',
    estado: true,
    tipoMovimiento: '',
    cuenta: {
      numeroCuenta: 0,
      tipoCuenta: '',
      saldoInicial: 0,
      estado: true,
      cliente: {
        clienteId: 0,
        nombre: '',
        direccion: '',
        telefono: '',
        contrasena: '',
        estado: true,
        edad: 0,
        genero: '',
        identificacion: '',
      }
    }
  }
  filtroBusqueda: string = ''
  mostrarModal: boolean = false
  listaFiltrada: Movimiento[] = []
  numeroCuentaActual: number = 0
  tipoCuentaActual: string = ''

  constructor(
    private readonly _movimientoService: MovimientoService
  ) { }

  async ngOnInit() {
    await this.obtenerMovimientos()
  }

  async obtenerMovimientos() {
    await this._movimientoService
      .obtenerMovimientos()
      .then((resp: any) => {
        this.listaMovimientos = resp
        this.listaFiltrada = [...this.listaMovimientos]
        console.log(resp)
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async obtenerMovimiento(id: number) {
    await this._movimientoService
      .obtenerMovimiento(id)
      .then((resp: any) => {
        this.movimiento = resp
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async actualizarMovimiento(movimiento: Movimiento) {
    const { isConfirmed } = await questionAlert('Se actualizará este movimiento')
    if (!isConfirmed) return;

    movimiento.cuenta = {
      numeroCuenta: this.numeroCuentaActual,
      tipoCuenta: this.tipoCuentaActual
    } as Cuenta
    await this._movimientoService
      .actualizarmovimiento(movimiento.id, movimiento)
      .then(async (resp: any) => {
        await Swal.fire('Success!', 'Movimiento actualizado correctamente', 'success')
        this.movimiento = resp
        this.cerrarModal()
        this.obtenerMovimientos()
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async crearMovimiento(movimiento: Movimiento) {
    movimiento.cuenta = {
      numeroCuenta: this.numeroCuentaActual,
      tipoCuenta: this.tipoCuentaActual
    } as Cuenta
    await this._movimientoService
      .crearMovimiento(movimiento)
      .then(async (resp: any) => {
        await Swal.fire('Success!', 'Movimiento creado correctamente', 'success')
        this.movimiento = resp
        this.cerrarModal()
        this.obtenerMovimientos()
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async eliminarMovimiento(id: number) {
    const { isConfirmed } = await questionAlert('Se eliminará este Movimiento')
    if (!isConfirmed) return;

    await this._movimientoService
      .eliminarMovimiento(id)
      .then(async (resp: any) => {
        await Swal.fire('Success!', 'Movimiento eliminado correctamente', 'success')
        await this.obtenerMovimientos()
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  abrirModal() {
    this.mostrarModal = true
  }
  cerrarModal() {
    this.mostrarModal = false
  }
  asignarMovimiento(movimiento: Movimiento) {
    this.movimiento = movimiento
  }
  filtarBusqueda() {
    const text: string = this.filtroBusqueda.toLowerCase().trim()
    this.listaFiltrada = this.listaMovimientos.filter(movimiento => 
      Object.values(movimiento).some(value => 
        String(value).toLowerCase().includes(text)
      )
    )
  }
  limpiarMovimiento() {
    this.movimiento = {
      id: 0,
      numeroCuenta: 0,
      valor: 0,
      fecha: '',
      estado: true,
      tipoMovimiento: '',
      cuenta: {
        numeroCuenta: 0,
        tipoCuenta: '',
        saldoInicial: 0,
        estado: true,
        cliente: {
          clienteId: 0,
          nombre: '',
          direccion: '',
          telefono: '',
          contrasena: '',
          estado: true,
          edad: 0,
          genero: '',
          identificacion: '',
        }
      }
    }
  }
}
