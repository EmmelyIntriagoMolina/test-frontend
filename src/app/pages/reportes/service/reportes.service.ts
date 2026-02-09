import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalContants } from 'src/app/utils/global/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private readonly url = GlobalContants.url;
  private headers = new HttpHeaders()
    .set("Content-Type", "application/json");

  options = { headers: this.headers };

  constructor(public http: HttpClient) { }

}
