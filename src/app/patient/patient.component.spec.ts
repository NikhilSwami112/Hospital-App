import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PatientComponent } from './patient.component';

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ PatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it("should include patient", () => {
    const fixture = TestBed.createComponent(PatientComponent)
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector("div").textContent).toContain("Patient")
  })
});
