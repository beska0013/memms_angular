import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {SearchableDropdownComponent} from "../../component-ui/searchable-dropdown/searchable-dropdown.component";
import {map, Observable, of} from "rxjs";
import {AppService} from "../../../app.service";

@Component({
  selector: 'app-fm-area',
  standalone: true,
  imports: [CommonModule, NebularModule, ReactiveFormsModule, SearchableDropdownComponent],
  templateUrl: './fm-area.component.html',
  styleUrls: ['./fm-area.component.scss']
})
export class FmAreaComponent implements OnInit {

  constructor(private srv:AppService) { }

  @Input() organizations!:any;
  @Input() areaPathList!:any;
  @Input() areaFmControl!:any;
  @Input() searchScope!:any;
  @Input() labelFor!:any;
  @Input() listName!:any;

  $areaListItems:Observable<any>;
  CHAreaPath = 'CHOrganizationBoundShadow:CH1BoundShadow:CH2BoundShadow:CH3BoundShadow:CH4BoundShadow:CH5BoundShadow:CH6BoundShadow:CH7BoundShadow:CH8BoundShadow:CH9BoundShadow:CH10BoundShadow'

  onFieldChange(event){
    //TODO fix firing event on first time
    const chosenCh = this.areaPathList.find(item => item.ID === event.value)
    console.log('onFieldChange',chosenCh);

  }

  onSearchScopeChange(event){

    const chosenOrgId = this.organizations.find(item => item.ID === event.value).ID;
    //TODO fix search scope effect on area list
    // this.$areaListItems = this.srv.getListByFilter(this.listName,['ID','Title','CHPath'],500, `OrganizationId eq ${chosenOrgId}`)
    //                         .pipe(map( res => res['value']))
  }



  ngOnInit(): void {

    this.$areaListItems = of(this.areaPathList)
  }

}
