import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarConsultasComponent } from './agregar-editar-consultas.component';

describe('AgregarEditarConsultasComponent', () => {
  let component: AgregarEditarConsultasComponent;
  let fixture: ComponentFixture<AgregarEditarConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarConsultasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
