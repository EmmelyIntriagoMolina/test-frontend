import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ClienteService } from './service/cliente.service';
import { Cliente } from './models';
import { questionAlert } from 'src/app/helpers/swal.helper';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  listaClientes: Cliente[] = [
   
  ]
  cliente: Cliente = {
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
  filtroBusqueda: string = ''
  mostrarModal: boolean = false
  listaFiltrada: Cliente[] = []

  constructor(
    private readonly _clienteService: ClienteService
  ) { }

  async ngOnInit() {
    await this.obtenerClientes()
  }

  async obtenerClientes() {
    await this._clienteService
      .obtenerClientes()
      .then((resp: any) => {
        this.listaClientes = resp
        this.listaFiltrada = [...this.listaClientes]
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async obtenerCliente(id: number) {
    await this._clienteService
      .obtenerCliente(id)
      .then((resp: any) => {
        this.cliente = resp
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async actualizarCliente(cliente: Cliente) {
    const { isConfirmed } = await questionAlert('Se actualizará este cliente')
    if (!isConfirmed) return;

    await this._clienteService
      .actualizarCliente(cliente.clienteId,cliente)
      .then(async (resp: any) => {
        await Swal.fire('Success!', 'Cliente actualizado con éxito', 'success')
        console.log(resp, 'resp')
        this.cliente = resp
        this.cerrarModal()
        this.obtenerClientes()
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async crearCliente(cliente: Cliente) {
    await this._clienteService
      .crearCliente(cliente)
      .then(async (resp: any) => {
        await Swal.fire('Success!', 'Cliente creado con éxito', 'success')
        this.cliente = resp
        this.cerrarModal()
        this.obtenerClientes()
      }).catch(async (error: Error) => {
        await Swal.fire('Oops!', error.message, 'error')
        console.log(error)
      })
  }
  async eliminarCliente(id: number) {
    const { isConfirmed } = await questionAlert('Se eliminará este Cliente')
    if (!isConfirmed) return;

    await this._clienteService
      .eliminarCliente(id)
      .then(async (resp: any) => {
        await Swal.fire('Success!', 'Cliente eliminado con éxito', 'success')
        await this.obtenerClientes()
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
  asignarCliente(cliente: Cliente) {
    this.cliente = cliente
  }
  filtarBusqueda() {
    const text: string = this.filtroBusqueda.toLowerCase().trim()
    this.listaFiltrada = this.listaClientes.filter(cliente => 
      Object.values(cliente).some(value => 
        String(value).toLowerCase().includes(text)
      )
    )
  }
  limpiarCliente() {
    this.cliente = {
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
