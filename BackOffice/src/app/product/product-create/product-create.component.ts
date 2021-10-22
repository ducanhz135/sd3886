import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../../services/language.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageViewModel } from '../../model/language/language-view-model.model';
import { forbiddenNameValidator, matchName, fileExtensionValidator } from '../../shared/custom-validator';
import { CategoryService } from 'src/app/services/category.service';



@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styles: [
    '.submit { display:inline; padding-left: 20px;}',
    '.cancel { display:inline; }',
    'inline { text-align:center; }',
    '.help-block { padding-left: 17%; color: red; }',
  ]
})
export class ProductCreateComponent implements OnInit {
  languages = [];
  categories = [];
  defaultId: string;
  categoryId: number;
  public createdForm: FormGroup;
  // productCreated: ProductCreatedRequest;
  selectedFile: File = null;
  formData: FormData;
  // files: Array<any> = new Array<any>();
  imageUrl: string = "/assets/img/default-image.png";

  formErrors = {
    'Price': '',
    'OriginalPrice': '',
    'Stock': '',
    'Name': '',
    'SeoAlias': '',
    'NameGroup': '',
    'ThumbnailImage':'',
  };

  validationMessages = {
    'Price': {
      'required': 'Price is required.',
      'min': 'Price must be greater than 0.',
    },
    'OriginalPrice': {
      'required': 'Original Price is required.',
      'min': 'Original Price must be greater than 0.',
    },
    'Stock': {
      'required': 'Stock Price is required.',
      'min': 'Stock must be greater than 0.',
    },
    'Name': {
      'required': 'Name is required.',
      'minlength': 'Name must be greater than 2 characters.',
      'maxlength': 'Name must be less than 10 characters',
      'forbiddenName': 'this name is forbidden'
    },
    //  'Email' :{
    //    'required': 'Email is required.',
    //    'emailDomain':'Email domain should be sora.com'
    //  },
    //  'ConfirmEmail' :{
    //    'required': 'Confirm Email is required.',
    //    'emailDomain':'Confirm Email domain should be sora.com'
    //  },
    'SeoAlias': {
      'required': 'Seo Alias Email is required.',

    },
    'NameGroup': {
      'nameMissMatch': 'Name and Seo Alias do not match'
    },
    'ThumbnailImage': {
      'required': 'file is required.',
      'inValidExt': 'Invalid file Extension.',
    },
  };


  constructor(private service: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    public languageService: LanguageService,
    private toastr: ToastrService,
    public categoryService: CategoryService) {

      

  }

  ngOnInit(): void {
    this.createdForm = this.fb.group({
      Price: [0, [Validators.required, Validators.min(0)]],
      OriginalPrice: [0, [Validators.required, Validators.min(0)]],
      Stock: [0, [Validators.required, Validators.min(0)]],

      NameGroup: this.fb.group({
        Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10), forbiddenNameValidator()]],
        SeoAlias: ['', [Validators.required]],
      }, { validator: matchName() }),

      Description: [''],
      Details: [''],
      SeoDescription: [''],
      SeoTitle: [''],
      CategoryId: [0],
      LanguageId: ['', [Validators.required]],
      Rate: [0, [Validators.required]],
      ThumbnailImage: ['',[Validators.required, fileExtensionValidator('jpg, png, wav, mp4')]],
    });

    this.resetCreatedForm();

    this.languageService.refreshList().subscribe((data: any[]) => {
      this.languages = data;
      this.defaultId = data.filter(x => x.IsDefault == true)[0].Id;
      this.createdForm.patchValue({ LanguageId: [this.defaultId] });
    });

    this.categoryService.List().subscribe((data: any[]) => {
      this.categories = data;
      this.categoryId = data[0].Id;
      this.createdForm.patchValue({ CategoryId: [this.categoryId] });
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


    this.formData = new FormData();
    this.formData.append("Price", this.createdForm.controls['Price'].value);
    this.formData.append("OriginalPrice", this.createdForm.controls['OriginalPrice'].value);
    this.formData.append("Stock", this.createdForm.controls['Stock'].value);
    this.formData.append("Name", (<FormGroup>this.createdForm.controls['NameGroup']).controls['Name'].value);
    this.formData.append("Description", this.createdForm.controls['Description'].value);
    this.formData.append("Details", this.createdForm.controls['Details'].value);
    this.formData.append("SeoDescription", this.createdForm.controls['SeoDescription'].value);
    this.formData.append("SeoTitle", this.createdForm.controls['SeoTitle'].value);
    this.formData.append("SeoAlias", (<FormGroup>this.createdForm.controls['NameGroup']).controls['SeoAlias'].value);
    this.formData.append("LanguageId", this.createdForm.controls['LanguageId'].value);
    this.formData.append("CategoryId", this.createdForm.controls['CategoryId'].value);
    this.formData.append("Rate", this.createdForm.controls['Rate'].value);
    this.formData.append("ThumbnailImage", this.selectedFile, this.selectedFile?this.selectedFile.name:'');

    // console.log(this.formData);
    this.service.postPaymentDetail(this.formData).subscribe(
      res => {
        this.createdForm.reset();

        this.toastr.success('Submitted successfully', 'New Product');
        this.service.refreshList();
        this.router.navigateByUrl('/product');
      },
      err => {
        debugger;
        console.log(err);
      }
    )

  }

  public doSomething(value: any): void {

    // this.createdForm.controls['Rate'].value();
    this.createdForm.patchValue({
      Rate: value,
    });
  }

  onFileSelected(event) {

    let image = <File>event.target.files[0];

    this.ng2ImgMax.resizeImage(image, 250, 200).subscribe(
      result => {

        this.selectedFile = new File([result], result.name);

        //Show image preview
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.selectedFile);
      },
      error => {
        console.log('err!', error);
      }
    );
    // this.files.push({ data: this.selectedFile, fileName: this.selectedFile.name });
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
