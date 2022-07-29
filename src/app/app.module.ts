import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Observable, tap } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

import { IMenu } from './core/interfaces/menu.interface';
import { AuthService } from './auth/auth.service';
import { MenuService } from './core/services/menu.service';

import { AppComponent } from './app.component';

const USERNAME = process.env['USERNAME']!;
const PASSWORD = process.env['PASSWORD']!;

function authLogin(auth: AuthService): () => Observable<any> {
  return () => auth.login(USERNAME, PASSWORD);
}

function menuLoader(
  http: HttpClient,
  menuService: MenuService
): () => Observable<any> {
  return () =>
    http.get<{ data: Array<IMenu> }>('assets/json/menu.json').pipe(
      tap(({ data }) => {
        menuService.setMenuItems(data);
      })
    );
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // app modules
    AppRoutingModule,
    LayoutModule,
    SharedModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: authLogin,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: menuLoader,
      deps: [HttpClient, MenuService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
