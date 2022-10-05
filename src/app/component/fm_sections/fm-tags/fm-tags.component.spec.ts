import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmTagsComponent } from './fm-tags.component';

describe('FmTagsComponent', () => {
  let component: FmTagsComponent;
  let fixture: ComponentFixture<FmTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FmTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
