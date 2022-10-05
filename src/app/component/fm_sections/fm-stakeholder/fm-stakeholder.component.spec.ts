import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmStakeholderComponent } from './fm-stakeholder.component';

describe('FmStakeholderComponent', () => {
  let component: FmStakeholderComponent;
  let fixture: ComponentFixture<FmStakeholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FmStakeholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmStakeholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
