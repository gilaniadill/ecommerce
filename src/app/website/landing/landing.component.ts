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
  isLoading: boolean = true;

  constructor(private prodSrv:ProductService, private route: ActivatedRoute){

  }
  ngOnInit():void{
   this.getAllProducts("Fruits & Vegetables");
  }
  getAllProducts(categoryName: string){
    this.isLoading = true;
    this.prodSrv.getProducts().subscribe((res: any) => {
      this.productList = res.data
        .filter((product: any) => product.categoryName.toLowerCase() === categoryName.toLowerCase()) // Filter by category name (case insensitive)
        .sort((a: any, b: any) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()) // Sort by latest date
        .slice(0, 4); // Limit to 4 products
        this.isLoading=false;
    });
  }


  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        document.getElementById(fragment)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}
