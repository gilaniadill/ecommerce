import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
 

  productsList: any[] = [];
  isLoading: boolean = true;

  constructor(private prodSrv: ProductService) {}
  ngOnInit(): void {
    this.getAllProducts("Fruits & Vegetables");
  }

  getAllProducts(categoryName: string) {
    this.isLoading = true;
    this.prodSrv.getProducts().subscribe((res: any) => {
      let filteredProducts = res.data
        .filter((product: any) => 
          product.categoryName?.toLowerCase() === categoryName.toLowerCase() && // Match category
          product.productImageUrl // Ensure image URL is present
        )
        .sort((a: any, b: any) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()); // Sort by latest date
  
      // Check if images are actually loading
      const validProducts: any[] = [];
      let checkedCount = 0;
  
      filteredProducts.forEach((product:any) => {
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
