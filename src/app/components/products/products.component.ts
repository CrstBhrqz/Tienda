import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;//Estado del boton para mostar boton lateral
  productChosen:Product={
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id:'',
      name:'',
    },
    description: '',
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    console.log("activo");

    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id:string){//recibe del hijo
    console.log(id);

    this.productsService.getProduct(id)
    .subscribe(data=>{
        console.log('product',data);
        this.toggleProductDetail();//permite que de acuerdo a la peticion del servicio se muestre
        }
      )

  }

  createNewProduct(){
    const product={
      title:'Nuevo Prod',
      description:'bla bkla',
      images:[''],

    }
    //this.productsService.createProduct();
  }

}
