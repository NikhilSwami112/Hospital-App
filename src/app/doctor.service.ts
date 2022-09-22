import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = "http://localhost:9191/doctor"

  constructor(private httpClient: HttpClient) {
  }

  getAllDoctor() {
    return this.httpClient.get(`${this.baseUrl}/all`);
  }

  getDoctor(id) {
    return this.httpClient.get(this.baseUrl + "/" + id);
  }

  addDoctorData(doctor) {
    return this.httpClient.post(this.baseUrl + "/add", doctor);
  }

  // deleteDoctorData(id) {
  //   return this.httpClient.delete(this.baseUrl + "/delete/" + id);
  // }

  updateDoctor(id, doctor) {
    return this.httpClient.put(this.baseUrl + "/update/" + id, doctor);
  }

}
