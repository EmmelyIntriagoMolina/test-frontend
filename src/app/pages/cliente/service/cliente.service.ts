import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalContants } from 'src/app/utils/global/global-constants';
import { Cliente } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly url = GlobalContants.url;
  private headers = new HttpHeaders()
    .set("Content-Type", "application/json");

  options = { headers: this.headers };

  constructor(public http: HttpClient) { }

  obtenerClientes() {
    return new Promise((res, rej) => {
      this.http
        .get(`${this.url}/clientes`, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
  obtenerCliente(id: number) {
    return new Promise((res, rej) => {
      this.http
        .get(`${this.url}/clientes/${id}`, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
  actualizarCliente(id: number, cliente: Cliente) {
    return new Promise((res, rej) => {
      this.http
        .put(`${this.url}/clientes/${id}`, cliente, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
  crearCliente(cliente: Cliente) {
    return new Promise((res, rej) => {
      this.http
        .post(`${this.url}/clientes`, cliente, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
  eliminarCliente(id: number) {
    return new Promise((res, rej) => {
      this.http
        .delete(`${this.url}/clientes/${id}`, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
}
