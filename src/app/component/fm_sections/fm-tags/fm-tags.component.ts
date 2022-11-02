import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {AppService} from "../../../app.service";
import {SearchableDropdownComponent} from "../../component-ui/searchable-dropdown/searchable-dropdown.component";
import {TagUiComponent} from "../../component-ui/tag-ui/tag-ui.component";
import {map, Observable, of} from "rxjs";



@Component({
  selector: 'app-fm-tags',
  standalone: true,
  imports: [CommonModule, NebularModule, ReactiveFormsModule, FormsModule, SearchableDropdownComponent, TagUiComponent],
  templateUrl: './fm-tags.component.html',
  styleUrls: ['./fm-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FmTagsComponent implements OnInit {

  constructor(private srv:AppService, private cdr:ChangeDetectorRef) { }
  @Input() status:string
  @Input() sectionTitle:string
  @Input() organizations!:any;
  @Input() searchScope!:any;
  @Input() listName!:any;
  @Input() labelFor:string;

  $taglistItems:Observable<any>


  @Input() taglist:any[];
  @Input() initialValues:{ids:string, members:string};

  onSearchScopeChange(event){
    const chosenOrgId = this.organizations.find(item => item.ID === event.value).ID;
    //console.log(event);
    //console.log(chosenOrgId);
    this.$taglistItems =  this.srv.getListByFilter(this.listName,['ID','Title'],500, `OrganizationId eq ${chosenOrgId}`)
                          .pipe(map( res => {
                            // console.log('tags',res);
                            this.cdr.markForCheck();
                            return  res['value']
                          }))
  }


  ngOnInit(): void {
   // this.$taglistItems = of(this.taglist);

  }

}
