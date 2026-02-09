import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../../pages/cuenta/service/cuenta.service';
import { Cuenta } from '../../pages/cuenta/models';
import Swal from 'sweetalert2';
import { questionAlert } from 'src/app/helpers/swal.helper';
import { Cliente } from '../cliente/models';
import { ClienteService } from '../cliente/service/cliente.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  listaCuentas: Cuenta[] = []
  listaClientes: Cliente[] = []
  cuenta: Cuenta = {
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
  filtroBusqueda: string = ''
  mostrarModal: boolean = false
  actualizarCuentaBandera: boolean = false
  listaFiltrada: Cuenta[] = []
  clienteSeleccionado: number = 0

  constructor(
    private readonly _cuentaService: CuentaService,
    private readonly _clienteService: ClienteService
  ) { }

  async ngOnInit() {
    await this.obtenerCuentas()
    await this.obtenerClientes()
  }

  async obtenerCuentas() {
    await this._cuentaService
      .obtenerCuentas()
      .then((resp: any) => {
        this.listaCuentas = resp
        this.listaFiltrada = [...this.listaCuentas]
        console.log(resp)
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async obtenerCuenta(id: number) {
    await this._cuentaService
      .obtenerCuenta(id)
      .then((resp: any) => {
        this.cuenta = resp
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async actualizarCuenta(cuenta: Cuenta) {
    const { isConfirmed } = await questionAlert('Se actualziará esta cuenta')
    if (!isConfirmed) return;
    
    cuenta.cliente = {
      clienteId: this.clienteSeleccionado
    } as Cliente
    await this._cuentaService
      .actualizarCuenta(cuenta.numeroCuenta, cuenta)
      .then(async (resp: any) => {
        await Swal.fire('Success!', 'Cuenta actualizada correctamente', 'success')
        this.cuenta = resp
        this.cerrarModal()
        this.obtenerCuentas()
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async crearCuenta(cuenta: Cuenta) {
    cuenta.cliente = {
      clienteId: this.clienteSeleccionado
    } as Cliente
    await this._cuentaService
      .crearCuenta(cuenta)
      .then(async (resp: any) => {
        await Swal.fire('Success!', 'Cuenta creada correctamente', 'success')
        this.cuenta = resp
        this.cerrarModal()
        this.obtenerCuentas()
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async eliminarCuenta(id: number) {
    const { isConfirmed } = await questionAlert('Se eliminará esta Cuenta')
    if (!isConfirmed) return;

    await this._cuentaService
      .eliminarCuenta(id)
      .then(async (resp: any) => {
        await Swal.fire('Success!', 'Cuenta eliminada correctamente', 'success')
        await this.obtenerCuentas()
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async obtenerClientes() {
    await this._clienteService
      .obtenerClientes()
      .then((resp: any) => {
        this.listaClientes = resp
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
    this.actualizarCuentaBandera = false
  }
  asignarCuenta(cuenta: Cuenta) {
    this.cuenta = cuenta
  }
  filtarBusqueda() {
    const text: string = this.filtroBusqueda.toLowerCase().trim()
    this.listaFiltrada = this.listaCuentas.filter(cuenta =>
      Object.values(cuenta).some(value =>
        String(value).toLowerCase().includes(text)
      )
    )
  }
  limpiarCuenta() {
    this.cuenta = {
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
        identificacion: ''
      }
    }
  }
}
