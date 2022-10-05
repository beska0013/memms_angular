import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmNotificationsComponent } from './fm-notifications.component';

describe('FmNotificationsComponent', () => {
  let component: FmNotificationsComponent;
  let fixture: ComponentFixture<FmNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FmNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
