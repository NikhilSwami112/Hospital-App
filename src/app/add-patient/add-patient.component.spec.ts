import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientComponent } from './add-patient.component';

describe('AddPatientComponent', () => {
  let component: AddPatientComponent;
  let fixture: ComponentFixture<AddPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ AddPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it("should include form paragraph", () => {
    const fixture = TestBed.createComponent(AddPatientComponent)
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector("div").textContent).toContain("Patient Registration")
  })

  it("form should be invalid for null value",async () => {
    component.reactiveForm.controls["patientId"].setValue('');
    component.reactiveForm.controls["patientName"].setValue('');
    component.reactiveForm.controls["visitedDoctor"].setValue('');
    component.reactiveForm.controls["dateOfVisit"].setValue('');
    expect(component.reactiveForm.valid).toBeFalsy();
  })
  // it("form should be valid", () => {
  //   expect(component.reactiveForm.invalid).toBeTruthy();
  // })

   it("form should be valid",async () => {
    component.reactiveForm.controls["patientId"].setValue(1);
    component.reactiveForm.controls["patientName"].setValue('gyan');
    component.reactiveForm.controls["visitedDoctor"].setValue('sai pavan');
    component.reactiveForm.controls["dateOfVisit"].setValue('2022-02-03');
    expect(component.reactiveForm.invalid).toBeFalsy();
  })
});
