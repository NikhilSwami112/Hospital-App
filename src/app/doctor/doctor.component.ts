import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctors: any=[];
  doctor: {};
  doctorId = 0;
  gotData=false

  constructor(private doctorService: DoctorService, private router: Router) {
    console.log("consturctor loaded")
    this.getDoctorData();
  }

  ngOnInit(): void {
  }

  private getDoctorData() {
    return this.doctorService.getAllDoctor().subscribe(data => {
      // console.log("data", data)
      this.gotData=true
      this.doctors = data
      console.log("data",data)
      console.log("data", this.doctors)
    },error=>{
      this.gotData=false
    })
  }


  private getOneDoctor(id) {
    return this.doctorService.getDoctor(id).subscribe(data => {
      this.doctor = data;
    })
  }

  dispalyTable(evnt: any) {
    // this.getOneDoctor(1);
    console.log(evnt)
    this.getOneDoctor(this.doctorId);
    console.log(this.doctorId)
  }
}
