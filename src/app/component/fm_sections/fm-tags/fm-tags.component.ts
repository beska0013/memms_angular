import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input, OnDestroy,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {AppService} from "../../../app.service";
import {SearchableDropdownComponent} from "../../component-ui/searchable-dropdown/searchable-dropdown.component";
import {TagUiComponent} from "../../component-ui/tag-ui/tag-ui.component";
import {EMPTY, map, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {CustomFormService} from "../../../custom-form/custom-form.service";



@Component({
  selector: 'app-fm-tags',
  standalone: true,
  imports: [CommonModule, NebularModule, ReactiveFormsModule, FormsModule, SearchableDropdownComponent, TagUiComponent],
  templateUrl: './fm-tags.component.html',
  styleUrls: ['./fm-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FmTagsComponent implements OnInit, OnDestroy {

  constructor(
    private appSrv:AppService,
    private cdr:ChangeDetectorRef,
    private customFmSrv: CustomFormService,
  ) { }
  @Input() status:string
  @Input() sectionTitle:string
  @Input() organizations!:any;
  @Input() searchScope!:any;
  @Input() listName!:any;
  @Input() labelFor:string;
  @Input() dataTypes: {ids:string, value:string};

  disabled = false;
  tooltip:string;

  sectionLock = this.customFmSrv.SeessionLogFieldTypes()
    .pipe(
      map(res => res.find(item => item.Field_type === this.listName && item?.sessionId !== this.appSrv.getSessionId())),
      switchMap( res => !!res ? this.lockSection(res) : this.unlockSection())
    )
  sectuionLockSubscription$:Subscription

  $taglistItems:Observable<any>
  @Output() searchScopeOutput = new EventEmitter<{orgId:number, title: string}>();

  @Input() taglist:any[];
  @Input() initialValues:{ids:string, members:string}

  onSearchScopeChange(event) {
    const chosenOrg = this.organizations.find(item => item.ID === event.value);
    this.$taglistItems = this.appSrv.getListByFilter(this.listName, ['ID', 'Title'], 500, `OrganizationId eq ${chosenOrg.ID}`)
      .pipe(map(res =>  res['value']));
   // this.cdr.markForCheck();
  }


  onInputStart = () => this.customFmSrv.createSessionLog(this.listName);


  onTagValueChange(tagList){
    const tags = tagList.reverse().reduce((acc, t)=> acc.ids ?
                  { ids: `${acc.ids}|${t.ID}` , title: `${acc.title}|${t.Title}`} :
                  { ids: `${t.ID}` , title: `${t.Title}` }, {});
    const data = [
      {type: this.dataTypes.ids, value: tags.ids},
      {type: this.dataTypes.value, value: tags.title}
    ];
          data.forEach(item => this.customFmSrv.prjFormUpdateHandler(item));
  }

  private lockSection(res){
    this.disabled = true;
    this.tooltip = `Modyfing by ${res.Username}`;
    this.cdr.markForCheck();
    return EMPTY
  }

  private unlockSection(){

     return  this.disabled ? this.appSrv.getFormField([this.dataTypes.ids,this.dataTypes.value].toString())
      .pipe(
        tap((res) =>  {
          console.log('unlockField line 92',res);
          this.initialValues = {ids: res[this.dataTypes.ids], members: res[this.dataTypes.value]};

          // this.inputControl.enable()
          // this.inputControl.setValue(res[this.dataType])
          this.tooltip = null;
          this.disabled = false;
          this.cdr.markForCheck();
        })) : EMPTY



    // this.cdr.markForCheck();
    // return EMPTY
  }

  ngOnInit(): void {
    //console.log(this.listName);
    this.sectuionLockSubscription$ = this.sectionLock.subscribe()

  }

  ngOnDestroy(): void {
    this.sectuionLockSubscription$.unsubscribe()
  }

}
