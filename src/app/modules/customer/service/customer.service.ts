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
    return this.http.get(BASIC_URL + `/api/customer/products/search/${title}`, {
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

  applyCoupon(couponId: any): Observable<any>{
  const userId = UserStorageService.getUserId();
  return this.http.post(
    BASIC_URL + `/api/customer/cart/coupon/${userId}/${couponId}`,
    {}, 
    { headers: this.createAuthorizationheader() } 
  );
}


  avaialableCoupons(): Observable<any>{
    return this.http.get(BASIC_URL + '/api/customer/cart/coupons', {
      headers: this.createAuthorizationheader()
    })
  }
  increaseQuantity(productId: any): Observable<any> {
    const CartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()

    }
    return this.http.post(BASIC_URL + '/api/customer/cart/addition', CartDto, {
      headers: this.createAuthorizationheader()
    })
  }
  decreaseQuantity(productId: any): Observable<any> {
    const CartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + '/api/customer/cart/deduction', CartDto, {
      headers: this.createAuthorizationheader()
    })
  }
  deleteCartItem(cartItemsId: any): Observable<any> {
    return this.http.delete(BASIC_URL + `/api/customer/cart/deletion/${cartItemsId}`, {
      headers: this.createAuthorizationheader()
    })

  }

  getProductById(id: number): Observable<any> {
      return this.http.get(BASIC_URL + `/api/customer/products/${id}`, {
        headers: this.createAuthorizationheader(),
      });
  }

  placeOrder(placeOrderDto: any): Observable<any> {
     placeOrderDto.userId = UserStorageService.getUserId();
     return this.http.post(BASIC_URL + '/api/customer/cart/placeOrder', placeOrderDto, {
      headers: this.createAuthorizationheader()
    });
  }
  createPayment(orderId: number, amount: number, orderInfo: string): Observable<{url: string}> {
  const body = {
    orderId,
    amount,
    orderInfo
  };
  return this.http.post<{url: string}>(`${BASIC_URL}/api/payment/create`, body, {
    headers: this.createAuthorizationheader()
  });
}

  getOrdersByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `/api/customer/orders/placedOrders/${userId}`, {
      headers: this.createAuthorizationheader()
    });
  }


  private createAuthorizationheader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }

}
