import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, combineLatest, empty, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {AppService} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class CustomFormService {

  constructor(private appSrv:AppService) { }

  private sessionLogListToDelete = [];

  private $sessionLogListToCreate = new BehaviorSubject<{type:string}[]|undefined>([]);
  private SessionLogListToCreate = () => this.$sessionLogListToCreate as Observable<any>;

  private $deleteSessionLogItemState = new BehaviorSubject<boolean>(false);
  private DeleteSesionLogItems = () => this.$deleteSessionLogItemState as Observable<boolean>;

  private $updatableList = new BehaviorSubject<any[]|undefined>([]);
  private UpdatableList = () => this.$updatableList as Observable<any>;

  private $sessionLogFieldTypes = new BehaviorSubject([]);
  SeessionLogFieldTypes = () => this.$sessionLogFieldTypes as Observable<any>;

  private $loading = new BehaviorSubject<boolean>(false);
  loading = () => this.$loading as Observable<boolean>;

  sessionLogHandler(){
    this.SessionLogListToCreate().pipe(
        switchMap(list => list.length > 0 ?
          combineLatest(list.map( item => this.onCreateSessionLogItem(item))):
          EMPTY )
    ).subscribe(res => console.log('SessionLogListToCreate',res))

    this.DeleteSesionLogItems().pipe(
      switchMap(state => state ?
        combineLatest(this.sessionLogListToDelete.map( item => this.onDeleteSessionLogItem(item)))
          .pipe(tap((res) =>  {
            console.log('tap DeleteSesionLogItems', res);
            this.sessionLogListToDelete = [];
          })):
        EMPTY)
    ).subscribe(res =>  {

      console.log('subscribe DeleteSesionLogItems', res)
    })

    this.UpdatableList().pipe(
      switchMap(list => list.length > 0 ?
        combineLatest(list.map( item => this.onUpdate(item))) :
        EMPTY )
    ).subscribe(res => {
      console.log('UpdatableList', res)
    })
  }

  sessionLogCheck(){
    setInterval(() => this.checkFielldsState(), 500);
  }

  createSessionLog(dataType:string) {
    const list = [ ...this.$sessionLogListToCreate.value];
          list.push({ type: dataType});
    this.$sessionLogListToCreate.next(list);
  }

  deleteSessionLog(data:any){
    this.$loading.next(true);
    this.$deleteSessionLogItemState.next(true);
    const list = [...this.$updatableList.value]
    list.push(data);
    this.$updatableList.next(list);
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
          this.sessionLogListToDelete.push(item);
          console.log('onCreateSessionLogItem',this.sessionLogListToDelete);
        })
      )
  }

  private onDeleteSessionLogItem(item:any){
    console.log(item);
    return this.appSrv.deleteSessionLogListItemby(item)
      .pipe(
        catchError((err) => {
          console.log('onDeleteSessionLogItem', err);
          return err.status === 404 ? of(null) : err
        })
      )
  }

  private onUpdate(item:any){
    const DATA = {
      "__metadata": {
        "type": "SP.Data.ProjectsListItem",
      },
      ...item
    }
    return this.appSrv.updatePrjForm(DATA).pipe(
      catchError((err) => {
        console.log('onUpdate',err);
        return err.status === 409 ? EMPTY : err
      }),
      tap(() => {
        this.$loading.next(false)
        this.$updatableList.next([])
      })
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
