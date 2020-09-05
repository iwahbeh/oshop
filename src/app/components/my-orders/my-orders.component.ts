import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

    authService.user$.subscribe(user => this.orders$  = orderService.getOrdersByUser(user.uid));
    }
}
