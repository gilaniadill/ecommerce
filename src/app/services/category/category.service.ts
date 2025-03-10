import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constants/constan';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

   getAllCategory(){
      return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY)
    }
}
