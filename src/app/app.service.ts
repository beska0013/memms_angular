import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {combineLatest, map, switchMap} from "rxjs";





@Injectable({
  providedIn: 'root'
})
export class AppService  {

  constructor(private http:HttpClient) {}


  getForm = () => {
    const itemIdINT = GetUrlKeyValue("ID");
    return this.http.get(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('Projects')/items('${itemIdINT}')`)
  }

  getFormField(field:string){
    const itemIdINT = GetUrlKeyValue("ID");
    return this.http.get(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('Projects')/items('${itemIdINT}')?$select=${field}`)
  }

  getListByFilter(listName:string, selectItems:string[], count:number,filterQuery: string){
      return this.http.get(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('${listName}')/items?$top=${count}&$select=${selectItems.toString()}&$filter=${filterQuery}`)
  }

  getAllListItems(listName:string, selectItems:string[] = ['*']){
    return this.http.get(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('${listName}')/items?$select=${selectItems.toString()}`)
  }

  deleteSessionLogListItembyId(item:any){
    const headers = new HttpHeaders({
      "Accept": "application/json;odata=verbose",
      "X-RequestDigest": `${_spPageContextInfo.formDigestValue}`,
      "X-HTTP-Method": "DELETE",
      "If-Match": "*",
    })
    return this.http.delete(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('ProjectSessionLog')/items('${item.ID}')`,{headers: headers})
  }

  createListItem(DATA:any, list_name:string){
    const headers = new HttpHeaders({
      'Accept': 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': `${_spPageContextInfo.formDigestValue}`,
      "If-Match": "*"
    })
    return this.http.post(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('${list_name}')/items`,DATA, {headers: headers} )
  }

  updatePrjForm(DATA:any){
    const headers = new HttpHeaders({
      'X-RequestDigest': `${_spPageContextInfo.formDigestValue}`,
      'Accept': 'application/json; odata=verbose',
      'Content-Type': 'application/json; odata=verbose',
      'X-HTTP-Method': 'MERGE',
      'If-Match': `*`
    })
    const path = `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('Projects')/items('${this.getFmId()}')`
    return this.http.post(path, DATA, {headers:headers})

  }

  getFmId = () => sessionStorage.getItem('fmId')
  getFmVersion = () => sessionStorage.getItem('fm_V')
  getFmSMMID = () => sessionStorage.getItem('fm_smmId');
  getSessionId =() => sessionStorage.getItem('sessionID');

}



