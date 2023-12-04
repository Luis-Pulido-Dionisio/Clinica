import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarDoctoresComponent } from './agregar-editar-doctores.component';

describe('AgregarEditarDoctoresComponent', () => {
  let component: AgregarEditarDoctoresComponent;
  let fixture: ComponentFixture<AgregarEditarDoctoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarDoctoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
