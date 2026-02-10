import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalContants } from 'src/app/utils/global/global-constants';
import { FiltrosReporte, ReporteCuenta } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private readonly url = GlobalContants.url;

  constructor(public http: HttpClient) { }

  generarReporte(filtros: FiltrosReporte): Observable<ReporteCuenta[]> {
    return this.http.get<[]>(`${this.url}/reportes`, {
      params: this.buildParams(filtros)
    })
  }
  descargarPdf(filtros: FiltrosReporte): Observable<Blob> {
    return this.http.get(`${this.url}/reportes/pdf`, {
      params: this.buildParams(filtros),
      responseType: 'blob'
    })
  }

  private buildParams(filtros: any): HttpParams {
    let params = new HttpParams()
    Object.keys(filtros).forEach((key) => {
      if (filtros) params = params.set(key, filtros[key])
    })
    return params
  }

}
