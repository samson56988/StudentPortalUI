import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';
import { AddStudentRequest } from '../models/api-models/add-student-request.model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private baseApiUrl = 'https://localhost:7095/api'
  private port = 'https://localhost:7095'


  constructor(private httpClient: HttpClient) {  }

  getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students/students');
  }

  
  getStudent(studentId:string):Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/students/students/'+studentId )
  }

  updateStudent(studentId:string,studentRequest:Student):  Observable<Student> {

    const updateStudentRequest:UpdateStudentRequest = {
      firstName:studentRequest.firstName,
      lastName:studentRequest.lastName,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      dateOfBirth:studentRequest.dateOfBirth,
      genderId:studentRequest.genderId,
      physicalAddress :studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    };

    return this.httpClient.put<Student>(this.baseApiUrl + '/students/students/' + studentId, updateStudentRequest);

  }

  deleteStudent(studentId:string): Observable<Student> {
    return this.httpClient.delete<Student>(this.baseApiUrl + '/students/students/'+ studentId); 
   }

   addStudent(studentRequest:Student): Observable<Student>{

    const addStudentRequest:AddStudentRequest = {
      firstName:studentRequest.firstName,
      lastName:studentRequest.lastName,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      dateOfBirth:studentRequest.dateOfBirth,
      genderId:studentRequest.genderId,
      physicalAddress :studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    };

    return this.httpClient.post<Student>(this.baseApiUrl + '/students/students/Add',addStudentRequest)

   }


   uploadImage(studentId:string,file:File): Observable<any>{
         const formData = new FormData(); 
         formData.append("profileImage",file);

        return this.httpClient.post(this.baseApiUrl + '/students/students/' + studentId + 'upload-image',formData,{
             responseType:'text'
         });
   }

   getImagePath(relativePath:string){
    return `${this.port}/${relativePath}`;
   }

}
