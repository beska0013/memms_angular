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
        this.srv.getListByFilter('CHAreaPaths',['ID','Title','CHPath'],500, `OrganizationId eq ${fm_data.OrganizationId}`),
        this.srv.getListByFilter('ProjectTags',['ID','Title'],500, `OrganizationId eq ${fm_data.OrganizationId}`),
        this.srv.getListByFilter('ProjectReviewContextTags',['ID','Title'],500, `OrganizationId eq ${fm_data.OrganizationId}`),
      ]).pipe(map((res:any) => ({
              form: fm_data,
              prjHumanRecource: res[0].value,
              statusReason: res[1].value,
              status: res[2].value,
              organizations: res[3].value,
              chAreaPath: res[4].value,
              projectTags: res[5].value,
              projectReviewContextTags: res[6].value
      })))
    ))
}
