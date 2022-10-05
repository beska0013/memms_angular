







const HEADERS = () => {
    return {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'X-RequestDigest': `${_spPageContextInfo.formDigestValue}`,
        "If-Match": "*"
    }
}
const UPDATE_HEADERS = () => {
    return {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json; odata=verbose',
        'X-RequestDigest':`${_spPageContextInfo.formDigestValue}`,
        'X-HTTP-Method': 'MERGE',
        'If-Match': '*'
    }
}

async function createProject(currentMEMSUserId: any, currentMEMSUserOrganization: any){
    const statusId = 1;
    const statusReasonId = 12;



    const PRJ_URL = `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('Projects')/items`;

    const DATA = {
        "__metadata": {
            'type': 'SP.Data.ProjectsListItem'
        },
        'Title': 'New Draft Project',
        'ProjectTitle': 'New Draft Project',
        'StatusId': statusId,
        'StatusReasonId': statusReasonId,
        'Temp_Designated': true ,
        'OwnerId': currentMEMSUserId ,
        'ProjectManagerId': currentMEMSUserId ,
        'ProjectLeadId': currentMEMSUserId ,
        'OrganizationId': currentMEMSUserOrganization ,
        'CHOrganizationId': currentMEMSUserOrganization ,
    }

    return await fetch(PRJ_URL, {
        method: 'POST',
        headers:  HEADERS(),
        body: JSON.stringify(DATA)
    }).then(res => res.json())

}

async function writeAuditEntry(title: string, userAsText: string, gui: string, listItem: string, childItem: string) {

    const AUD_LOG_URL = `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('AuditLog')/items`;

    const DATA = {
        "__metadata": {
            'type': 'SP.Data.AuditLogItem'
        },
        'TimeStamp': new Date(),
        'Title': `${title}`,
        'UserAsText':`${userAsText}`,
        'GUI':`${gui}`,
        'ListItem':`${listItem}` ,
        'ChildItem':`${childItem}`,
    }

    return await fetch(AUD_LOG_URL,{
        method: 'POST',
        headers:  HEADERS(),
        body: JSON.stringify(DATA)
    }).then(res => res.json())
}

async function updateNewPrjItem(newProjectId: string){

    let SMM000000 = "000000" + newProjectId;
    SMM000000 = SMM000000.substr(SMM000000.length - 6);
    SMM000000 = "KYN." + SMM000000;

    const UPDATE_PRJ_URL = `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('Projects')/items(${newProjectId})`;

    const DATA = {
        "__metadata": {
            'type': 'SP.Data.ProjectsListItem'
        },
        'SMM_x002e_000000': SMM000000,
        'SMMID': newProjectId
    }

    return await fetch(UPDATE_PRJ_URL, {
        method: 'POST',
        headers:  UPDATE_HEADERS(),
        body: JSON.stringify(DATA)
    }).then(res => res )
}

async function getMEMSUserInfo() {
    const userId = _spPageContextInfo.userId
    // const userId = 91
    //console.log(userId);
    const PRJ_HUMAN_RESOURCE_URL = `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('ProjectHumanResources')/items?$select=*&$filter=MappedSystemUserId eq ${userId}`;


    return await fetch(PRJ_HUMAN_RESOURCE_URL,{
        method:'GET',
        headers: HEADERS()
    }).then(res =>  res.json())
        .then(res => res.d.results[0])

}

export function initPrjUtility(){
    console.log('utility')
    const newItemBtn = document.getElementById('idHomePageNewItem');
    newItemBtn?.removeAttribute("onclick");
    newItemBtn?.removeAttribute("href");
    // @ts-ignore
  newItemBtn.style.cursor = 'pointer';

    newItemBtn?.addEventListener('click',  (event) => getMEMSUserInfo().then(res => {
        createProject(res.ID,res.OrganizationId).then(res => {
            if(res.error) console.log('error'); // in case of error
            // success =>
            const title = `Created Draft Project for ${_spPageContextInfo.webTitle}`;
            const userAsText = _spPageContextInfo.userLoginName;
            const newProjectId = res.d.ID;
            const gui = `project ${newProjectId}`;

            writeAuditEntry (title, userAsText, gui, '', '')
                .then(res =>{
                    if(res.error) console.log('error'); // in case of error
                    //console.log('audit', res);
                })

            updateNewPrjItem(newProjectId)
                .then(res => {
                    if(!res.ok) console.log('on error',res) //error case
                    window.open(`${_spPageContextInfo.webAbsoluteUrl}/Lists/Projects/EditForm.aspx?ID=${newProjectId}`)
                })
        })
    }))
}

