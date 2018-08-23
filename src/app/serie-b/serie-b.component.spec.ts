import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieBComponent } from './serie-b.component';

describe('SerieBComponent', () => {
  let component: SerieBComponent;
  let fixture: ComponentFixture<SerieBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
