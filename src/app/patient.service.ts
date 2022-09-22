import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = "http://localhost:9191/patient"


  constructor(private httpClient: HttpClient) { }

  getAllPatientWithDoctor(id) {
    return this.httpClient.get(`${this.baseUrl}/doctor/${id}`);
  }

  addPatient(patient) {
    return this.httpClient.post(this.baseUrl + "/add", patient);
  }

  getAllPatient() {
    return this.httpClient.get(this.baseUrl + "/all");
  }

  updatePatient(id, doctId, patient) {
    return this.httpClient.put(`${this.baseUrl}/update/${id}/doctor/${doctId}`, patient)
  }
}
