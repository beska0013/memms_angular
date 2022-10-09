import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'general',
    pathMatch:'full'
  },
  {
    path:'general',
    loadComponent: () => import('./component/tabs/general/general.component').then(m => m.GeneralComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



