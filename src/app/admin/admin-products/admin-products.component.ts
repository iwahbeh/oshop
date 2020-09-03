import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { Product } from './../../models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFormComponent } from '../product-form/product-form.component';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(productService: ProductService) {
    this.subscription = productService.getAll().subscribe(res => {
      this.filteredProducts = this.products = res;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.title.toLowerCase().includes(filter) || data.price.toString().toLowerCase().includes(filter);
      };
      this.applyFilter();

    });

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    // this.filteredProducts = (query)?
    // this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
    // this.products
  }


  ngOnInit(): void {

    // 
  }
  displayedColumns: string[] = ['title', 'price', 'edit'];

  applyFilter(event?: Event) {
   let  filterValue:string;
    if (event)
     filterValue = (event.target as HTMLInputElement).value;
  else
  filterValue=(<HTMLInputElement>document.getElementById('input')).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  /** Builds and returns a new User. */
  createNewUser(id: number): UserData {
    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  }
}
