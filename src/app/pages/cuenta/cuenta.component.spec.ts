import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CuentaComponent } from './cuenta.component';
import { FormsModule } from '@angular/forms';
import { CuentaService } from './service/cuenta.service';

describe('CuentaComponent', () => {
  let component: CuentaComponent;
  let fixture: ComponentFixture<CuentaComponent>;
  let cuentaServiceMock: jest.Mocked<CuentaService>

  beforeEach(async () => {
    cuentaServiceMock = {
      obtenerCuentas:     jest.fn(),
      obtenerCuenta:      jest.fn(),
      crearCuenta:        jest.fn(),
      actualizarCuenta:   jest.fn(),
      eliminarCuenta:     jest.fn()
    } as any

    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      declarations: [ CuentaComponent ],
      providers: [
        { 
          provide: CuentaService,
          useValue: cuentaServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener cuentas', async () => {
    cuentaServiceMock.obtenerCuentas.mockResolvedValue([{ numeroCuenta: 34231, tipoCuenta: 'Ahorros' }])
    await component.obtenerCuentas()
    
    expect(component.listaCuentas.length).toBe(1)
    expect(component.listaCuentas[0].numeroCuenta).toBe(34231)
  });
});
