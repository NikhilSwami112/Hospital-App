import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { TakeAppointmentComponent } from './take-appointment/take-appointment.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "doctor", component: DoctorComponent, pathMatch: "full" },
  { path: "add-doctor", component: AddDoctorComponent, pathMatch: "full" },
  { path: "patient", component: PatientComponent, pathMatch: "full" },
  { path: "add-patient", component: AddPatientComponent, pathMatch: "full" },
  { path: "take-appoitment", component: TakeAppointmentComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
