import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "../component/header/header.component";
import {FmTitleComponent} from "../component/fm_sections/fm-title/fm-title.component";
import {FmControlComponent} from "../component/fm_sections/fm-control/fm-control.component";
import {AppService} from "../app.service";
import {FormControl, FormGroup} from "@angular/forms";
import {FmAreaComponent} from "../component/fm_sections/fm-area/fm-area.component";
import {FmTagsComponent} from "../component/fm_sections/fm-tags/fm-tags.component";
import {FmReviewFrequencyComponent} from "../component/fm_sections/fm-review-frequency/fm-review-frequency.component";
import {NebularModule} from "../shared/nebular/nebular.module";
import {GeneralComponent} from "../component/tabs/general/general.component";
import {AreaToolsComponent} from "../component/tabs/area-tools/area-tools.component";
import {NotesComponent} from "../component/tabs/notes/notes.component";
import {TasksComponent} from "../component/tabs/tasks/tasks.component";
import {LinksComponent} from "../component/tabs/links/links.component";
import {FilesComponent} from "../component/tabs/files/files.component";
import {SecurityComponent} from "../component/tabs/security/security.component";
import {TimeComponent} from "../component/tabs/time/time.component";
import {AutoTextComponent} from "../component/tabs/auto-text/auto-text.component";
import {AudioLogComponent} from "../component/tabs/audio-log/audio-log.component";
import {CustomFormService} from "./custom-form.service";
import {parseISO} from 'date-fns'

