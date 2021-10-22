import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ToastrService } from 'ngx-toastr';
import { forbiddenNameValidator } from '../../shared/custom-validator';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styles: [
    '.submit { display:inline; }',
    '.cancel { display:inline; }',
    'inline { text-align:center; }',
    '.help-block { padding-left: 17%; color: red; }',
  ]
})
export class CategoryCreateComponent implements OnInit {
  languages = [];
  defaultId: string;
  public createdForm: FormGroup;

  formData: FormData;

  formErrors = {
    'SortOrder': '',
    'IsShowOnHome': '',
    // 'Status': '',
    'Name': '',
    'SeoTitle':'',
    'LanguageId':'',
    'SeoAlias':'',
  };

  validationMessages = {
    'SortOrder': {
      'required': 'Price is required.',
      'min': 'Sort Order must be greater than 0.',
    },
    // 'Status': {
    //   'required': 'Stock Price is required.'
    // },
    'Name': {
      'required': 'Name is required.',
      'minlength': 'Name must be greater than 2 characters.',
      'maxlength': 'Name must be less than 10 characters',
      'forbiddenName': 'this name is forbidden'
    },
    'SeoAlias': {
      'required': 'Seo Alias Email is required.',

    },
  };

  constructor(public service: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    public languageService: LanguageService,
    private toastr: ToastrService) {

      this.service.refreshList();
     }

  ngOnInit(): void {
    
    
    this.createdForm = this.fb.group({
      SortOrder: [0, [Validators.required,, Validators.min(0)]],
      IsShowOnHome: [false],
      ParentId: ["0"],
      Status: ["1"],
      Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10), forbiddenNameValidator()]],
      SeoDescription: [''],
      SeoTitle: [''],
      LanguageId: [''],
      SeoAlias: ['', [Validators.required]],

    });
    this.resetCreatedForm();
    
    this.languageService.refreshList().subscribe((data: any[]) => {
      this.languages = data;
      this.defaultId = data.filter(x => x.IsDefault == true)[0].Id;
      this.createdForm.patchValue({ LanguageId: [this.defaultId] });
    });

    this.createdForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.createdForm);
    });

  }

  resetCreatedForm() {
    this.createdForm.markAsPristine();
    this.createdForm.markAsUntouched();
    this.createdForm.reset(this.createdForm.value);

  }

  onCreateSubmit() {

    let parentId = this.createdForm.controls['ParentId'].value;
    this.formData = new FormData();
    this.formData.append("SortOrder", this.createdForm.controls['SortOrder'].value);
    this.formData.append("IsShowOnHome", this.createdForm.controls['IsShowOnHome'].value);
    this.formData.append("ParentId", parentId == "0" ? "" : parentId );
    this.formData.append("Status", this.createdForm.controls['Status'].value);
    this.formData.append("Name", this.createdForm.controls['Name'].value);
    this.formData.append("SeoDescription", this.createdForm.controls['SeoDescription'].value);
    this.formData.append("SeoTitle", this.createdForm.controls['SeoTitle'].value);
    this.formData.append("SeoAlias", this.createdForm.controls['SeoAlias'].value);
    this.formData.append("LanguageId", this.createdForm.controls['LanguageId'].value);
    
    this.service.postCategory(this.formData).subscribe(
      res => {
       
        this.createdForm.reset();

        this.toastr.success('Submitted successfully', 'New Category');
        this.service.refreshList();
        this.router.navigateByUrl('/category');
      },
      err => {
        debugger;
        console.log(err);
      }
    )

  }

  logValidationErrors(group: FormGroup = this.createdForm): void {


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
