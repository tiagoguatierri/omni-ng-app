import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from './../../../../material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './../../../../core/services/api.service';
import {
  createRoutingFactory,
  SpectatorRouting,
  SpyObject,
} from '@ngneat/spectator';
import { AddCustomerComponent } from './add-customer.component';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('AddCustomerComponent', () => {
  let component: AddCustomerComponent;
  let fixture: ComponentFixture<AddCustomerComponent>;
  let spectator: SpectatorRouting<AddCustomerComponent>;

  const apiServiceSpy: SpyObject<ApiService> = jasmine.createSpyObj(
    'ApiService',
    ['post', 'put', 'delete', 'get']
  );

  const routerSpy: SpyObject<Router> = jasmine.createSpyObj('Router', [
    'navigateByUrl',
  ]);

  const createComponent = createRoutingFactory({
    component: AddCustomerComponent,
    imports: [MaterialModule, HttpClientTestingModule, RouterTestingModule],
    providers: [
      {
        provider: ApiService,
        useValue: apiServiceSpy,
      },
      {
        provider: Router,
        useValue: routerSpy,
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    fixture = spectator.fixture;
  });

  describe('whitout route params', () => {
    it('only mount component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('when has id on route params', () => {
    it('should call api to get customer by id and patch customer form', fakeAsync(() => {
      // need for ngOnInit
      spectator.detectChanges();
      spectator.setRouteParam('id', '123');

      // await observable resolve
      tick();

      apiServiceSpy.get.and.returnValue({});

      spyOn(component, 'patchCustomer').and.callThrough();
      apiServiceSpy.get({});

      component.patchCustomer({
        fullName: 'teste',
      });

      expect(apiServiceSpy.get).toHaveBeenCalled();
      expect(component.patchCustomer).toHaveBeenCalled();
      expect(component.form.get('fullName')).not.toBeEmpty();
    }));

    it('expect delete button is enabled', fakeAsync(() => {
      // need for ngOnInit
      spectator.detectChanges();

      // await observable resolve
      tick();

      component.customerId = '123';
      // to update button state
      spectator.detectChanges();

      const deleteButton = spectator.query<HTMLButtonElement>('#deleteButton')!;

      expect(deleteButton.disabled).toBeFalse();
    }));
  });

  describe('when submit a form', () => {
    it('if customeId has value defined, shuold update customer', () => {
      component.customerId = '123';

      apiServiceSpy.put({});
      routerSpy.navigateByUrl('');

      spyOn(component, 'onSubmit').and.callThrough();

      component.onSubmit();

      expect(apiServiceSpy.put).toHaveBeenCalled();
      expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    });

    it('if customeId is empty, shuold create customer', () => {
      apiServiceSpy.post({});
      routerSpy.navigateByUrl('');

      spyOn(component, 'onSubmit').and.callThrough();

      component.onSubmit();

      expect(apiServiceSpy.post).toHaveBeenCalled();
      expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    });
  });
});
