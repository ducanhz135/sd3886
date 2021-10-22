import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductUpdateRequest } from '../../model/product-update-request.model';
import { ProductViewModel } from '../../model/product-view-model.model';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styles: [
    '.submit { display:inline; }',
    '.cancel { display:inline; }',
    'inline { text-align:center; }'
  ]
})
export class ProductUpdateComponent implements OnInit {

  public updatedForm: FormGroup;
  // productUpdated: ProductUpdateRequest;
  public product: ProductViewModel;
  selectedFile: File = null;
  formData:FormData;
  
  imageUrl: string = "/assets/img/default-image.png";
 

  constructor(private service: ProductService, 
    private fb: FormBuilder, 
    private router: Router,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    private toastr: ToastrService) { 

    this.product = this.service.product;

    this.updatedForm = this.fb.group({
      Id:[this.product.Id],
      Name: [this.product.Name, [Validators.required]],
      Description: [this.product.Description],
      Details: [this.product.Details],
      SeoDescription: [this.product.SeoDescription],
      SeoTitle: [this.product.SeoTitle],
      SeoAlias: [this.product.SeoAlias],
      LanguageId: [this.product.LanguageId, [Validators.required]],
      ThumbnailImage: [null],
        
    });

    // this.resetUpdatedForm();
  }

  ngOnInit(): void {
  }

  resetUpdatedForm() {


    this.updatedForm.markAsPristine();
    this.updatedForm.markAsUntouched();
    this.updatedForm.reset(this.updatedForm.value);

  }

  onUpdateSubmit() {
    this.formData = new FormData();
    this.formData.append("Id",this.updatedForm.controls['Id'].value );
    
    this.formData.append("Name", this.updatedForm.controls['Name'].value);
    this.formData.append("Description", this.updatedForm.controls['Description'].value);
    this.formData.append("Details", this.updatedForm.controls['Details'].value);
    this.formData.append("SeoDescription", this.updatedForm.controls['SeoDescription'].value);
    this.formData.append("SeoTitle", this.updatedForm.controls['SeoTitle'].value);
    this.formData.append("SeoAlias", this.updatedForm.controls['SeoAlias'].value);
    this.formData.append("LanguageId", this.updatedForm.controls['LanguageId'].value);
    this.formData.append("ThumbnailImage", this.selectedFile, this.selectedFile.name);
    
    
    this.service.putPaymentDetail(this.formData).subscribe(
      res => {
        this.updatedForm.reset();
        this.toastr.info('Submitted successfully', 'Payment Detail Register');
        this.service.refreshList();
        this.router.navigateByUrl('/product');
      },
      err => {
        console.log(err);
      }
    )


      // this.updateRecord();
  }

  public doSomething(value: any):void {
    
    // this.createdForm.controls['Rate'].value();
    this.updatedForm.patchValue({
      Rate: value,
    });
  }

  onFileSelected(event){
    let image = <File>event.target.files[0];

    this.ng2ImgMax.resizeImage(image, 250, 200).subscribe(
      result => {
        
        this.selectedFile = new File([result], result.name);

        //Show image preview
        var reader = new FileReader();
        reader.onload = (event:any) => {
         this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.selectedFile);
      },
      error => {
        console.log('err!', error);
      }
    );
    

  }

}
