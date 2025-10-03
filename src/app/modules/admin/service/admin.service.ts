import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStorageService } from '../../../auth/services/storage/user-storage.service';
import { Observable } from 'rxjs';


const BASIC_URL = "http://localhost:8080";
@Injectable({
  providedIn: 'root'

})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/admin/category" , categoryDto,{
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCategorys(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/categorys", {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProduct(productDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/admin/product", productDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/products", {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductsByName(title:any): Observable<any> {
    return this.http.get(BASIC_URL + `/api/admin/search/${title}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getProductById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `/api/admin/product/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + `/api/admin/product/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  updateProduct(id: number, productDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `/api/admin/product/update/${id}`, productDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createCoupon(couponDto: any): Observable<any>{
    return this.http.post(BASIC_URL + "/api/admin/coupon", couponDto,{
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllCoupons(): Observable<any>{
    return this.http.get(BASIC_URL + "/api/admin/coupons",{
      headers: this.createAuthorizationHeader(),
    });
  }



  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
