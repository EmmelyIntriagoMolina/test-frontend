import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReportesComponent } from './reportes.component';
import { FormsModule } from '@angular/forms';
import { ReportesService } from './service/reportes.service';

describe('ReportesComponent', () => {
  let component: ReportesComponent;
  let fixture: ComponentFixture<ReportesComponent>;
  let reportesServiceMock: jest.Mocked<ReportesService>

  beforeEach(async () => {
    reportesServiceMock = {
      generarReporte: jest.fn(),
      descargarPdf:   jest.fn()
    } as any

    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      declarations: [ ReportesComponent ],
      providers: [
        { 
          provide: ReportesService,
          useValue: reportesServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
