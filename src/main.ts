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
  const spForm = document.getElementById('aspnetForm');
  const body = document.body
  const S4_workspace = document.getElementById('s4-workspace');
  const S4_ribbonrow = document.getElementById('s4-ribbonrow');
  const S4_bodyContainer = document.getElementById('s4-bodyContainer');
  body.removeChild(spForm)
        // S4_workspace.removeChild(S4_bodyContainer);
        // S4_ribbonrow.style.display ='none';
        // S4_workspace.style.height = '100vh';
        // S4_workspace.style.padding = '0 2px';
        // S4_workspace.innerHTML +=`<div root></div>`;
  body.innerHTML +=`<div root class="rootEl"></div>`;
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err))
  return S4_workspace;
}
