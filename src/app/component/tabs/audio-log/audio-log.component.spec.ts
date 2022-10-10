import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioLogComponent } from './audio-log.component';

describe('AudioLogComponent', () => {
  let component: AudioLogComponent;
  let fixture: ComponentFixture<AudioLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AudioLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
