import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteggioComponent } from './sorteggio.component';

describe('SorteggioComponent', () => {
  let component: SorteggioComponent;
  let fixture: ComponentFixture<SorteggioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorteggioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorteggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
