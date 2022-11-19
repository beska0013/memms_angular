import {
  CH_AREA_PATH,
  NEW_HUMAN_RESOURCE_ITEM,
  ORGANIZATION_ID,
  OWNER_ID, PERCENT_COMPLETE,
  PRJ_LEAD_ID,
  PRJ_MNG_ID,
  PRJ_PRIORITY_SUB_GR,
  STATUS_ID,
  PRJ_PRIORITY_GR,
  STATUS_REASON_ID
} from "../environments/environment";





export class ControlDataTypes {
  constructor() {
    this.orgId = ORGANIZATION_ID;
    this.ownerId = OWNER_ID;
    this.mngId = PRJ_MNG_ID;
    this.leadId = PRJ_LEAD_ID;
    this.prGroup = PRJ_PRIORITY_GR;
    this.prSubGroup = PRJ_PRIORITY_SUB_GR;
    this.percent = PERCENT_COMPLETE;
    this.sts = STATUS_ID;
    this.stsReason = STATUS_REASON_ID;
    this.CHAreaPath = CH_AREA_PATH;
    this.newHumanResourceItem = NEW_HUMAN_RESOURCE_ITEM;
  }
  readonly orgId:string
  readonly ownerId:string
  readonly mngId:string
  readonly leadId:string
  readonly prGroup:string
  readonly prSubGroup:string
  readonly percent:string
  readonly sts:string
  readonly stsReason:string;
  readonly CHAreaPath:string;
  readonly newHumanResourceItem:string;

}

export class CHAreaPathDataTypes{
  constructor() {
  }

  readonly OrganizationCH:string
  readonly CH1:string
  readonly CH2:string
  readonly CH3:string
  readonly CH4:string
  readonly CH5:string
  readonly CH6:string
  readonly CH7:string
  readonly CH8:string
}

export class TagsDataTypes{
  constructor() {
    this.prjTags = {ids:'TagIds', members:'Tags'}
    this.prjReviewContext = {ids:'ReviewContextTags', members:'ReviewContextTagsIds'}
    this.prjTeam = {ids:'TeamMembersIds', members:'TeamMembers'}
    this.prjStakeholders = {ids:'StakeholderMembersIds', members:'StakeholderMembers'}
    this.prjNotifications = {ids:'NotificationMembersIds', members:'NotificationMembers'}
  }

  readonly prjTags:{ids:string, members:string}
  readonly prjReviewContext:{ids:string, members:string}
  readonly prjTeam:{ids:string, members:string}
  readonly prjStakeholders:{ids:string, members:string}
  readonly prjNotifications:{ids:string, members:string}
}


export class GeneralTabDataTypes{
 readonly highLvLGoal:string;
 readonly acceptanceCriteria:string;
 readonly businessBenefit:string;
 readonly internalSts:string;
 readonly externalSts:string;
 readonly due_date:string;
 readonly commit_date:string;
 readonly project_start_date:string;
 readonly completion_date:string;
 readonly current_sts_date:string;
 constructor() {

   this.highLvLGoal = 'ProjectHighLevelGoal';
   this.acceptanceCriteria= 'AcceptanceCriteria';
   this.businessBenefit= 'BusinessBenefit';
   this.internalSts= 'Current_x0020_Status';
   this.externalSts= 'External_x0020_Status';
   this.due_date= 'Due_x0020_Date';
   this.commit_date= 'Commit_x0020_Date';
   this.project_start_date= 'Project_x0020_Start_x0020_Date';
   this.completion_date= 'Completion_x0020_Date';
   this.current_sts_date= 'Current_x0020_Status_x0020_Date';
 }

}

export class AutoTextDataTypes{
  filenameTag:string;
  emailTag:string;
  constructor() {
    this.filenameTag = 'Tag_x0020_Filename_x0020_Text';
    this.emailTag = 'Tag_x0020_Email_x0020_Text';
  }
}
