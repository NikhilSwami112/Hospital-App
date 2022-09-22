import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patientIdd: number;
  patients: any;
  patient = []
  isClicked = false


  constructor(private patientService: PatientService, private doctorService: DoctorService, private router: Router) {
  }
  
  ngOnInit(): void {

  }

  getAllPatientData() {
    this.patient=[]
    return this.patientService.getAllPatientWithDoctor(this.patientIdd).subscribe((data) => {
      console.log("data", data)
      this.patients = data;
      this.patient = this.patients;
      this.patientIdd = null
    })
  }


  getData(event: any) {
    this.isClicked = true
    this.getAllPatientData();
  }

}
