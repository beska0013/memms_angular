import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagUiComponent } from './tag-ui.component';

describe('TagUiComponent', () => {
  let component: TagUiComponent;
  let fixture: ComponentFixture<TagUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TagUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
