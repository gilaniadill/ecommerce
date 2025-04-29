import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit, AfterViewInit  {
  
  productList:any[]=[];
  categoryList:any[]=[];
  isLoading: boolean = true;

  constructor(private prodSrv:ProductService, private route: ActivatedRoute){

  }
  ngOnInit():void{
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
          this.productList = validProducts;
          this.isLoading = false;
        }
      };
    });
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        document.getElementById(fragment)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  getAllCategory(){
    this.prodSrv.getCategory().subscribe((res:any)=>{
      this.categoryList=res.data;
    })
  }

}
