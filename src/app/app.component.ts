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

  frequency = [
    'No Review',
    'Daily',
    'Week from now',
    'Weekly on',
    'Mon - Wed',
    'Tue - Thur',
    'Mon - Wed - Fri',
    'Month from now',
    'Monthly on',
    'Twice a month',
    'Two weeks from now',
    'Every two weeks on',
    'Every two months',
    'Quarterly',
    'Six months from now',
    'Twice a year on',
    'This day next year',
    'Yearly on',
    'Custom review date'
  ];



  customForm = this.srv.getForm()
    .pipe(switchMap((fm_data:any) => combineLatest([
        this.srv.getListByFilter('ProjectHumanResources', ['ID','Title'], 320, `OrganizationId eq ${fm_data.OrganizationId}`),
        this.srv.getListByFilter('ProjectStatusReason', ['ID','Title'], 10, `StatusId eq ${fm_data.StatusId}`),
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
