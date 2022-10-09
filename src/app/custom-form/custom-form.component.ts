import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
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

  ],
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormComponent   implements OnInit {
  constructor( private srv:AppService) { }

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

  ]
  tabType:string = 'General'

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
}

  areaSeachScope = new FormControl();
  tagSearchScope = new FormControl();
  revieContextSearchScope = new FormControl();
  teamSearchScope = new FormControl();
  stakeholdeSearchScope = new FormControl();
  notificationsSearchScope = new FormControl();

   tabsHandler(i:number){
    this.tabs.forEach((tab,index ) => {
      index === i ? this.activateTab(tab) :  tab.active = false
    })
  }
  private activateTab(tab:{name:string,active:boolean}){
     tab.active = true
     this.tabType = tab.name;
  }

  ngOnInit(): void {
    this.initControlSection();
    this.initAreaSection();
    this.initTagsSection();
    this.initReviewContextSection();
    this.initTeamSection();
    this.initStakeholderSection();
    this.initNotificationsSection();


    for (const key in this.form.controls) {
      this.form.controls[key].valueChanges.subscribe(res => {
        if(this.form.controls[key].dirty){
          console.log(this.form.controls[key]);
        }
      })
    }

    // console.log(this.formData.form.Title.split(':').slice(0, this.formData.form.Title.split(':').length - 1));
    console.log(this.formData);
    // console.log(this.form);


  }

  onTitleChange(event){
    this.formData.form.ProjectTitle = event
  }

  initAreaSection(){
    const areaPath = this.formData.form.Title.split(':').slice(0, this.formData.form.Title.split(':').length - 1).join(':')
    const areaPathId = this.calcAreaPathId();
    this.areaPathList.push({ID: areaPathId, Title: areaPath})
    this.form.controls.areaInputFmControl.setValue(areaPath);

    this.areaSeachScope.setValue(this.formData.organizations
      .find(item => item.ID === this.formData.form.OrganizationId).Title);
  }

  initTagsSection(){

    this.tagSearchScope.setValue(this.formData.organizations
      .find(item => item.ID === this.formData.form.OrganizationId).Title);
  }

  initReviewContextSection(){

    this.revieContextSearchScope.setValue(this.formData.organizations
      .find(item => item.ID === this.formData.form.OrganizationId).Title);
  }

  initTeamSection(){

    this.teamSearchScope.setValue(this.formData.organizations
      .find(item => item.ID === this.formData.form.OrganizationId).Title);
  }

  initStakeholderSection(){

    this.stakeholdeSearchScope.setValue(this.formData.organizations
      .find(item => item.ID === this.formData.form.OrganizationId).Title);
  }

  initNotificationsSection(){

    this.notificationsSearchScope.setValue(this.formData.organizations
      .find(item => item.ID === this.formData.form.OrganizationId).Title);
  }

  initControlSection(){


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

  trackTab(index, item){
    return item
  }

  calcAreaPathId(){
    const chBoundShadow = [this.formData.form.CHOrganizationId]
    for (let i = 1; i <= 10 ; i++) {
      !!this.formData.form[`CH${i}BoundShadow`] ?
        chBoundShadow.push(this.formData.form[`CH${i}BoundShadow`]) :
        null
    }
    return chBoundShadow.join(':')
  }

  calcProjectTitle(){
    const title = this.formData.form.Title.split(':').slice(1);
    return title.slice(0, title.length - 1).join(':');
  }



}
