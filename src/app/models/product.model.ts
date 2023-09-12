export interface Category{
  id: string;
  name: string;
}


export interface Product {
  id: string;
  title: string;
  price: number;
  images: string [];
  description: string;
  category: Category;
}
export interface CreateProductDTO extends Omit<Product, 'id' | 'category' >{//para este caso omite  los cmapo de id  y category
  categoryId: number;

}// se basa en los campo de Product

export interface UpdateProductDTO extends Partial<CreateProductDTO>{//en este caso los atributos son opcionales

}

