import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaToolsComponent } from './area-tools.component';

describe('AreaToolsComponent', () => {
  let component: AreaToolsComponent;
  let fixture: ComponentFixture<AreaToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AreaToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
