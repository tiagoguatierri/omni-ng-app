import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [SafePipe],
  imports: [CommonModule],
  exports: [SafePipe],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
