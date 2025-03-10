import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category/category.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  showCategories:any[]=[];

  product$:Observable<any>;

  constructor(private productSrv:CategoryService){
  
    this.product$ = this.productSrv.getAllCategory().pipe(
      map((item:any)=>{
        return item.data;
      })
    )
  }

  ngOnInit(): void {
    // this.showCategory();
  }
  // showCategory() {
  //   this.productSrv.getAllCategory().subscribe((res: any) => {
  //     this.showCategories = res.data;
  //   });
  // }

}
