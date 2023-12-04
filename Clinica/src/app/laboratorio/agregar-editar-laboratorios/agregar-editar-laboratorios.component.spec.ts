import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarLaboratoriosComponent } from './agregar-editar-laboratorios.component';

describe('AgregarEditarLaboratoriosComponent', () => {
  let component: AgregarEditarLaboratoriosComponent;
  let fixture: ComponentFixture<AgregarEditarLaboratoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarLaboratoriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarLaboratoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
