import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductViewModel } from '../../model/product-view-model.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [
    './product-list.component.css'
  ]
})
export class ProductListComponent implements OnInit {

  totalRecords: string;
  page:number=1;
  term:string;
  constructor(
    public service: ProductService, 
    private fb: FormBuilder, 
    public router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
   
    this.service.refreshList();
    
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
     
      this.service.deletePaymentDetail(Id)
        .subscribe(res => {
          
          this.page = 1;
          this.service.refreshList();

          this.toastr.warning('Deleted successfully', 'Product'+Id);
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }
  
  onUpdate(product: ProductViewModel) {
   
    this.service.product = product;
    this.router.navigateByUrl('/product/update/'+product.Id);
  }

}
