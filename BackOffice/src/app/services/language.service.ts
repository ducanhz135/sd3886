import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageViewModel } from '../model/language/language-view-model.model';
import { AppSetting } from '../shared/common/app-setting';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public list : LanguageViewModel[];
  defaultId: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  refreshList(){
    return this.http.get(AppSetting.rootURL + '/Languages');

  }
}
