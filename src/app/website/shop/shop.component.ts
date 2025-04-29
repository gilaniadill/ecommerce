import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
 

  productsList: any[] = [];
  isLoading: boolean = true;

  constructor(private prodSrv: ProductService) {}
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.isLoading = true;
    const allowedCategories = ["fruits", "vegetables"];
  
    this.prodSrv.getProducts().subscribe((res: any) => {
      let filteredProducts = res.data
        .filter((product: any) =>
          allowedCategories.includes(product.categoryName?.toLowerCase()) &&
          product.productImageUrl
        )
        .sort((a: any, b: any) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
  
      const validProducts: any[] = [];
      let checkedCount = 0;
  
      filteredProducts.forEach((product: any) => {
        const img = new Image();
        img.src = product.productImageUrl;
  
        img.onload = () => {
          validProducts.push(product);
          checkLoadingComplete();
        };
  
        img.onerror = () => {
          console.warn("Broken Image URL:", product.productImageUrl);
          checkLoadingComplete();
        };
      });
  
      const checkLoadingComplete = () => {
        checkedCount++;
        if (checkedCount === filteredProducts.length) {
          this.productsList = validProducts;
          this.isLoading = false;
        }
      };
    });
  }
  

}
