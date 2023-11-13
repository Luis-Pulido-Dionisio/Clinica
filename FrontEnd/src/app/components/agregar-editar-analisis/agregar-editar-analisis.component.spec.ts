import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarAnalisisComponent } from './agregar-editar-analisis.component';

describe('AgregarEditarAnalisisComponent', () => {
  let component: AgregarEditarAnalisisComponent;
  let fixture: ComponentFixture<AgregarEditarAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarAnalisisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
