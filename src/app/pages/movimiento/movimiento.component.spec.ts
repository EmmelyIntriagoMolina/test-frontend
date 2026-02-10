import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MovimientoComponent } from './movimiento.component';
import { FormsModule } from '@angular/forms';
import { MovimientoService } from './service/movimiento.service';

describe('MovimientoComponent', () => {
  let component: MovimientoComponent;
  let fixture: ComponentFixture<MovimientoComponent>;
  let movimientoServiceMock: jest.Mocked<MovimientoService>

  beforeEach(async () => {
    movimientoServiceMock = {
      obtenerMovimientos:   jest.fn(),
      obtenerMovimiento:    jest.fn(),
      crearMovimiento:      jest.fn(),
      actualizarmovimiento: jest.fn(),
      eliminarMovimiento:   jest.fn()
    } as any

    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      declarations: [ MovimientoComponent ],
      providers: [
        { 
          provide: MovimientoService,
          useValue: movimientoServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('debe obtener movimientos', async () => {
    movimientoServiceMock.obtenerMovimientos.mockResolvedValue([{ id: 100 }])
    await component.obtenerMovimientos()
    
    expect(component.listaMovimientos.length).toBe(1)
  })
});
