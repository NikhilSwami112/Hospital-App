import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  doctors: [];
  reactiveForm: FormGroup;
  doctorField = [
    "Andrology Clinic",
    "Bariatric & Metabolic Surgery",
    "CTVS",
    "Cardio",
    "Community Medicine",
    "Dental",
    "ENT",
    "Endocrinology",
    "Eye (RIO)",
    "Gastro",
    "General Medicine",
    "General Surgery",
    "Gynecological Oncology",
    "Haematology",
    "Medical Oncology",
    "Nephrology",
    "Neuro Medicine",
    "Neuro Surgery",
    "Obs & Gyn",
    "Ortho",
    "Paediatric Surgery",
    "Paediatrics",
    "Pain & Pallitive Care",
    "Physical Medicine & Rehabilation",
    "Physiotherapy",
    "Psychiatry",
    "Pulmonary Medicine",
    "Radiation Oncology",
    "Reproductive Medicine",
    "Skin & V.D.",
    "Surgical Gastro",
    "Surgical Oncology",
    "Urology"
  ]
  submitted = false
  isSaved=false

  constructor(private doctorService: DoctorService, private router: Router) {
    console.log("consturctor loaded")
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      doctName: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required, Validators.min(22), Validators.max(100)]),
      gender: new FormControl(null, [Validators.required]),
      specialist: new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    this.submitted = true;
    console.log("Doctors Reactive form", this.reactiveForm)
    if (this.reactiveForm.valid) {
      try {
        this.saveDoctorData();
        alert("Your response has been added successfully")
        this.reactiveForm.reset();
        this.router.navigate(['doctor'])
      } catch (err) {
        prompt("There is problem with server")
      }
    }
  }

  private saveDoctorData() {
    return this.doctorService.addDoctorData(this.reactiveForm.value).subscribe(data => {
      console.log("doctor added", data);
      this.isSaved=true
    },err=>{
      alert(`Error: ${err.status}`)
    })
  }

}
