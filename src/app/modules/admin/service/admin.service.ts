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

  getAllProducts(page: number, size: number): Observable<any> {
    const params = {
      page: page.toString(),
      size: size.toString()
    }
    return this.http.get(BASIC_URL + "/api/admin/products", {
      headers: this.createAuthorizationHeader(),
      params: params
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

  deleteCoupon(id: number): Observable<any>{
    return this.http.delete(BASIC_URL + `/api/admin/coupon/delete/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  updateCoupon(id: number, couponDto: any): Observable<any>{
    return this.http.put(BASIC_URL + `/api/admin/coupon/update/${id}`, couponDto, {
      headers: this.createAuthorizationHeader(),
    });
  }
  createCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/admin/category", categoryDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  updateCategory(id: number, categoryDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `/api/admin/category/update/${id}`, categoryDto, {
      headers: this.createAuthorizationHeader(),
    })
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + `/api/admin/category/delete/${id}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllOrders(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/order/placedOrders", {
      headers: this.createAuthorizationHeader(),
    })
  }
  changeOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(BASIC_URL + `/api/admin/order/changeOrderStatus/${orderId}/${status}`,
      {}, {
      headers: this.createAuthorizationHeader(),
    })
  }
  calculateAnalytics(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/order/analytics", {
      headers: this.createAuthorizationHeader(),
    })
  }
  getProductStaticstics(month: number, year: number): Observable<any>{
    const params = {
      month: month.toString(),
      year: year.toString()
    }
    return this.http.get(BASIC_URL + "/api/admin/order/analytics/products", {
      headers: this.createAuthorizationHeader(),
      params: params
    })
  }

  getAllUsers(): Observable<any>{
    return this.http.get(BASIC_URL + "/api/admin/users",{
      headers: this.createAuthorizationHeader(),
    })
  }

  toggleUserStatus(id: number): Observable<any>{
    return this.http.put(BASIC_URL + `/api/admin/users/toggle-status/${id}`,
      {}, {
      headers: this.createAuthorizationHeader(),
    })
  }
  createBrand(brandDto: any): Observable<any>{
    return this.http.post(BASIC_URL + "/api/admin/brand", brandDto,{
      headers: this.createAuthorizationHeader(),
    })
  }

  getBrandByCategoryId(categoryId: number): Observable<any>{
    return this.http.get(BASIC_URL + `/api/admin/brand/category/${categoryId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllPayments(): Observable<any>{
    return this.http.get(BASIC_URL + "/api/admin/payments",{
      headers: this.createAuthorizationHeader(),
    });
  }
  refundPayment(paymentRefundDto: any): Observable<any>{
    return this.http.put(BASIC_URL + "/api/admin/payment/refund", paymentRefundDto,{
      headers: this.createAuthorizationHeader(),
    });
  }


  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
