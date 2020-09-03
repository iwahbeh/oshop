import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Observable } from 'rxjs';
import { ProductService } from '../../shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any>;
  product = {} as any;
  id;
  constructor(private categoryService: CategoryService, private productService: ProductService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.get(this.id)
      .subscribe(p => {
        this.product = p; console.log(this.product);
      }
      )
  }

  save(product) {
    if (this.id)
      this.productService.update(this.id,product);
      else{
    this.productService.create(product);
      }
    this.router.navigate(['/admin/products'])

  }
  delete(){
    if(!confirm('Are you sure you want to dlete this product?'))
     return ;

      this.productService.delete(this.id);
      this.router.navigate(['/admin/products'])
    
  }

}
