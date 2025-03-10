import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  isNewCardVisible: boolean = false;

  productObj: any = {
    productId: 0,
    productSku: '',
    productName: '',
    productPrice: 0,
    productShortName: '',
    productDescription: '',
    createdDate: new Date(),
    deliveryTimeSpan: '',
    categoryId: 0,
    productImageUrl: '',
    userId: 0,
  };

  categoryList: any[] = [];
  productsList: any[] = [];
  isLoading: boolean = true;

  constructor(private productSrv: ProductService) {}
  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProducts();
  }

  getAllCategory() {
    this.productSrv.getCategory().subscribe((res: any) => {
      this.categoryList = res.data;
    });
  }
  
  getAllProducts() {
    this.isLoading = true;
    this.productSrv.getProducts().subscribe((res: any) => {
      this.productsList = res.data.sort((a: any, b: any) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
      ;
      this.isLoading =false;
    });
  }

  visibleProducts = 12; // Initially display 4 products

  onSeeMore() {
    this.visibleProducts += 12; // Load 4 more products each time
  }

  onSave() {
    this.productSrv.saveProduct(this.productObj).subscribe((res: any) => {
      debugger;
      if (res.result) {
        alert('Product created');
        this.getAllProducts();
      } else {
        alert(res.message);
      }
    });
  }
  onUpdate() {
    this.productSrv.updateProduct(this.productObj).subscribe((res: any) => {
      debugger;
      if (res.result) {
        alert('Product Updated');
        this.getAllProducts();
      } else {
        alert(res.message);
      }
    });
  }

  onEdit(items: any) {
    this.productObj = items;
    this.showNewCard();
  }
  onDelete(item: any) {
    const isDelete = confirm('Are you wants to delete.');
    if (isDelete) {
      this.productSrv.deleteProduct(item.productId).subscribe((res: any) => {
        debugger;
        if (res.result) {
          alert('Product Deleted');
          this.getAllProducts();
        } else {
          alert(res.message);
        }
      });
    }
  }

  showNewCard() {
    this.isNewCardVisible = true;
  }
  closeNewCard() {
    this.isNewCardVisible = false;
  }
}
