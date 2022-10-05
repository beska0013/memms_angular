import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmControlComponent } from './fm-control.component';

describe('FmControlComponent', () => {
  let component: FmControlComponent;
  let fixture: ComponentFixture<FmControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FmControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
