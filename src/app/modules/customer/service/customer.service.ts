import { ProfileComponent } from './../components/profile/profile.component';
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

  getAllProducts(page: number, size: number): Observable<any>{
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get(BASIC_URL + '/api/customer/products',{
      headers: this.createAuthorizationheader(),
      params: params
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
  getOrderProductsById(orderId: number): Observable<any> {
    return this.http.get(BASIC_URL + `/api/customer/review/${orderId}`, {
      headers: this.createAuthorizationheader()
    });
  }

  giveReview(reviewDto: any): Observable<any> {
    return this.http.post(BASIC_URL + '/api/customer/review/product', reviewDto, {
      headers: this.createAuthorizationheader()
    });
  }
  getReviewByProductId(productId: number): Observable<any> {
    return this.http.get(BASIC_URL + `/api/customer/review/product/${productId}`, {
      headers: this.createAuthorizationheader()
    });
  }
  getAllCategories(): Observable<any>{
    return this.http.get(BASIC_URL + '/api/customer/categories', {
      headers: this.createAuthorizationheader()
    })
  }
  getProductsByCategoryId(categoryId: number): Observable<any>{
    return this.http.get(BASIC_URL + `/api/customer/products/category/${categoryId}`, {
      headers: this.createAuthorizationheader()
    })
  }
  getProfile():Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `/api/customer/user/${userId}`,{
      headers: this.createAuthorizationheader()
    })
  }
  changePassword(userDto: any): Observable<any>{
    userDto.userId = UserStorageService.getUserId();
    return this.http.put(BASIC_URL + '/api/customer/user/changePassword', userDto, {
      headers: this.createAuthorizationheader()
    })
  }

  addProductToWishlist(wishlistDto: any): Observable<any>{
    return this.http.post(BASIC_URL + '/api/customer/wishlist', wishlistDto,{
      headers: this.createAuthorizationheader()
    });
  }
  getWishlistByUserId(): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `/api/customer/wishlist/${userId}`, {
      headers: this.createAuthorizationheader()
    });
  }
  deleteWishlistItem(wishlistId: number): Observable<any>{
    return this.http.delete(BASIC_URL + `/api/customer/wishlist/deletion/${wishlistId}`, {
      headers: this.createAuthorizationheader()
    });
  }
  getBrandByCategoryId(categoryId: number): Observable<any>{
    return this.http.get(BASIC_URL + `/api/customer/brand/category/${categoryId}`, {
      headers: this.createAuthorizationheader()
    });
  }
   getAllProductsByCategoryIdAndBrandId(categoryId: number, brandId: number): Observable<any>{
    return this.http.get(BASIC_URL + `/api/customer/products/filter/${categoryId}/${brandId}`, {
      headers: this.createAuthorizationheader()
    });
  }
  changeOrderStatus(orderId: number, status: string): Observable<any>{
    return this.http.put(BASIC_URL + `/api/customer/orders/changeOrderStatus/${orderId}/${status}`, {}, {
      headers: this.createAuthorizationheader()
    });
  }


  private createAuthorizationheader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }

}
