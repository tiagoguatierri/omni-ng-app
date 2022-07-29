// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';

// customer modules
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../../shared/shared.module';

// components
import { CustomerComponent } from './customer.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';

@NgModule({
  declarations: [
    CustomerComponent,
    AddCustomerComponent,
    ListCustomerComponent,
  ],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // angular material
    MaterialModule,
    // customer
    CustomerRoutingModule,
    SharedModule,
  ],
})
export class CustomerModule {}
