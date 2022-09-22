import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  reactiveForm: FormGroup
  patientIdd: number;
  patients: any;
  patient = []
  doctors: any;
  submitted = false;
  ptname = ''
  newName = ''

  constructor(private patientService: PatientService, private doctorService: DoctorService, private router: Router) {
    this.getDoctorData();
  }

  ngOnInit(): void {
    // this.getAllPatientData();
    this.reactiveForm = new FormGroup({
      patientId: new FormControl(null, [Validators.required]),
      patientName: new FormControl(this.ptname, [Validators.required]),
      visitedDoctor: new FormControl(null, [Validators.required]),
      dateOfVisit: new FormControl(null, [Validators.required])
    })
  }

  private getDoctorData() {
    return this.doctorService.getAllDoctor().subscribe(data => {
      this.doctors = data
      // console.log("data", this.doctors)
    });
  }

  private addPatientData(patient) {
    return this.patientService.addPatient(patient).subscribe(data => {
      console.log("after adding to the database", data);
    }, err => {
      alert(`Error: ${err.status}`)
      console.log("error patient")
    })
  }

  getAllPatientData() {
    return this.patientService.getAllPatientWithDoctor(this.patientIdd).subscribe((data) => {
      // console.log("data", data)
      this.patients = data;
      this.patient = this.patients;
      this.patientIdd = null
    })
  }

  getNameOfPatient(event: any) {
    // console.log('value', event.target.value)
    this.ptname=''
    this.disableButton(event);
    fetch(`http://localhost:9191/patient/${event.target.value}`)
      .then(data => data.json())
      .then(data => {
        console.log("getnameofpatietn", data)
        this.ptname = data[0]["patientName"]
        this.newName = this.ptname
        console.log("getNewName", this.newName)
      })
  }


  getFormData() {
    console.log("REactive form", this.reactiveForm.value)
  }

  getData(event: any) {
    this.getAllPatientData();
  }

  onSubmit() {
    this.submitted = true
    this.reactiveForm.controls['patientName'].enable();
    // console.log("before Doctors Reactive form", this.reactiveForm.value)
    if (this.reactiveForm.get("patientName").value.length == 0) {
      this.reactiveForm.get("patientName").setValue(this.newName);
    }
    console.log("Doctors Reactive form", this.reactiveForm.value)
    // console.log("newName", this.newName)
    if (this.reactiveForm.valid) {
      try {
        this.addPatientData(this.reactiveForm.value);
        alert("Your response has been added successfully")
        this.router.navigate(["take-appoitment"])
      } catch (err) {
        prompt("There is problem with server")
      }
    }
  }

  disableButton(event: any) {
    console.log("function called")
    if (this.ptname.length > 0) {
      this.reactiveForm.controls['patientName'].disable({ onlySelf: true });
    } else {
      this.reactiveForm.controls['patientName'].enable();
    }
  }

}
