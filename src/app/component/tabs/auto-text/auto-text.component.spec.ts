import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoTextComponent } from './auto-text.component';

describe('AutoTextComponent', () => {
  let component: AutoTextComponent;
  let fixture: ComponentFixture<AutoTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AutoTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
