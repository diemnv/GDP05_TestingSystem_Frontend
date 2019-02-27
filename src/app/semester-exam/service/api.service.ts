import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class ApiService {
   private baseUrl: string = '//localhost:8080/';

   constructor(private http: HttpClient) { }

   getAll(nameapi: string): Observable<any> {
      var newUrl = this.baseUrl + nameapi;
      return this.http.get(newUrl);
   }

   search(nameapi: string, keyword: string): Observable<any> {
      var newUrl = this.baseUrl + nameapi;
      return this.http.post(newUrl, keyword);
   }

   saveOne(nameapi: string, data: any): Observable<any> {
      return this.http.post(this.baseUrl + nameapi, data);
   }
   delete(nameapi: string, id: string): Observable<any> {
      return this.http.post(this.baseUrl + nameapi, id);
   }

   deleteTest(nameapi: string): Observable<any> {
      return this.http.delete(this.baseUrl + nameapi);
   }

   getOne(nameapi: string, id: any): Observable<any> {
      return this.http.get(this.baseUrl + nameapi + '/' + id);
   }

   getData(nameapi: string): Observable<any> {
      var newUrl = this.baseUrl + nameapi;
      return this.http.get(newUrl);

   }
   filter(nameapi: string, name: string = null, status: number = -1, fullname: string = null, startTime: Date = null, endTime: Date = null): Observable<any> {
      var newUrl = this.baseUrl + nameapi;
      return this.http.get(newUrl + '?name=' + name + '&status=' + status + '&fullname=' + fullname);
   }

}
