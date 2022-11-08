import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {NbTagComponent, NbTagInputDirective} from "@nebular/theme";
import {BehaviorSubject, EMPTY, map, Observable, of, Subscription, switchMap, take, tap} from "rxjs";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomFormService} from "../../../custom-form/custom-form.service";

@Component({
  selector: 'app-tag-ui',
  standalone: true,
  imports: [CommonModule, NebularModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tag-ui.component.html',
  styleUrls: ['./tag-ui.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TagUiComponent implements OnInit, OnChanges {

  constructor(
    private cdr:ChangeDetectorRef,
    private customFmSrv: CustomFormService
  ) { }


  @Input() status:string
  @Input() listName:string
  @Input() taglist:any[];
  @Input() initialValues:{ids:string, members:string};


  @Output() output= new EventEmitter();
  @Output() onInputStart= new EventEmitter();
  @Output() onInputEnd= new EventEmitter();

  trees: Set<string> = new Set([]);
  filteredOptions$: Observable<any>;
  $inputSubject = new BehaviorSubject<string | null>(null)


  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInputElement: ElementRef<HTMLInputElement>;

  private getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.taglist?.filter(optionValue =>
      optionValue.Title ?
        optionValue.Title.toLowerCase().includes(filterValue):
        optionValue.toLowerCase().includes(filterValue));
  }

  private tagResult(list, chosenSet){
    switch (this.listName) {
        case 'ProjectTags':
          return this.onPrjTagsFilters(list, chosenSet)
        case 'ProjectReviewContextTags':
          return this.onPrjReviewContextTags(list, chosenSet)
        case 'ProjectHumanResources':
          return this.onPrjHumanResources(list, chosenSet)
      }

  }

  private onPrjTagsFilters(list, chosenSet){
    return list?.filter( tag => [...chosenSet].map(val => val.split(':').at(-1)).includes(tag.Title));
  }

  //TODO fix filters
  private onPrjReviewContextTags(list, chosenSet){
    return list?.filter( tag => [...chosenSet].map(val => val.toLowerCase()).includes(tag.Title.toLowerCase()));
  }
  private onPrjHumanResources(list, chosenSet){
    return  list?.filter( tag => [...chosenSet].map(val => val.split(':').at(-1)).includes(tag.Title));
  }

  //TODO save on remove
  onTagRemove(tagToRemove: NbTagComponent): void {
    this.trees?.delete(tagToRemove.text);
    this.taglist?.push(tagToRemove.text);
    const chosenTags = this.tagResult(this.taglist, this.trees);
    this.customFmSrv.$editMode.next(true);
    // console.log(!!chosenTags);
     this.output.emit(chosenTags) ;
  }

  onTagAdd(value: string): void {
    if (value) {
      this.trees?.add(value);
      const chosenTags = this.tagResult(this.taglist, this.trees);
      this.output.emit(chosenTags) ;
      //this.taglist = this.taglist?.filter(o => o !== value);
    }
    this.tagInputElement.nativeElement.value = '';
    //this.taglist = undefined
  }

  onInput(){
    this.filteredOptions$ = this.getFilteredOptions(this.tagInputElement.nativeElement.value);
    this.$inputSubject.next(this.tagInputElement.nativeElement.value);
    this.customFmSrv.$editMode.next(true);
  }

  onTagsInit(){
    this.trees.clear();
    this.filteredOptions$ = of(this.taglist);
    if(!!this.initialValues){
      this.initialValues.members ? this.initialValues.members
        .split('|')
        .forEach(member => this.trees?.add(member)) : null
    }
    this.cdr.markForCheck();
  }

  trackByFn(index, item) {
    return index;
  }

  //TODO change behavior
  onFocusIn(){
    console.log('onFocusIn',this.taglist);
    this.$inputSubject.pipe(
      take(2),
      tap(res =>!!res ? this.onInputStart.emit(res): EMPTY)
    ).subscribe();
    this.cdr.markForCheck();
  }

  //TODO change behavior
  onFocusout = () =>  {
    this.$inputSubject.next(null);
    this.tagInputElement.nativeElement.value = '';
  }

  ngOnInit(): void {
    this.onTagsInit();
    //console.log('ngOnInit',this.taglist);
  }



  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if(propName === 'taglist'){
        this.filteredOptions$ =  of(changes[propName].currentValue) ;
        // console.log(changes);
        // console.log(propName);
      }

      if(propName === 'initialValues'){
        this.initialValues = changes[propName].currentValue;
        this.onTagsInit()
      }

    }
  }

}
