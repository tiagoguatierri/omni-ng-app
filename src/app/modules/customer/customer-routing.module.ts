// Angula modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CustomerComponent } from './customer.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'add',
        component: AddCustomerComponent,
      },
      {
        path: 'list',
        component: ListCustomerComponent,
      },
      {
        path: 'edit/:id',
        component: AddCustomerComponent,
      },

      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },

      {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
