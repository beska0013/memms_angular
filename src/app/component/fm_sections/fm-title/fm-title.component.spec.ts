import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmTitleComponent } from './fm-title.component';

describe('FmTitleComponent', () => {
  let component: FmTitleComponent;
  let fixture: ComponentFixture<FmTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FmTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
