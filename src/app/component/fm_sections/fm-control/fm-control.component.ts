import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {SearchableDropdownComponent} from "../../component-ui/searchable-dropdown/searchable-dropdown.component";
import {ControlDataTypes} from "../../../../models/formDataTypes";
import {AppService} from "../../../app.service";
import {EMPTY, filter, map, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {NEW_HUMAN_RESOURCE_ITEM} from "../../../../environments/environment";
import {CustomFormService} from "../../../custom-form/custom-form.service";




@Component({
  selector: 'app-fm-control',
  standalone: true,
  imports: [
        CommonModule,
        NebularModule,
        ReactiveFormsModule,
        SearchableDropdownComponent,

    ],
  templateUrl: './fm-control.component.html',
  styleUrls: ['./fm-control.component.scss']
})
export class FmControlComponent implements OnInit, OnDestroy {
  constructor(
    private cdr:ChangeDetectorRef,
    private appSrv: AppService,
    private customFmSrv: CustomFormService,
  ) { }

  @Input() formData!: any
  @Input() humanResource!:any;
  @Input() status:any;
  @Input() statusReason:any;
  @Input() organizations!:any;
  @Input() cntSectionFmControls:any;
  @Input() sectionName:string;

  @Output() output = new EventEmitter();
  humanResource$:Observable<any>
  statusReasonList$:Observable<any>;

  noOrgValueStr = '(Select an Organization)'

  dataTypes = new ControlDataTypes();
  priorityGroup = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  prioritySubGroup = ['A', 'B', 'C'];
  lastSelectOption = {ID:-1,Id:-1, Title:'(None)'};
  dataFirstChange = true;
  disabled = false;
  tooltip:string;
  private sectuionLockSubscription$:Subscription;

  private sectionLock = this.customFmSrv.SeessionLogFieldTypes()
    .pipe(
      map(res => res.find(item => item.Field_type === this.sectionName && item?.sessionId !== this.appSrv.getSessionId())),
      switchMap( res => !!res ? this.lockSection(res) : this.unlockSection())
    )

  onFieldChange(event){
    if(event.type === this.dataTypes.sts){
      this.statusFieldsCascade(event.value);
    }
    if(event.type === this.dataTypes.orgId){
      this.onOrgChange(event.value)
    }
    console.log('fm-control.onFieldChange',event);
    this.output.emit(event);
  }
  inputStart = () => this.customFmSrv.createSessionLog(this.sectionName);

  private lockSection(res){
    this.disabled = true;
    this.tooltip = `Modyfing by ${res.Username}`;
    this.cdr.markForCheck();
    return EMPTY
  }

  private unlockSection(){
    // return  this.disabled ? this.appSrv.getFormField([this.dataTypes.ids,this.dataTypes.value].toString())
    //   .pipe(
    //     tap((res) =>  {
    //       console.log('unlockField line 92',res);
    //       //this.initialValues = {ids: res[this.dataTypes.ids], members: res[this.dataTypes.value]};
    //
    //       this.tooltip = null;
    //       this.disabled = false;
    //       this.cdr.markForCheck();
    //     })) : EMPTY
    return EMPTY
  }
  private statusFieldsCascade(statusId:number){
    this.statusReasonList$ = of(this.statusReason)
      .pipe(map((sts) => sts.filter(item => item.StatusId === statusId )))
   !this.dataFirstChange ? this.cntSectionFmControls.StatusReasonSelect.setValue('(None)'): null;
    this.dataFirstChange = false;
  }
  private onOrgChange(orgId:number){
    if(orgId < 0) return this.noOrgValueForHumanRrecource();
    this.humanResource$ = this.appSrv.getListByFilter('ProjectHumanResources', ['ID','Title'], 320, `OrganizationId eq ${orgId}`)
                          .pipe(map(res =>  res['value']));
   this.resetHumanRrecourceInputs();
  }
  private noOrgValueForHumanRrecource(){
    this.cntSectionFmControls.OwnerSelect.setValue(this.noOrgValueStr);
    this.cntSectionFmControls.LeadSelect.setValue(this.noOrgValueStr);
    this.cntSectionFmControls.ManagerSelect.setValue(this.noOrgValueStr);
    this.cntSectionFmControls.OwnerSelect.disable();
    this.cntSectionFmControls.LeadSelect.disable();
    this.cntSectionFmControls.ManagerSelect.disable();
    this.humanResource$ = EMPTY;
  }
  private resetHumanRrecourceInputs(){
    this.cntSectionFmControls.OwnerSelect.reset();
    this.cntSectionFmControls.LeadSelect.reset();
    this.cntSectionFmControls.ManagerSelect.reset();
    this.cntSectionFmControls.OwnerSelect.enable();
    this.cntSectionFmControls.LeadSelect.enable();
    this.cntSectionFmControls.ManagerSelect.enable();
  }

  ngOnInit(): void {
    this.sectuionLockSubscription$ = this.sectionLock.subscribe()
    this.humanResource$ = of(this.humanResource);
    this.statusFieldsCascade(this.formData.StatusId);


  }

  ngOnDestroy(): void {
    this.sectuionLockSubscription$.unsubscribe()
  }





}
