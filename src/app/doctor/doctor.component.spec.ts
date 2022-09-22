import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { delay, of } from 'rxjs';
import { DoctorService } from '../doctor.service';

import { DoctorComponent } from './doctor.component';

describe('DoctorComponent', () => {
  let component: DoctorComponent;
  let fixture: ComponentFixture<DoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      declarations: [ DoctorComponent ],
      providers:[DoctorService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it("should include doctor", () => {
    const fixture = TestBed.createComponent(DoctorComponent)
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector("div").textContent).toContain("Doctor")
  })


  it("should get all doctor details from backend",fakeAsync(()=>{
     let fixture = TestBed.createComponent(DoctorComponent)
     let component = fixture.debugElement.componentInstance
     let doctorService = fixture.debugElement.injector.get(DoctorService)
     let stub = spyOn(doctorService,"getAllDoctor").and.callFake(()=>{
       return of([]).pipe(delay(300))
     })
     component.getDoctorData();
     expect(component.getData).toBeTrue;
     tick(300)
      expect(component.getData).toBeFalse;
      expect(component.doctors).toEqual([])
     
  }))

});
