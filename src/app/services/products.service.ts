import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, map} from "rxjs/operators";

import { Product,CreateProductDTO } from './../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl= 'https://young-sands-07814.herokuapp.com/api/products';



  constructor(
    private http: HttpClient
  ) { }

  // getAllProducts() {                             // SOLO hacerlo estatico
  //   return this.http.get<Product[]>(this.apiUrl);
  // }

  getAllProducts(limit?: number, offset?: number) {  // SOLO hacerlo dinamico
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);

    }
    return this.http.get<Product[]>(this.apiUrl,{params})
    .pipe(
      retry(3),// repite cuatro veces esta accion
      map(Product => {
        return Product.map(item =>{ // esta parte se encarga de asihar un valor a objecto en este caso en iva
          return {
            ...item,
            taxes :0.19* item.price
          }
        })
      }
      )
    )
  }


  getProductsByPage(limit : number, offset : number){// para paginar productos o filtros de acuerdo a un rango
    return this.http.get<Product[]>(this.apiUrl, {//recibe un array de product
      params: {limit: limit, offset: offset} // envio de parametros
    });
  }

  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      // .pipe(
      //   //catchError((error:HttpErrorResponse) => {

      //   })
      // )

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
