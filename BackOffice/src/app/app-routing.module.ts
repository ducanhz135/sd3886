import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HeroesComponent } from './heroes/heroes.component';
import { ProductComponent } from "./product/product.component";
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  //  {path:'',component: ProductComponent,pathMatch:'full'},
  { path: '',   redirectTo: '/product', pathMatch: 'full' },
   {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent, canActivateChild:[AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path:'product',component:ProductComponent,canActivate:[AuthGuard],
    children:[
      {path:'',component:ProductListComponent},
      {path:'add',component:ProductCreateComponent},
      {path:'list',component:ProductListComponent},
      {path:'update/:Id',component:ProductUpdateComponent},
    ]
  },
  {
    path:'category',component:CategoryComponent,canActivate:[AuthGuard],
    children:[
      {path:'',component:CategoryListComponent},
      {path:'add',component:CategoryCreateComponent},
      {path:'list',component:CategoryListComponent},
      {path:'update/:Id',component:CategoryUpdateComponent},
    ]
  },
  {
    path:'user-profile',component:UserProfileComponent,canActivate:[AuthGuard]
    
  },
  { path: '**', component: ProductListComponent,canActivate:[AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }