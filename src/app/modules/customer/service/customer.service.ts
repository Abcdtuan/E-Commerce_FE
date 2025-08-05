import { UserStorageService } from './../../../auth/services/storage/user-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<any>{
    return this.http.get(BASIC_URL + '/api/customer/products',{
      headers: this.createAuthorizationheader(),
    })
  }

  getAllProductsByName(title: any): Observable<any> {
    return this.http.get(BASIC_URL + `/api/customer/search/${title}`, {
      headers: this.createAuthorizationheader()
    })
  }

  addProductToCart(productId: any): Observable<any> {
    const CartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + '/api/customer/cart', CartDto, {
      headers: this.createAuthorizationheader()
    });
  }

  getCartByUserId(): Observable<any>{
    const userId = UserStorageService.getUserId()
    return this.http.get(BASIC_URL + `/api/customer/cart/${userId}`,{
      headers: this.createAuthorizationheader()
    })
  }

  private createAuthorizationheader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }


}
