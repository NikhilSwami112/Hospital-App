import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { delay, of } from 'rxjs';
import { DoctorService } from '../doctor.service';

import { AddDoctorComponent } from './add-doctor.component';

describe('AddDoctorComponent', () => {
  let component: AddDoctorComponent;
  let fixture: ComponentFixture<AddDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ AddDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it("should include form paragraph", () => {
    const fixture = TestBed.createComponent(AddDoctorComponent)
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector("div").textContent).toContain("Doctor Registration")
  })
  // it("form should be valid", () => {
  //   expect(component.reactiveForm.invalid).toBeTruthy();
  // })

   it("form should be invalid for null value",async () => {
    component.reactiveForm.controls["doctName"].setValue('');
    component.reactiveForm.controls["age"].setValue('');
    component.reactiveForm.controls["gender"].setValue('');
    component.reactiveForm.controls["specialist"].setValue('');
    expect(component.reactiveForm.valid).toBeFalsy();
  })
  // it("form should be valid", () => {
  //   expect(component.reactiveForm.invalid).toBeTruthy();
  // })

   it("form should be valid",async () => {
     component.reactiveForm.controls["doctName"].setValue('Hari prasad');
    component.reactiveForm.controls["age"].setValue(45);
    component.reactiveForm.controls["gender"].setValue('male');
    component.reactiveForm.controls["specialist"].setValue('dentist');
    expect(component.reactiveForm.invalid).toBeFalsy();
  })

});
