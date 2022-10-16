

export class ControlDataTypes {
  constructor() {
    this.orgId = 'OrganizationId';
    this.ownerId ='OwnerId';
    this.mngId ='ProjectManagerId';
    this.leadId ='ProjectLeadId';
    this.prGroup ='ProjectPriorityGroup';
    this.prSubGroup ='ProjectPrioritySubGroup';
    this.percent ='PercentComplete';
    this.sts ='StatusId';
    this.stsReason ='StatusReasonId';
    this.CHAreaPath ='CHAreaPath';
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
 constructor() {

   this.highLvLGoal = 'ProjectHighLevelGoal';
   this.acceptanceCriteria= 'AcceptanceCriteria';
   this.businessBenefit= 'BusinessBenefit';
   this.internalSts= 'Current_x0020_Status';
   this.externalSts= 'External_x0020_Status';
 }

}
