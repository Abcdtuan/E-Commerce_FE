import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient, private userStorageService: UserStorageService ) { }

  register(singupRequest: any): Observable<any>{
    return this.http.post(BASIC_URL + "sign-up", singupRequest)
  }
  login(username: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {username, password};
    return this.http.post(BASIC_URL + "authenticate", body, { headers, observe: 'response' }).pipe(
      map((res) =>{
        const token = res.headers.get('authorization')?.substring(7);
        const user = res.body;
        if(user && token) {
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        }
        return false;
      })
    );
  }
  getOrderByTrackingId(trackingId: number): Observable<any> {
    return this.http.get(BASIC_URL + `order/${trackingId}`, {
    });
  }

  sendOtp(email: string): Observable<any>{
    const params = new HttpParams().set('email', email);
    return this.http.post(BASIC_URL + `api/auth/password/send-otp`, null, {
      params,
      responseType:'text'
    })
  }
  verifyOtp(email: string, otp: string): Observable<string> {
    const params = new HttpParams().set('email', email).set('otp', otp);
    return this.http.post(BASIC_URL + `api/auth/password/verify-otp`, null, {
      params,
      responseType: 'text',
    });
  }

  resetPassword(email: string, newPassword: string): Observable<string> {
    const params = new HttpParams().set('email', email).set('newPassword', newPassword);
    return this.http.post(BASIC_URL + `api/auth/password/reset-password`, null, {
      params,
      responseType: 'text',
    });
  }

}
