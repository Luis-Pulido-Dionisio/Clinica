import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnalisisComponent } from './list-analisis.component';

describe('ListAnalisisComponent', () => {
  let component: ListAnalisisComponent;
  let fixture: ComponentFixture<ListAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnalisisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
