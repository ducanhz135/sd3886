import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  formData:FormData;

  formErrors = {
    'UserName': '',
    'Password': '',
  };

  validationMessages = {
    'UserName': {
      'required': 'UserName is required.',
      
    },
    'Password': {
      'required': 'Password Price is required.'
    },
    
  };


  constructor(
    private service: UserService, 
    private fb: FormBuilder, 
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/product');

    this.loginForm = this.fb.group({
      UserName: ['',[Validators.required]],
      Password: ['',[Validators.required]],
      RememberMe: [false],
    });
  }

  onLoginSubmit() {
    
    this.formData = new FormData();
    this.formData.append("UserName",this.loginForm.controls['UserName'].value );
    
    this.formData.append("Password", this.loginForm.controls['Password'].value);
    this.formData.append("RememberMe", this.loginForm.controls['RememberMe'].value);
    
    this.service.postLogin(this.formData).subscribe(
      (res: any) => {

        localStorage.setItem('token', res.result);
        this.loginForm.reset();
        // this.toastr.info('Submitted successfully', 'Category Register');
        
        this.router.navigateByUrl('/product');
      },
      err => {
        
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
      }
    )


    this.loginForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.loginForm);
    });
  }

  logValidationErrors(group: FormGroup = this.loginForm): void {


    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);

      }
    });

  }

}
