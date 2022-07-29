import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCustomerComponent } from './add-customer.component';
import { ApiService } from '../../../../core/services/api.service';

import { render, screen } from '@testing-library/angular';

import userEvent from '@testing-library/user-event';

const getSubmitButton = () => screen.getByTestId('submit') as HTMLButtonElement;
const getDeleteButton = () => screen.getByTestId('delete') as HTMLButtonElement;
const getInputName = () => screen.getByTestId('inputName') as HTMLInputElement;

describe('AddCustomerComponent', () => {
  const apiServiceSpy = jasmine.createSpyObj<ApiService>('ApiService', [
    'post',
    'put',
    'delete',
    'get',
  ]);

  beforeEach(async () => {
    await render(AddCustomerComponent, {
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
      imports: [FormsModule, ReactiveFormsModule],
    });
  });

  it('when user submit form', () => {
    userEvent.type(getInputName(), 'any_text');
    userEvent.click(getSubmitButton());

    expect(apiServiceSpy.post).toHaveBeenCalledTimes(1)
  })
});
