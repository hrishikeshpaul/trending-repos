import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import {HttpClientModule} from '@angular/common/http';

import { RepoState } from './store/repo.state';

import { ListComponent } from './components/list/list.component';
import { RepoCardComponent } from './components/repo-card/repo-card.component';
import { ErrorComponent } from './components/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    RepoCardComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([RepoState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
