import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScegliSerieComponent } from './scegli-serie.component';

describe('ScegliSerieComponent', () => {
  let component: ScegliSerieComponent;
  let fixture: ComponentFixture<ScegliSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScegliSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScegliSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