@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FmTitleComponent,
    FmControlComponent,
    NebularModule,
    FmAreaComponent,
    FmTagsComponent,
    FmReviewFrequencyComponent,
    GeneralComponent,
    AreaToolsComponent,
    NotesComponent,
    TasksComponent,
    LinksComponent,
    FilesComponent,
    SecurityComponent,
    TimeComponent,
    AutoTextComponent,
    AudioLogComponent,

  ],
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormComponent   implements OnInit,OnDestroy {
  constructor(
    private srv:AppService,
    private customFmSrv:CustomFormService
  ) { }



  @Input() formData!: any;

  areaPathList:{ID:string, Title:string}[] = [];

  tabs = [
    {
      name:'General',
      active:true
    },
    {
      name:'Area Tools',
      active:false
    },
    {
      name:'Notes',
      active:false
    },
    {
      name:'Audio Log',
      active:false
    },
    {
      name:'Tasks',
      active:false
    },
    {
      name:'Links',
      active:false
    },
    {
      name:'Files',
      active:false
    },
    {
      name:'Security',
      active:false
    },
    {
      name:'Time',
      active:false
    },
    {
      name:'Auto Text',
      active:false
    },

  ];

  tabType:string = 'General';

  form = new FormGroup({
    orgInputFormControl: new FormControl(),
    ownerInputFormControl: new FormControl(),
    managerFmControl: new FormControl(),
    leadInputFmControl: new FormControl(),
    priorityGrInputFmControl: new FormControl(),
    prioritySubGrInputFmControl: new FormControl(),
    percentCompleteInputFmControl: new FormControl(),
    statusInputFmControl: new FormControl(),
    statusReasonInputFmControl: new FormControl(),
    areaInputFmControl: new FormControl(),
    highLevelGoal:new FormControl(),
    acceptanceCriteria: new FormControl(),
    buisinessBenefit: new FormControl(),
    internalStatus: new FormControl(),
    externalStatus: new FormControl(),
    due_date: new FormControl(),
    commit_date: new FormControl(),
    project_start_date: new FormControl(),
    completion_date: new FormControl(),
    current_sts_date: new FormControl(),
  })

  cntSectionFmControls = {
    OrgSelect: this.form.controls.orgInputFormControl,
    OwnerSelect: this.form.controls.ownerInputFormControl,
    ManagerSelect: this.form.controls.managerFmControl,
    LeadSelect: this.form.controls.leadInputFmControl,
    PriorityGrSelect: this.form.controls.priorityGrInputFmControl,
    PrioritySubGrSelect: this.form.controls.prioritySubGrInputFmControl,
    PercentComplete: this.form.controls.percentCompleteInputFmControl,
    StatusSelect: this.form.controls.statusInputFmControl,
    StatusReasonSelect: this.form.controls.statusInputFmControl,
};

  // generalTabFmControls = {
  //   highLevelGoal:new FormControl(),
  //   acceptanceCriteria: new FormControl(),
  //   buisinessBenefit: new FormControl(),
  //   internalStatus: new FormControl(),
  //   externalStatus: new FormControl(),
  //   due_date: new FormControl(),
  //   commit_date: new FormControl(),
  //   project_start_date: new FormControl(),
  //   completion_date: new FormControl(),
  //   current_sts_date: new FormControl(),
  // };
  generalTabFmControls = {
    highLevelGoal:this.form.controls.highLevelGoal,
    acceptanceCriteria: this.form.controls.acceptanceCriteria,
    buisinessBenefit: this.form.controls.buisinessBenefit,
    internalStatus: this.form.controls.internalStatus,
    externalStatus: this.form.controls.externalStatus,
    due_date: this.form.controls.due_date,
    commit_date: this.form.controls.commit_date,
    project_start_date: this.form.controls.project_start_date,
    completion_date: this.form.controls.completion_date,
    current_sts_date: this.form.controls.current_sts_date,
  };

  autoTextTabFmControls = {
    emailTags :new FormControl(),
    filenameTag: new FormControl()
  };


  areaSearchScope = new FormControl();
  tagSearchScope = new FormControl();
  revieContextSearchScope = new FormControl();
  teamSearchScope = new FormControl();
  stakeholdeSearchScope = new FormControl();
  notificationsSearchScope = new FormControl();

  private activateTab(tab:{name:string,active:boolean}){
    tab.active = true
    this.tabType = tab.name;
  }

  private initAreaSection(){
    const areaPath = this.formData.form.Title.split(':')
                      .map(str => str.trim())
                      .slice(0, this.formData.form.Title.split(':').length - 1)
                      .join(':')
    this.form.controls.areaInputFmControl.setValue(areaPath);

    this.areaSearchScope.setValue(this.formData.organizations
      .find(item => item.ID === this.formData.form.OrganizationId).Title);
  }

  private initTagsSection(){
    this.tagSearchScope.setValue(this.formData.organizations
      .find(item => item.ID === this.formData.form.OrganizationId).Title);
  }

  private initReviewContextSection(){

    this.revieContextSearchScope.setValue(this.formData.organizations
      .find(item => item.ID === this.formData.form.OrganizationId).Title);
  }

  private initTeamSection(){

    this.teamSearchScope.setValue(this.formData.organizations
      .find(item => item.ID === this.formData.form.OrganizationId).Title);
  }

  private initStakeholderSection(){

    this.stakeholdeSearchScope.setValue(this.formData.organizations
      .find(item => item.ID === this.formData.form.OrganizationId).Title);
  }

  private initNotificationsSection(){

    this.notificationsSearchScope.setValue(this.formData.organizations
      .find(item => item.ID === this.formData.form.OrganizationId).Title);
  }

  private initControlSection(){


    this.form.controls.orgInputFormControl
      .setValue(this.formData.organizations
        .find(item => item.ID === this.formData.form.OrganizationId).Title);

    this.form.controls.ownerInputFormControl
      .setValue(this.formData.prjHumanRecource
        .find(item => item.ID === this.formData.form.OwnerId).Title);

    this.form.controls.managerFmControl
      .setValue(this.formData.prjHumanRecource
        .find(item => item.ID === this.formData.form.ProjectManagerId).Title);

    this.form.controls.leadInputFmControl
      .setValue(this.formData.prjHumanRecource
        .find(item => item.ID === this.formData.form.ProjectLeadId).Title);

    this.form.controls.priorityGrInputFmControl
      .setValue(this.formData.form.ProjectPriorityGroup);


    this.form.controls.prioritySubGrInputFmControl
      .setValue(this.formData.form.ProjectPrioritySubGroup);

    this.form.controls.percentCompleteInputFmControl
      .setValue(this.formData.form.PercentComplete * 100);

    this.form.controls.statusInputFmControl
      .setValue(this.formData.status
        .find(item => item.ID === this.formData.form.StatusId).Title);

    this.form.controls.statusReasonInputFmControl
      .setValue(this.formData.statusReason
        .find(item => item.ID === this.formData.form.StatusReasonId).Title);
  }

  private initGeneralTabsValues(){
    this.form.controls.highLevelGoal
      .setValue(this.formData.form.ProjectHighLevelGoal);
    this.form.controls.acceptanceCriteria
      .setValue(this.formData.form.AcceptanceCriteria)
    this.form.controls.buisinessBenefit
      .setValue(this.formData.form.BusinessBenefit)
    this.form.controls.internalStatus
      .setValue(this.formData.form.Current_x0020_Status)
    this.form.controls.externalStatus
      .setValue(this.formData.form.External_x0020_Status)

    this.form.controls.due_date
       .setValue(this.formData.form.Due_x0020_Date ? parseISO(this.formData.form.Due_x0020_Date): this.formData.form.Due_x0020_Date)
    this.form.controls.commit_date
      .setValue(this.formData.form.Commit_x0020_Date ? parseISO(this.formData.form.Commit_x0020_Date) : this.formData.form.Commit_x0020_Date)
    this.form.controls.completion_date
      .setValue(this.formData.form.Completion_x0020_Date ? parseISO(this.formData.form.Completion_x0020_Date) : this.formData.form.Completion_x0020_Date)
    this.form.controls.current_sts_date
      .setValue(this.formData.form.Current_x0020_Status_x0020_Date ? parseISO(this.formData.form.Current_x0020_Status_x0020_Date) : this.formData.form.Current_x0020_Status_x0020_Date)
    this.form.controls.project_start_date
      .setValue(this.formData.form.Project_x0020_Start_x0020_Date ? parseISO(this.formData.form.Project_x0020_Start_x0020_Date) : this.formData.form.Project_x0020_Start_x0020_Date)
  }


  private calcAreaPathId(){
    const chBoundShadow = [this.formData.form.CHOrganizationId]
    for (let i = 1; i <= 10 ; i++) {
      !!this.formData.form[`CH${i}BoundShadow`] ?
        chBoundShadow.push(this.formData.form[`CH${i}BoundShadow`]) :
        null
    }
    return chBoundShadow.join(':')
  }

  private onOrgChange(data:{type:string, value:number}){
    const org = this.formData.organizations.find(item => item.ID === data.value);
    return !!org ? this.resetSearchScrope(org.Title)  : this.resetSearchScrope('All')
  }

  private resetSearchScrope(val:string){
    this.areaSearchScope.setValue(val);
    this.tagSearchScope.setValue(val);
    this.revieContextSearchScope.setValue(val);
    this.teamSearchScope.setValue(val);
    this.stakeholdeSearchScope.setValue(val);
    this.notificationsSearchScope.setValue(val);
  }


   tabsHandler(i:number){
    this.tabs.forEach((tab,index ) => {
      index === i ? this.activateTab(tab) :  tab.active = false
    })
  }

   onSectionValueChange(event:{type:string, value:number}){
     // console.log('onSectionValueChange',event);
     if(event.type === 'OrganizationId'){
       this.onOrgChange(event)
     }
   }

   onSectionValInputStart(dataType:any){
     this.customFmSrv.createSessionLog(dataType)
   }

   onTitleInput(event){
     this.formData.form.ProjectTitle = event
  }

   trackTab(index, item){
    return item
  }

   calcProjectTitle(){
    const title = this.formData.form.Title.split(':').slice(1);
    return title.slice(0, title.length - 1).join(':');
  }



  ngOnInit(): void {
    this.initControlSection();
    this.initAreaSection();
    this.initTagsSection();
    this.initReviewContextSection();
    this.initTeamSection();
    this.initStakeholderSection();
    this.initNotificationsSection();
    this.initGeneralTabsValues();



    for (const key in this.form.controls) {
      this.form.controls[key].valueChanges.subscribe(res => {
        if(this.form.controls[key].dirty){
         // console.log(this.form.controls[key]);
        }
      })
    }


    console.log('custom-form line 274', this.formData);

    this.customFmSrv.sessionLogHandler();
    this.customFmSrv.sessionLogCheck();

  }

  ngOnDestroy(): void {
    this.customFmSrv.sessionLogHandlerUnsubscribe();
    this.customFmSrv.deleteAllSessionLogItems();
  }






}
