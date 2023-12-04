import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDoctoresComponent } from './list-doctores.component';

describe('ListDoctoresComponent', () => {
  let component: ListDoctoresComponent;
  let fixture: ComponentFixture<ListDoctoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDoctoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
