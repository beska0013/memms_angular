import {Component} from '@angular/core';
import {AppService} from "./app.service";
import {combineLatest, map,  switchMap} from "rxjs";

@Component({
  selector: '[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'memms_angular';

  constructor(private srv:AppService) {}





  customForm = this.srv.getForm()
    .pipe(switchMap((fm_data:any) => combineLatest([
        this.srv.getListByFilter('ProjectHumanResources', ['ID','Title'], 320, `OrganizationId eq ${fm_data.OrganizationId}`),
        this.srv.getAllListItems('ProjectStatusReason', ['ID','Title','StatusId']),
        this.srv.getAllListItems('ProjectStatus',['ID','Title']),
        this.srv.getAllListItems('ProjectOrganization',['ID','Title']),
      ]).pipe(map((res:any) => ({
              form: fm_data,
              prjHumanRecource: res[0].value,
              statusReason: res[1].value,
              status: res[2].value,
              organizations: res[3].value,
      })))
    ))
}
