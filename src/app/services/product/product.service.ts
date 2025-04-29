import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constants/constan';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
 
  constructor(private http: HttpClient) {

  }
  getCategory(){
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY)
  }
  getProductsByCategory(id: Number){
    return this.http.get(`${Constant.API_END_POINT}${Constant.METHODS.GET_PRODUCTS_BY_CATEGORY}?id=${id}`)
  }
  getProducts(){
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCT)
  }
  saveProduct(obj:any){
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.SAVE_PRODUCT,obj)
 
  }
  updateProduct(obj:any){
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.UPDATE_PRODUCT,obj)
 
  }
  deleteProduct(id:any){
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.DELETE_PRODUCT + id)
 
  }
}
