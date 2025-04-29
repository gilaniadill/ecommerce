import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent {
 
  isLoading: boolean = true;


  activeCategoryId: Number  = 0;
  products: any[] = [];
  constructor(private activatedRoute: ActivatedRoute, private prdoSrv:ProductService) { 
    this.activatedRoute.params.subscribe((res:any) => {
      this.activeCategoryId = res.id;
      this.loadProducts();
    });
  }
 
  loadProducts(){
    this.prdoSrv.getProductsByCategory(this.activeCategoryId).subscribe((res:any) => {
      this.products = res.data;
      console.log(this.products);
    });

  }



}
