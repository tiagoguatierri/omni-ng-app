import Swal from 'sweetalert2';
import Inputmask from 'inputmask';

import {
  Observable,
  Subscription,
  switchMap,
  tap,
  BehaviorSubject,
} from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {
  ApiService,
  resolvePath,
} from './../../../../core/services/api.service';
import { Customer } from '../../models/customer.model';

const CLASS_NAME = 'Customer';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCustomerComponent implements OnInit, OnDestroy {
  customers$!: Observable<Customer[]>;
  displayedColumns!: string[];
  loading = true;

  private tableReload = new BehaviorSubject<boolean>(false);
  private subscriptions = new Array<Subscription>();

  constructor(cdr: ChangeDetectorRef, private api: ApiService) {
    this.customers$ = this.tableReload.asObservable().pipe(
      switchMap(() =>
        api.get<Customer>(resolvePath(CLASS_NAME)).pipe(
          tap(() => {
            setTimeout(() => {
              this.loading = false;
              // ** markForCheck to hidden spinner because change detection strategy is OnPush
              cdr.markForCheck();
            }, 300);
          })
        )
      )
    );

    this.displayedColumns = ['fullName', 'phoneNumber', 'email', 'actions'];
  }

  reload(): void {
    this.tableReload.next(!this.tableReload.value);
  }

  deleteCustomer(customer: Customer): void {
    Swal.fire({
      title: 'Atenção! Essa ação é irreverssível.',
      html: `Tem certeza que deseja excluir <strong>${
        customer.fullName || 'O CLIENTE'
      }</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim',
    }).then((res) => {
      if (res.isConfirmed) {
        this.loading = true;
        this.subscriptions.push(
          this.api
            .delete(resolvePath(CLASS_NAME, customer.objectId))
            .subscribe(() => {
              this.reload();
            })
        );
      }
    });
  }

  getValue(prop: keyof Customer, customer: Customer) {
    return customer[prop]
      ? customer[prop]
      : '<i style="opacity:0.5;font-size:12px">Não informado</i>';
  }

  getFormatedPhoneNumber(customer: Customer) {
    if (customer.phoneAreaCode && customer.phoneNumber) {
      return Inputmask.format(
        customer.phoneAreaCode.concat(customer.phoneNumber),
        { mask: ['(99) 9999-9999', '(99) 99999-9999'] }
      );
    }
    return '<i style="opacity:0.5;font-size:12px">Não informado</i>';
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
