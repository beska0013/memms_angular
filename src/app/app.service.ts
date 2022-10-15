import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";





@Injectable({
  providedIn: 'root'
})
export class AppService  {

  constructor(private http:HttpClient) {}

  getForm = () => {
    const itemIdINT = GetUrlKeyValue("ID");
    return this.http.get(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('Projects')/items('${itemIdINT}')`)
  }

  getListByFilter(listName:string, selectItems:string[], count:number,filterQuery: string){

      return this.http.get(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('${listName}')/items?$top=${count}&$select=${selectItems.toString()}&$filter=${filterQuery}`)
  }

  getAllListItems(listName:string, selectItems:string[] = ['*']){
    return this.http.get(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('${listName}')/items?$select=${selectItems.toString()}`)
  }


  searchListItems(arg:{listName: string, selectItems: string[], filterQuery: string}){
      return this.http.get(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/GetByTitle('${arg.listName}')/items?$select=${arg.selectItems.toString()}&$filter=${arg.filterQuery}`)


  }


}



