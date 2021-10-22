import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSetting } from '../shared/common/app-setting';
import { UserLogin } from '../model/user/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  postLogin(login: FormData) {
        
    return this.http.post(AppSetting.rootURL + '/Users/authenticate', login);
  }

  postRegister(register: FormData) {
        
    return this.http.post(AppSetting.rootURL + '/Users', register);
  }

  getUserProfile() {
        
    return this.http.get(AppSetting.rootURL + '/UserProfile');
  }

}
