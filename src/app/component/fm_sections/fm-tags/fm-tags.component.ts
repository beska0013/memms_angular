import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnInit, Output,
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
  @Output() searchScopeOutput = new EventEmitter<{orgId:number, title: string}>();

  @Input() taglist:any[];
  @Input() initialValues:{ids:string, members:string}

  onSearchScopeChange(event) {

    const chosenOrg = this.organizations.find(item => item.ID === event.value);

    //console.log(chosenOrgId);
    this.$taglistItems = this.srv.getListByFilter(this.listName, ['ID', 'Title'], 500, `OrganizationId eq ${chosenOrg.ID}`)
      .pipe(map(res => {
        // console.log('tags',res);
        this.cdr.markForCheck();
        return res['value']
      }));
  }

  onTagValueChange(tagList){
    const tags = tagList.reverse()
      .reduce((acc, t)=> acc.ids ?
                  { ids: `${acc.ids}|${t.ID}` , title: `${acc.title}|${t.Title}`} :
                  { ids: `${t.ID}` , title: `${t.Title}` }, {})
    console.log(tags);
  }


  ngOnInit(): void {
   // this.$taglistItems = of(this.taglist);

  }

}
