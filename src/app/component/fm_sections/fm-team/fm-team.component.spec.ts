import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmTeamComponent } from './fm-team.component';

describe('FmTeamComponent', () => {
  let component: FmTeamComponent;
  let fixture: ComponentFixture<FmTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FmTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
