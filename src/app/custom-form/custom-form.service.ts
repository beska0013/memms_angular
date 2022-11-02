import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounce,
  debounceTime,
  empty,
  EMPTY,
  Observable,
  of, Subscription,
  switchMap,
  tap, timer
} from "rxjs";
import {AppService} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class CustomFormService {

  constructor(private appSrv:AppService) { }

  deleteInterval = setTimeout(()=> this.$deleteSessionLogItemState.next(true), 1000)

  private $sessionLogListToCreate = new BehaviorSubject<{type:string}[]|undefined>([]);
  private SessionLogListToCreate = () => this.$sessionLogListToCreate as Observable<any>;

  private $deleteSessionLogItemState = new BehaviorSubject<boolean>(false);
  private DeleteSesionLogItems = () => this.$deleteSessionLogItemState as Observable<boolean>;

  private $projectUpdate = new BehaviorSubject<any[]|undefined>([]);
  private ProjectUpdate = () => this.$projectUpdate as Observable<any>;

  private $sessionLogFieldTypes = new BehaviorSubject([]);
  SeessionLogFieldTypes = () => this.$sessionLogFieldTypes as Observable<any>;

  private $loading = new BehaviorSubject<boolean>(false);
  loading = () => this.$loading as Observable<boolean>;

  $editMode = new BehaviorSubject<boolean>(false)
  private EditMode =() => this.$editMode as Observable<boolean>

  private $sessionLogCreatSubscription:Subscription;
  private $sessionLogDeleteSubscription:Subscription;
  private $projectUpdateSubscription:Subscription;

  sessionLogHandler(){
   this.$sessionLogCreatSubscription = this.SessionLogListToCreate()
      .pipe(
        switchMap(list => list.length > 0 ?
          combineLatest(list.map( item => this.onCreateSessionLogItem(item))):
          EMPTY )
      ).subscribe();

    this.$sessionLogDeleteSubscription = this.DeleteSesionLogItems()
      .pipe(
        switchMap((canDelete) => canDelete ? this.getCurrentSessionLog()
            .pipe(
              debounceTime(1000),
              switchMap((res:{value:any[]}) => this.deleteSessionLogItem(res.value) )
            ) : EMPTY )
      ).subscribe();

    this.$projectUpdateSubscription = this.ProjectUpdate()
      .pipe(
        switchMap((list)=> this.editModeHadler(list))
      ).subscribe();
  }

  sessionLogHandlerUnsubscribe(){
    this.$sessionLogCreatSubscription.unsubscribe();
    this.$sessionLogDeleteSubscription.unsubscribe();
    this.$projectUpdateSubscription.unsubscribe();
  }

  sessionLogCheck = () => setInterval(() => this.checkFielldsState(), 500);

  createSessionLog(dataType:string) {
    const list = [ ...this.$sessionLogListToCreate.value];
          list.push({ type: dataType});
    this.$sessionLogListToCreate.next(list);
  }

  // sessionLogDeleteHandler(data:any){
  //   this.$loading.next(true);
  //   this.$deleteSessionLogItemState.next(data);
  // }

  deleteAllSessionLogItems(){
    return this.appSrv.getListByFilter(
      'ProjectSessionLog',
      ['ID','Field_type','User_id'],
      50,
      `User_id eq '${_spPageContextInfo.userId}'`
    ).pipe(
      switchMap((res:{value:any[]} | null) =>  !!res ?
        combineLatest(res.value.map( item => this.appSrv.deleteSessionLogListItembyId(item) )) :
        EMPTY
      )
    )
  }

  prjFormUpdateHandler(data:{type:string, value:string}){
    const list = [...this.$projectUpdate.value]
    list.push({[`${data.type}`]:data.value});
    this.$projectUpdate.next(list);
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
          // Object.assign(item,{ID:res.d.ID});
          this.$sessionLogListToCreate.next([]);
          //this.sessionLogListToDelete.push(item);
        })
      )
  }

  private editModeHadler(list:any[]|undefined){
    return this.EditMode().pipe(
      debounce(state => state ? timer(2000) : timer(0)),
      switchMap(() => list.length > 0 ? this.convertArrayToObj(list)
        .pipe(
          switchMap(data => this.onUpdatePrjForm(data))
        ) : EMPTY )
    )

  }

  private deleteSessionLogItem(res:any[]){
    return combineLatest(res.map( item => this.appSrv.deleteSessionLogListItembyId(item)))
    .pipe( tap(()=> this.resetSessionLogProcess()))
  }

  private getCurrentSessionLog(){
    return this.appSrv.getListByFilter(
      'ProjectSessionLog',
      ['ID','Field_type','User_id'],
      50,
      ` User_id eq '${_spPageContextInfo.userId}'`
    )
  }

  private onUpdatePrjForm(item:any){
    clearInterval(this.deleteInterval);
    const DATA = {
      "__metadata": {
        "type": "SP.Data.ProjectsListItem",
      },
      ...item
    }
    return this.appSrv.updatePrjForm(DATA)
      .pipe(tap(() => this.initDeleteSessionlogItems()))
  }

  private resetSessionLogProcess(){
    this.$loading.next(false)
    this.$projectUpdate.next([])
    this.$deleteSessionLogItemState.next(false);
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

  private convertArrayToObj(array:any[]){
    const obj = {};
    return of(array.map(item => Object.assign(obj, item))[0])
  }

  private initDeleteSessionlogItems(){
    return this.deleteInterval = setTimeout(()=> this.$deleteSessionLogItemState.next(true), 500)
  }

}
