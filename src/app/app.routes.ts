import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { LandingComponent } from './website/landing/landing.component';
import { ShopComponent } from './website/shop/shop.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch:'full'
    },
    {
        path: 'login',
        component:LoginComponent
    },
    {
        path: 'home',
        component:LandingComponent
    },
    {
        path: 'shop',
        component:ShopComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'products',
                component:ProductsComponent
            },
            {
                path:'category',
                component: CategoriesComponent
            }
        ]

    }
];
