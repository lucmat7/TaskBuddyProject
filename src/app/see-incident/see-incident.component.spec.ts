import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeIncidentComponent } from './see-incident.component';

describe('SeeIncidentComponent', () => {
  let component: SeeIncidentComponent;
  let fixture: ComponentFixture<SeeIncidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeIncidentComponent]
    });
    fixture = TestBed.createComponent(SeeIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
