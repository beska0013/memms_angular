import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyDateTypesComponent } from './frequency-date-types.component';

describe('FrequencyDateTypesComponent', () => {
  let component: FrequencyDateTypesComponent;
  let fixture: ComponentFixture<FrequencyDateTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FrequencyDateTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequencyDateTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
