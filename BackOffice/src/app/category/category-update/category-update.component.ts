import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryViewModel } from '../../model/category/category-view-model.model';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryUpdateRequest } from '../../model/category/category-update-request.model';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styles: [
    '.submit { display:inline; }',
    '.cancel { display:inline; }',
    'inline { text-align:center; }'
  ]
})
export class CategoryUpdateComponent implements OnInit {

  public updatedCategoryForm: FormGroup;
  public category: CategoryViewModel;
  formData:FormData;

  constructor(
    private service: CategoryService, 
    private fb: FormBuilder, 
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.category = this.service.category;

    this.updatedCategoryForm = this.fb.group({
      Id:[this.category.Id],
      Name: [this.category.Name, [Validators.required]],
      SeoDescription: [this.category.SeoDescription],
      SeoTitle: [this.category.SeoTitle],
      SeoAlias: [this.category.SeoAlias],
      LanguageId: [this.category.LanguageId],
      
        
    });
  }

  ngOnInit(): void {
  }

  resetUpdatedForm() {
    this.updatedCategoryForm.markAsPristine();
    this.updatedCategoryForm.markAsUntouched();
    this.updatedCategoryForm.reset(this.updatedCategoryForm.value);

  }

  onUpdateSubmit() {
    this.formData = new FormData();
    this.formData.append("Id",this.updatedCategoryForm.controls['Id'].value );
    
    this.formData.append("Name", this.updatedCategoryForm.controls['Name'].value);
    this.formData.append("SeoDescription", this.updatedCategoryForm.controls['SeoDescription'].value);
    this.formData.append("SeoTitle", this.updatedCategoryForm.controls['SeoTitle'].value);
    this.formData.append("SeoAlias", this.updatedCategoryForm.controls['SeoAlias'].value);

    this.formData.append("LanguageId", this.updatedCategoryForm.controls['LanguageId'].value);
    
    
    this.service.putCategory(this.formData).subscribe(
      res => {
        this.updatedCategoryForm.reset();
        this.toastr.info('Submitted successfully', 'Category Register');
        this.service.refreshList();
        this.router.navigateByUrl('/category');
      },
      err => {
        console.log(err);
      }
    )

  }





}
