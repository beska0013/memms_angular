import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest, delay, EMPTY, Observable, switchMap, tap} from "rxjs";
import {AppService} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class CustomFormService {

  constructor(private appSrv:AppService) { }

  $sessionLogListToCreate = new BehaviorSubject<{type:string}[]|undefined>([]);
  private SessionLogListToCreate = () => this.$sessionLogListToCreate as Observable<any>;

  $deleteSessionLogItemState = new BehaviorSubject<boolean>(false);
  private DeleteSesionLogItems = () => this.$deleteSessionLogItemState as Observable<boolean>;

  $sessionLogFieldTypes = new BehaviorSubject([]);
  SeessionLogFieldTypes = () => this.$sessionLogFieldTypes as Observable<any>;

  $updatableList = new BehaviorSubject<any[]|undefined>([]);
  UpdatableList = () => this.$updatableList as Observable<any>;

  sessionLogListToDelete = [];

  sessionLogHandler(){
    this.SessionLogListToCreate().pipe(
        switchMap(list => list.length > 0 ?
          combineLatest(list.map( item => this.onCreateSessionLogItem(item))):
          EMPTY )
    ).subscribe(res => console.log(res))

    this.DeleteSesionLogItems().pipe(
      switchMap(state => state ?
        combineLatest(this.sessionLogListToDelete.map( item => this.onDeleteSessionLogItem(item)))
          .pipe(tap((res) =>  {
            this.sessionLogListToDelete = [];
          })):
        EMPTY)
    ).subscribe(res =>  console.log('DeleteSesionLogItems', res))

    this.UpdatableList().pipe(
      switchMap(list => list.length > 0 ?
        combineLatest(list.map( item => this.onUpdate(item))) :
        EMPTY )
    ).subscribe(res=> console.log(res))
  }

  sessionLogCheck(){
    setInterval(() => this.checkFielldsState(), 500);
  }

  private onCreateSessionLogItem(item:any){
    const DATA = {
      "__metadata": {
        "type": 'SP.Data.ProjectSessionLogListItem'
      },
      "Project_id": this.appSrv.getFmId(),
      "Project_Etag": this.appSrv.getFmVersion(),
      "Field_type": item.type,
      "User_id":_spPageContextInfo.userId,
      "Title": `Project ${this.appSrv.getFmSMMID()} session`,
      "Username":`${_spPageContextInfo.userLoginName}`,
      "sessionId": `${this.appSrv.getSessionId()}`
    };
    return this.appSrv.createListItem(DATA, 'ProjectSessionLog')
      .pipe(
        tap((res:{d:any}) => {
          Object.assign(item,{ID:res.d.ID})
          this.$sessionLogListToCreate.next([]);
          this.sessionLogListToDelete.push(item)
        })
      )
  }

  private onDeleteSessionLogItem(item:any){
    return this.appSrv.deleteListItembyId('ProjectSessionLog', item.ID)
  }

  private onUpdate(item:any){
    const DATA = {
      "__metadata": {
        "type": "SP.Data.ProjectsListItem",
      },
      ...item
    }
    return this.appSrv.updatePrjForm(DATA).pipe(
      tap(() => this.$updatableList.next([]))
    )


  }

  private checkFielldsState(){
    const fmId = this.appSrv.getFmId();
    return this.appSrv.getListByFilter(
      'ProjectSessionLog',
      ['*'],
      500,
      `Project_id eq ${fmId}`
    ).subscribe((res: { value:any[] }) => this.$sessionLogFieldTypes.next(res.value))
  }

}
