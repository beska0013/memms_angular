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
  of,
  switchMap,
  tap
} from "rxjs";
import {AppService} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class CustomFormService {

  constructor(private appSrv:AppService) { }

  //private sessionLogListToDelete = [];

  private $sessionLogListToCreate = new BehaviorSubject<{type:string}[]|undefined>([]);
  private SessionLogListToCreate = () => this.$sessionLogListToCreate as Observable<any>;

  private $deleteSessionLogItemState = new BehaviorSubject<{type:string, value:string} |null>(null);
  private DeleteSesionLogItems = () => this.$deleteSessionLogItemState as Observable<{type:string, value:string} |null|undefined>;

  private $updatableList = new BehaviorSubject<any[]|undefined>([]);
  private UpdatableList = () => this.$updatableList as Observable<any>;

  private $sessionLogFieldTypes = new BehaviorSubject([]);
  SeessionLogFieldTypes = () => this.$sessionLogFieldTypes as Observable<any>;

  private $loading = new BehaviorSubject<boolean>(false);
  loading = () => this.$loading as Observable<boolean>;

  sessionLogHandler(){
    this.SessionLogListToCreate()
      .pipe(switchMap(list => list.length > 0 ?
          combineLatest(list.map( item => this.onCreateSessionLogItem(item))):
          EMPTY ))
      .subscribe();

    this.DeleteSesionLogItems()
      .pipe(
        switchMap((data) => {
          return !!data ? this.getCurrentSessionLog(data?.type)
            .pipe(
              debounceTime(1000),
              switchMap((res:{value:any[]}) =>
               combineLatest(res.value.map( item => this.deleteSessionLogItem(item)) )
                  .pipe(
                    tap((res) =>  this.prjFormUpdateHandler(data) )
                  )
              )
            ) : EMPTY
          },
        ))
      .subscribe();

    this.UpdatableList().pipe(
      debounceTime(1000),
      switchMap(list => {
        return  list.length > 0 ?
          this.convertArrayToObj(list).pipe(
            switchMap(data => {
              //console.log(data);
              return this.onUpdate(data)
                .pipe(
                  tap(()=> {
                    this.$loading.next(false)
                    this.$updatableList.next([])
                    this.$deleteSessionLogItemState.next(null);
                  })
                )
            })
          ) :
          EMPTY
      } ))
      .subscribe(res => {
      console.log('UpdatableList', res)
    })
  }

  sessionLogCheck = () => setInterval(() => this.checkFielldsState(), 500);


  createSessionLog(dataType:string) {
    const list = [ ...this.$sessionLogListToCreate.value];
          list.push({ type: dataType});
    this.$sessionLogListToCreate.next(list);
  }

  sessionLogDeleteHandler(data:any){
    this.$loading.next(true);
    this.$deleteSessionLogItemState.next(data);
  }

  private prjFormUpdateHandler(data:{type:string, value:string}){
    const list = [...this.$updatableList.value]
    list.push({[`${data.type}`]:data.value});
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
         // Object.assign(item,{ID:res.d.ID});
          this.$sessionLogListToCreate.next([]);
          //this.sessionLogListToDelete.push(item);
          //console.log('onCreateSessionLogItem',this.sessionLogListToDelete);
        })
      )
  }

  private deleteSessionLogItem(item:any){
    return this.appSrv.deleteSessionLogListItemby(item)

  }

  private getCurrentSessionLog(type:string){
    return this.appSrv.getListByFilter(
      'ProjectSessionLog',
      ['ID','Field_type','User_id'],
      50,
      `Field_type eq '${type}' and User_id eq '${_spPageContextInfo.userId}'`
    )
  }

  private onUpdate(item:any){
    const DATA = {
      "__metadata": {
        "type": "SP.Data.ProjectsListItem",
      },
      ...item
    }
    //console.log('onUpdate line 145',item);
    return this.appSrv.updatePrjForm(DATA).pipe(
      // catchError((err) => {
      //   console.log('onUpdate',err);
      //   return EMPTY
      // }),
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

  private convertArrayToObj(array:any[]){
    const obj = {};
    return of(array.map(item => Object.assign(obj, item))[0])
  }


}
