import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GeneralComponent} from "../../component/tabs/general/general.component";

const routes: Routes = [


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomFormRoutingModule { }
