import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { FormsModule } from '@angular/forms';
import { CuentaComponent } from './cuenta.component';


@NgModule({
  declarations: [CuentaComponent],
  imports: [
    CommonModule,
    CuentaRoutingModule,
    FormsModule
  ]
})
export class CuentaModule { }
