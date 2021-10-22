import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductViewModel } from '../model/product-view-model.model';
import { ProductCreatedRequest } from '../model/product-created-request.model';
import { ProductUpdateRequest } from '../model/product-update-request.model';
import { FormGroup } from '@angular/forms';
import { AppSetting } from '../shared/common/app-setting';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: ProductViewModel;
  
  // createdForm: FormGroup;
  // updatedForm: FormGroup;
  

  list : ProductViewModel[];


  constructor(private http: HttpClient) {
    
   }

  postPaymentDetail(productCreated: FormData) {

    const headers = new HttpHeaders().append('Content-Disposition', 'mulipart/form-data');

    return this.http.post(AppSetting.rootURL + '/Products', productCreated, {headers: headers});
  }

  putPaymentDetail(productUpdated: FormData) {
    
    const headers = new HttpHeaders().append('Content-Disposition', 'mulipart/form-data');

    return this.http.put(AppSetting.rootURL + '/Products', productUpdated, {headers: headers});
  }

  deletePaymentDetail(id) {
    
    return this.http.delete(AppSetting.rootURL + '/Products/'+ id);
  }

  refreshList(){
    this.http.get(AppSetting.rootURL + '/Products')
    .toPromise()
    .then(res => this.list = res as ProductViewModel[]);
  }
}
