import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmAreaComponent } from './fm-area.component';

describe('FmAreaComponent', () => {
  let component: FmAreaComponent;
  let fixture: ComponentFixture<FmAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FmAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
