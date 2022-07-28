// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

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
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    // customer
    CustomerRoutingModule,
    SharedModule,
  ],
})
export class CustomerModule {}
