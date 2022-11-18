import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {initPrjUtility} from "../prjUtility";

if (environment.production) {
  enableProdMode();
}

initApp()


function initApp(){
 return _spPageContextInfo.serverRequestPath.includes('EditForm.aspx') ?
    initForm() :
    initPrjUtility();
}


function initForm(){
  const body = document.body
  const spForm = document.getElementById('aspnetForm');
  spForm.style.display ='none';
  body.innerHTML +=`<div root class="rootEl"></div>`;
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err))
  // return S4_workspace;
}
