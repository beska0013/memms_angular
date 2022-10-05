import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmReviewContextComponent } from './fm-review-context.component';

describe('FmReviewContextComponent', () => {
  let component: FmReviewContextComponent;
  let fixture: ComponentFixture<FmReviewContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FmReviewContextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmReviewContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
