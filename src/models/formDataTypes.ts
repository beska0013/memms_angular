

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
}
