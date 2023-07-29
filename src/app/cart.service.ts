import { Injectable } from '@angular/core';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  user: {name: string;
    address: string;}[] = [];
    
  private shipping = 'api/shipping';  // URL to web api

  addToCart(product: Product) {
    this.items.push(product);
  }

  addUser(user: {name: string;
    address: string;}) {
    this.user.push(user);
    console.log(user)
  }

  getItems() {
    return this.items;
  }
  getUser() {
    return this.user;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }
  constructor(private http: HttpClient) { }
}
