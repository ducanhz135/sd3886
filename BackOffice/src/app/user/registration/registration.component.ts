import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { emailValidator, matchPassword } from 'src/app/shared/custom-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
    '.submit { display:inline; }',
    '.cancel { display:inline; }',
    '.help-block { padding-left: 17%; color: red; }',
  ]
})
export class RegistrationComponent implements OnInit {

  public registerForm: FormGroup;
  formData: FormData;

  formErrors = {
    'FirstName': '',
    'LastName': '',
    'Dob': '',
    'Email': '',
    'PhoneNumber': '',
    'UserName': '',
    'Password':'',
    'ConfirmPassword':'',
    'PasswordGroup':'',
  };

  validationMessages = {
    'FirstName': {
      'required': 'First Name is required.',
      'maxlength': 'First name can not over 200 characters.',
    },
    'LastName': {
      'required': 'Last Name is required.',
      'maxlength': 'Last name can not over 200 characters.',
    },
    'Email': {
      'required': 'Email is required.',
      'email': 'Wrong email format.',
    },
    'PhoneNumber': {
      'required': 'Phone Number is required.',
    },
    'UserName': {
      'required': 'User Name is required.',
    },
    'Password': {
      'required': 'Password is required.',
      'minlength': 'Password is at least 6 characters',
    },

    'ConfirmPassword': {
      'required': 'Confirm Password is required.',

    },
    'PasswordGroup': {
      'confirmPasswordMissMatch': 'Password and Confirm Password do not match'
    },

  };

  constructor(private service: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      FirstName: ["", [Validators.required, Validators.maxLength(200)]],
      LastName: ["", [Validators.required, Validators.maxLength(200)]],
      Dob: ["",[Validators.required]],
      Email: ["", [Validators.required, Validators.email]],
      PhoneNumber: ["", [Validators.required]],
      UserName: ["", [Validators.required]],
      PasswordGroup: this.fb.group({
        Password: ['', [Validators.required, Validators.minLength(6)]],
        ConfirmPassword: ['', [Validators.required]],
      }, { validator: matchPassword() }),
    });

    this.resetRegisterForm();

    this.registerForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.registerForm);
    });

  }



  resetRegisterForm() {
    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
    this.registerForm.reset(this.registerForm.value);

  }

  onRegisterSubmit() {


    this.formData = new FormData();
    this.formData.append("FirstName", this.registerForm.controls['FirstName'].value);
    this.formData.append("LastName", this.registerForm.controls['LastName'].value);
    this.formData.append("Dob", this.registerForm.controls['Dob'].value);
    this.formData.append("Email", this.registerForm.controls['Email'].value);
    this.formData.append("PhoneNumber", this.registerForm.controls['PhoneNumber'].value);
    this.formData.append("UserName", this.registerForm.controls['UserName'].value);
    this.formData.append("Password", (<FormGroup>this.registerForm.controls['PasswordGroup']).controls['Password'].value);
    this.formData.append("ConfirmPassword", (<FormGroup>this.registerForm.controls['PasswordGroup']).controls['ConfirmPassword'].value);

    this.service.postRegister(this.formData).subscribe(
      res => {
        this.registerForm.reset();

        this.toastr.success('Submitted successfully', 'New Account');
        
        this.router.navigateByUrl('/user/login');
      },
      err => {
        debugger;
        console.log(err);
      }
    )

  }




  logValidationErrors(group: FormGroup = this.registerForm): void {


    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
debugger;
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
