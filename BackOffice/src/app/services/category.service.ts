import { Injectable } from '@angular/core';
import { CategoryViewModel } from '../model/category/category-view-model.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSetting } from '../shared/common/app-setting';
import { CategoryUpdateRequest } from '../model/category/category-update-request.model';

@Injectable({
    providedIn: 'root'
  })
export class CategoryService {
    category: CategoryViewModel;
    list : CategoryViewModel[];

    constructor(private http: HttpClient) {
    
    }

    postCategory(categoryCreated: FormData) {
        
        return this.http.post(AppSetting.rootURL + '/Categories', categoryCreated);
    }

    putCategory(categoryUpdated: FormData) {
        
        return this.http.put(AppSetting.rootURL + '/Categories', categoryUpdated);
    }

    deleteCategory(id) {
    
        return this.http.delete(AppSetting.rootURL + '/Categories/'+ id);
    }

    refreshList(){
        this.http.get(AppSetting.rootURL + '/Categories')
        .toPromise()
        .then(res => this.list = res as CategoryViewModel[]);
      }

      List(){
        return this.http.get(AppSetting.rootURL + '/Categories');
    
      }

}