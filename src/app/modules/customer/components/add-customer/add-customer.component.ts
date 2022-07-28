import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  catchError,
  filter,
  map,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

import {
  ApiService,
  resolvePath,
} from './../../../../core/services/api.service';
import { Customer } from '../../models/customer.model';

import Inputmask from 'inputmask';
import Swal from 'sweetalert2';

const CLASS_NAME = 'Customer';

/**
 * Refact
 * Create a dedicated CustomerService
 */
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    fullName: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    phoneAreaCode: new FormControl('', Validators.minLength(2)),
    phoneNumber: new FormControl(''),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
  });

  customerId: string | null | undefined = undefined;
  loading = false;
  subscriptions = new Array<Subscription>();

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // helper to access form control
  get f() {
    return this.form.controls;
  }

  deleteCustomer(): void {
    Swal.fire({
      title: 'Atenção! Essa ação é irreverssível.',
      html: `Tem certeza que deseja excluir <strong>${
        this.form.value.fullName || 'O CLIENTE'
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
            .delete<Customer>(resolvePath(CLASS_NAME, this.customerId))
            .subscribe(() => {
              this.form.reset();
              this.loading = false;

              Swal.fire('', 'Cliente excluido com sucesso!', 'success').then(
                () => {
                  // back to list
                  this.router.navigateByUrl('customer/list');
                }
              );
            })
        );
      }
    });
  }

  patchCustomer(partialCustomer: Partial<Customer>): void {
    this.customerId = partialCustomer.objectId;
    this.form.patchValue(partialCustomer);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.value as any;

    if (this.customerId) {
      // update
      this.subscriptions.push(
        this.api
          .put<Customer>(resolvePath(CLASS_NAME, this.customerId), values)
          .subscribe(() => {
            Swal.fire(
              '',
              'Os dados do cliente foram atualizados com sucesso',
              'success'
            ).then(() => {
              this.router.navigateByUrl('customer/list');
            });
          })
      );
    } else {
      // create
      this.subscriptions.push(
        this.api.post<Customer>(resolvePath(CLASS_NAME), values).subscribe(() => {
          Swal.fire('', 'Cliente cadastrado com sucesso!', 'success').then(
            () => {
              this.router.navigateByUrl('customer/list');
            }
          );
        })
      );
    }
  }

  ngOnInit(): void {
    // check if has id on router params and if has load customer by id
    this.subscriptions.push(
      this.route.paramMap
        .pipe(
          filter((params) => params.has('id')),
          tap(() => (this.loading = true)),
          map((params) => params.get('id')),
          switchMap((objectId) =>
            this.api
              .get<Customer>(resolvePath(CLASS_NAME), {
                limit: 1,
                where: { objectId },
              })
              .pipe(
                map((data) => (data.length > 0 ? data[0] : {})),
                catchError(() => of({}))
              )
          )
        )
        .subscribe((customer) => {
          this.loading = false;
          this.cdr.markForCheck();
          this.patchCustomer(customer);
        })
    );

    // Create a directive to use inputmask
    Inputmask({ autoUnmask: true }).mask(document.querySelectorAll('input'));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
