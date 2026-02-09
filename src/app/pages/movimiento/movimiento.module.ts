import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientoRoutingModule } from './movimiento-routing.module';
import { MovimientoComponent } from './movimiento.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MovimientoComponent],
  imports: [
    CommonModule,
    MovimientoRoutingModule,
    FormsModule
  ]
})
export class MovimientoModule { }
