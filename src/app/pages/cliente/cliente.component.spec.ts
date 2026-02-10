import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ClienteComponent } from '../../pages/cliente/cliente.component';
import { FormsModule } from '@angular/forms';
import { ClienteService } from './service/cliente.service';
import { firstValueFrom, of } from 'rxjs';
import { Cliente } from './models';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let fixture: ComponentFixture<ClienteComponent>;
  let clienteServiceMock: jest.Mocked<ClienteService>

  beforeEach(async () => {
    clienteServiceMock = {
      obtenerClientes: jest.fn(),
      crearCliente: jest.fn()
    } as any

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ClienteComponent],
      providers: [
        {
          provide: ClienteService,
          useValue: clienteServiceMock
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener clientes', async () => {
    clienteServiceMock.obtenerClientes.mockResolvedValue([{ clienteId: 1, nombre: 'Juan' }])
    await component.obtenerClientes()

    expect(component.listaClientes.length).toBe(1)
    expect(component.listaClientes[0].nombre).toBe('Juan')
  })
});
