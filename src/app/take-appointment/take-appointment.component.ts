import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-take-appointment',
  templateUrl: './take-appointment.component.html',
  styleUrls: ['./take-appointment.component.css']
})
export class TakeAppointmentComponent implements OnInit {

  submitted = false
  reactiveForm: FormGroup
  patientIdd: number;
  patients: any;
  patient: any
  doctors: any;
  doct: any;
  doctI: number

  constructor(private patientService: PatientService, private doctorService: DoctorService, private router: Router) {
    this.getAll();
  }
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      doctId: new FormControl(null, [Validators.required]),
      patientId: new FormControl(null, [Validators.required]),
      prescription: new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.reactiveForm.valid) {
      console.log("patient while submit", this.patient)
      let obj = this.patient.find((data) => data["patientId"] = Number(this.patientIdd))
      obj["prescription"] = this.reactiveForm.get("prescription").value
      this.doct['totalPatientAttended'] += 1
      // console.log("doctor:", this.patient)
      try {
        let doctId = obj["visitedDoctor"]
        console.log("obj", obj, "id", doctId)
        this.updatePatient(doctId, obj)
        this.updateTotalOfDoctor(this.doct);
        this.reactiveForm.reset();
        this.router.navigate(["patient"])
      } catch (err) {
        console.log("There is problem with backend server")
      }
    }
    // console.log(this.reactiveForm.value)
  }

  getAll() {
    return this.patientService.getAllPatient().subscribe(data => {
      this.patient = data;
      this.patient = [...new Map(this.patient.map((data) => [data["patientId"], data])).values()]
      // console.log("patient", this.patient);
    })
  }

  updatePatient(doctId, patient) {
    this.patientIdd = Number(this.patientIdd)
    this.patientService.updatePatient(this.patientIdd, this.doctI, patient).subscribe(data => {
      console.log("updated doctor", data)
    })
  }

  getAllPatientData() {
    this.doctI=0
    this.patientIdd = this.reactiveForm.get("patientId").value
    console.log('Reactive From', this.reactiveForm)
    return this.patientService.getAllPatientWithDoctor(this.patientIdd).subscribe((data) => {
      // console.log("data", data)
      this.doctors = data;
    })
  }

  getSingleDoctor() {

    return this.doctorService.getDoctor(this.reactiveForm.get("doctId").value).subscribe(data => {
      console.log("Doctor doctorId", data)
      this.doctI = data["doctId"]
      this.doct = data;
    })
  }

  updateTotalOfDoctor(doctor) {
    return this.doctorService.updateDoctor(this.doct['doctId'], doctor).subscribe(data => {
      // console.log("updated Doctor", data)
    });
  }

}
