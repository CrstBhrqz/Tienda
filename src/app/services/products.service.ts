import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product,CreateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl= 'https://young-sands-07814.herokuapp.com/api/products';



  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsByPage(limit : number, offset : number){// para paginar productos
    return this.http.get<Product[]>(this.apiUrl, {
      params: {limit: limit, offset: offset} // envio de parametros
    });
  }

  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`);

  }

  createProduct(dto:CreateProductDTO){
    return this.http.post<Product>(`${this.apiUrl}`,dto);//cuerpo dto
  }

  updateProduct(id:string, dto:any){
    console.log(id);
    console.log(dto);

    return this.http.put<Product>(`${this.apiUrl}/${id}`,dto);
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

}
