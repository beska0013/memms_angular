import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CustomFormComponent} from "./custom-form/custom-form.component";
import {NbDatepickerModule, NbThemeModule, NbTimepickerModule} from "@nebular/theme";
import {NbDateFnsDateModule} from "@nebular/date-fns";





@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CustomFormComponent,
    NbDateFnsDateModule.forRoot({ format: 'MM-dd-yyyy' }),
    NbDatepickerModule.forRoot(),
    NbThemeModule.forRoot(),
    NbTimepickerModule.forRoot(),
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
