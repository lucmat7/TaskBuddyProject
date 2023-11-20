import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentCreationComponent } from './incident-creation.component';

describe('IncidentCreationComponent', () => {
  let component: IncidentCreationComponent;
  let fixture: ComponentFixture<IncidentCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncidentCreationComponent]
    });
    fixture = TestBed.createComponent(IncidentCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
