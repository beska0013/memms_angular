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
import {EMPTY, map, Observable, of, Subscription, switchMap, tap} from "rxjs";
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

    this.output.emit(event);
    return this.customFmSrv.prjFormUpdateHandler(event);
  }

  inputStart = () => this.customFmSrv.createSessionLog(this.sectionName);


  private lockSection(res){
    this.disabled = true;
    this.tooltip = `Modyfing by ${res.Username}`;
    this.cdr.markForCheck();
    return EMPTY
  }

  private unlockSection(){
    const cnt_section_fields = [
      this.dataTypes.orgId,
      this.dataTypes.ownerId,
      this.dataTypes.mngId,
      this.dataTypes.leadId,
      this.dataTypes.prGroup,
      this.dataTypes.prSubGroup,
      this.dataTypes.percent,
      this.dataTypes.sts,
      this.dataTypes.stsReason
    ];
    return  this.disabled ? this.appSrv.getFormField(cnt_section_fields.toString())
      .pipe(
        tap((res) =>  {
          this.applyNewDataOnUnlock(res);
          this.tooltip = null;
          this.disabled = false;
          this.cdr.markForCheck();
        })) : EMPTY
  }

  applyNewDataOnUnlock(newData:any){
    const orgValue = this.organizations.find(item => item.ID === newData.OrganizationId) || this.lastSelectOption;
    const ownerValue = this.humanResource.find(item => item.ID === newData.OwnerId) || this.lastSelectOption;
    const mngValue = this.humanResource.find(item => item.ID === newData.ProjectManagerId) || this.lastSelectOption;
    const leadValue = this.humanResource.find(item => item.ID === newData.ProjectLeadId) || this.lastSelectOption;
    const priorityGrValue = this.priorityGroup.find(item => parseInt(item, 10) === parseInt(newData.ProjectPriorityGroup, 10));
    const prioritySubGrValue = this.prioritySubGroup.find(item => item === newData.ProjectPrioritySubGroup);
    const stsValue = this.status.find(item => item.ID === newData.StatusId) || this.lastSelectOption;
    const stsReasonValue = this.statusReason.find(item => item.ID === newData.StatuStatusReasonId) || this.lastSelectOption;


    this.cntSectionFmControls.OrgSelect.setValue(orgValue?.Title);
    this.cntSectionFmControls.OwnerSelect.setValue(ownerValue?.Title);
    this.cntSectionFmControls.ManagerSelect.setValue(mngValue?.Title);
    this.cntSectionFmControls.LeadSelect.setValue(leadValue?.Title);
    this.cntSectionFmControls.PriorityGrSelect.setValue(priorityGrValue);
    this.cntSectionFmControls.PrioritySubGrSelect.setValue(prioritySubGrValue);
    this.cntSectionFmControls.PercentComplete.setValue(newData.PercentComplete);
    this.cntSectionFmControls.StatusSelect.setValue(stsValue?.Title);
    this.cntSectionFmControls.StatusReasonSelect.setValue(stsReasonValue?.Title );
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
