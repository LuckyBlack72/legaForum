import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoSorteggiComponent } from './storico-sorteggi.component';

describe('StoricoSorteggiComponent', () => {
  let component: StoricoSorteggiComponent;
  let fixture: ComponentFixture<StoricoSorteggiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoricoSorteggiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoricoSorteggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
