import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalContants } from 'src/app/utils/global/global-constants';
import { Movimiento } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private readonly url = GlobalContants.url;
  private headers = new HttpHeaders()
    .set("Content-Type", "application/json");

  options = { headers: this.headers };

  constructor(public http: HttpClient) { }

  obtenerMovimientos() {
    return new Promise((res, rej) => {
      this.http
        .get(`${this.url}/movimientos`, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
  obtenerMovimiento(id: number) {
    return new Promise((res, rej) => {
      this.http
        .get(`${this.url}/movimientos/${id}`, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
  actualizarmovimiento(id: number, movimiento: Movimiento) {
    return new Promise((res, rej) => {
      this.http
        .put(`${this.url}/movimientos/${id}`, movimiento, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
  crearMovimiento(movimiento: Movimiento) {
    return new Promise((res, rej) => {
      this.http
        .post(`${this.url}/movimientos`, movimiento, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
  eliminarMovimiento(id: number) {
    return new Promise((res, rej) => {
      this.http
        .delete(`${this.url}/movimientos/${id}`, this.options)
        .subscribe({
          next: (resp) => res(resp),
          error: (err) => rej(err),
        });
    });
  }
}
