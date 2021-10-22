import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CategoryViewModel } from '../../model/category/category-view-model.model';
import { Status } from '../../model/common/app-enums.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: [
    "./category-list.component.css",
  ]
})
export class CategoryListComponent implements OnInit {

  totalRecords: string;
  page:number=1;
  term:string;

  public StatusEnum = Status;

  constructor(
    public service: CategoryService, 
    private fb: FormBuilder, 
    public router: Router,
    private toastr: ToastrService
  ) { 
    // if (localStorage.getItem('token') == null)
    //   this.router.navigateByUrl('/user/login');

  }

  ngOnInit(): void {
    
    this.service.refreshList();
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
     
      this.service.deleteCategory(Id)
        .subscribe(res => {
          
          this.page = 1;
          this.service.refreshList();

          this.toastr.warning('Deleted successfully', 'Category '+Id);
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }

  onUpdate(catgory: CategoryViewModel) {
   
    this.service.category = catgory;
    this.router.navigateByUrl('/category/update/'+catgory.Id);
  }

}
