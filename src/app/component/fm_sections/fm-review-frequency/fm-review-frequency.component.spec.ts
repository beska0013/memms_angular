import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmReviewFrequencyComponent } from './fm-review-frequency.component';

describe('FmReviewFrequencyComponent', () => {
  let component: FmReviewFrequencyComponent;
  let fixture: ComponentFixture<FmReviewFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FmReviewFrequencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmReviewFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
