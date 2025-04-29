import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isMenuOpen: boolean=false;
  
  categoryList:any[]=[];
  openMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

    constructor(private prodSrv:ProductService, private route: ActivatedRoute, private router: Router){
  
    }
    ngOnInit():void{
     this.getAllCategory();
    }

    getAllCategory() {
      this.prodSrv.getCategory().subscribe((res: any) => {
        // Filter the categories to only include 'Fruits' and 'Vegetables'
        this.categoryList = res.data.filter((category: any) => 
          category.categoryName === 'Fruits' || category.categoryName === 'Vegetables'
        );
      });
    }

    // navigateToProducts(id:number){
    //   this.router.navigate(['/products',id]);
    // }

    // test(id: number) {
    //   console.log('Clicked category id:', id);
    // }
}
