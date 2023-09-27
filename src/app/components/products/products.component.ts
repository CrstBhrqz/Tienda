import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
//import { title } from 'process';
import { zip } from 'rxjs';


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

   //Para Paginacion o filtros

   limitProducts=10;
   offset=0; //donde comienza a paginar
   statusDetail: 'loading' | 'success'  | 'error' | 'init' =  'init';


  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()///esto permite todos los productos
    .subscribe(data => {
      console.log(data);
      ;
    });
    ////Con Paginacion de productos

    this. loadMore();

  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }


  readAndUpdate(id:string){
    this.productsService.getProduct(id)
      .pipe(
        switchMap((product) => this.productsService.updateProduct(product.id,{title:'change'}) // manejo de observable en cascada

        )
      ).subscribe(data =>{
        console.log(data);//respuesta despues de las distintas peticiones

      });
      zip( // manejo de observable en paralelo
        this.productsService.getProduct(id), // observador 1
        this.productsService.updateProduct(id,{title:'change'}),  // observador 2
      ).subscribe(
        response =>
          {
            const read =response[0]  //respues de observador 1
            const update=response[1] //respues de observador 2
            console.log(read,update);

          }
      )
  }

  onShowDetail(id:string){//recibe del hijo
    this.statusDetail = 'loading'; //inicio de la peticion la cual esta cargando
    this.toggleProductDetail();//permite que de acuerdo a la peticion del servicio se muestre
    this.productsService.getProduct(id)
    .subscribe(data=>{// respues exitosa
        console.log('product',data);
        this.productChosen = data;
        this.statusDetail ='success';// inidica la carga exitosa
        console.log(this.statusDetail);
      }, response =>{ // respuesta  con error
        console.error(response.error.message);
        this.statusDetail ='error';// indica el ERROR
        console.log(this.statusDetail);

      })

  }

  createNewProduct(){
    const product:CreateProductDTO={
      title: 'Nuevo Producto',
      description: 'description',
      images: [''],
      price: 1000,
      categoryId :2,
    }
    this.productsService.createProduct(product)
    .subscribe(data =>{
      console.log('esto producto se creo',data);
      this.products.unshift(data)//ingrese el producto a la lista de productos
    });
  }

  updateProduct(){
    const changes:UpdateProductDTO={
      title: 'Nuevo titulo del producto',
      description: 'description',
      categoryId :2,
    }
    console.log(this.productChosen);

    const id = this.productChosen.id;
    this.productsService.updateProduct(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      console.log('updateProduct',data);

    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id).
      subscribe(data => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products.slice(productIndex,1);
        this.showProductDetail=false;
        console.log(data)
      });

  }

  loadMore() {//para cargar paginas
    console.log(this.offset);

    this.productsService.getProductsByPage(this.limitProducts,this.offset)//trae dies
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limitProducts;
    });


  }


}
