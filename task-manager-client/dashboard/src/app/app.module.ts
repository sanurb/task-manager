import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ClipboardModule } from 'ngx-clipboard';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
// #fake-end#
import { HotToastModule } from '@ngneat/hot-toast';
import { environment } from '../environments/environment';
import { RemoteEntryModule } from './remote-entry/entry.module';
import { RouterModule } from '@angular/router';

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    InlineSVGModule.forRoot(),
    NgbModule,
    HotToastModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./remote-entry/entry.module').then(
              (m) => m.RemoteEntryModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
