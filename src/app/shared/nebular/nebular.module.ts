import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
  NbTabsetModule,
  NbTagModule, NbTimepickerModule, NbTooltipModule
} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    NbSelectModule,
    NbLayoutModule,
    NbCardModule,
    NbSelectModule,
    NbLayoutModule,
    NbAutocompleteModule,
    NbInputModule,
    NbTagModule,
    NbEvaIconsModule,
    NbIconModule,
    NbFormFieldModule,
    NbButtonModule,
    NbTooltipModule,
    NbTimepickerModule
  ],
  providers:[NbTabsetModule]
})
export class NebularModule { }
