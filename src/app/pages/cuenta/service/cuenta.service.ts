import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalContants } from 'src/app/utils/global/global-constants';
import { Cuenta } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private readonly url = GlobalContants.url;
  private headers = new HttpHeaders()
    .set("Authorization", `Bearer ${localStorage.getItem("user")}`)
    .set("Content-Type", "application/json");

  options = { headers: this.headers };

  constructor(public http: HttpClient) { }

  obtenerCuentas() {
    return new Promise((res, rej) => {
      this.http
        .get(`${this.url}/cuentas`, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
  obtenerCuenta(id: number) {
    return new Promise((res, rej) => {
      this.http
        .get(`${this.url}/cuentas/${id}`, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
  actualizarCuenta(numeroCuenta: number, cuenta: Cuenta) {
    return new Promise((res, rej) => {
      this.http
        .put(`${this.url}/cuentas/${numeroCuenta}`, cuenta, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
  crearCuenta(cuenta: Cuenta) {
    return new Promise((res, rej) => {
      this.http
        .post(`${this.url}/cuentas`, cuenta, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
  eliminarCuenta(id: number) {
    return new Promise((res, rej) => {
      this.http
        .delete(`${this.url}/cuentas/${id}`, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
}
