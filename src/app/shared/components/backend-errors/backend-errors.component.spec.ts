import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendErrorsComponent } from './backend-errors.component';

describe('BackendErrorsComponent', () => {
  let component: BackendErrorsComponent;
  let fixture: ComponentFixture<BackendErrorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackendErrorsComponent]
    });
    fixture = TestBed.createComponent(BackendErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
