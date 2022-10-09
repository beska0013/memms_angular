import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CustomFormComponent} from "./custom-form/custom-form.component";
import {NbDatepickerModule, NbThemeModule} from "@nebular/theme";




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CustomFormComponent,
    NbDatepickerModule.forRoot(),
    NbThemeModule.forRoot(),
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
