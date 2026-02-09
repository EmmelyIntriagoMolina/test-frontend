import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { MovimientoComponent } from './pages/movimiento/movimiento.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { ReportesModule } from './pages/reportes/reportes.module';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { 
        path: 'clientes', 
        loadChildren: () =>
          import("./pages/cliente/cliente.module")
            .then(m => m.ClienteModule)
      },
      { 
        path: 'cuentas', 
        loadChildren: () =>
          import("./pages/cuenta/cuenta.module")
            .then(m => m.CuentaModule)
      },
      { 
        path: 'movimientos', 
        loadChildren: () =>
          import("./pages/movimiento/movimiento.module")
            .then(m => m.MovimientoModule)
      },
      { 
        path: 'reportes', 
        loadChildren: () =>
          import("./pages/reportes/reportes.module")
            .then(m => m.ReportesModule)
      },
      { 
        path: '',
        redirectTo: 'clientes', 
        pathMatch: 'full' 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
