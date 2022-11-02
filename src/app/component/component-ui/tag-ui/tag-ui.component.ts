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
import {map, Observable, of} from "rxjs";

@Component({
  selector: 'app-tag-ui',
  standalone: true,
  imports: [CommonModule, NebularModule],
  templateUrl: './tag-ui.component.html',
  styleUrls: ['./tag-ui.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TagUiComponent implements OnInit, OnChanges {

  constructor(private cdr:ChangeDetectorRef) { }
  @Input() status:string
  @Input() taglist:any[];
  @Input() initialValues:{ids:string, members:string};
  @Output() output= new EventEmitter()




  trees: Set<string> = new Set([]);
  filteredOptions$: Observable<string[]>;


  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInputElement: ElementRef<HTMLInputElement>;

  private getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.taglist.filter(optionValue =>
      optionValue.Title ?
        optionValue.Title.toLowerCase().includes(filterValue):
        optionValue.toLowerCase().includes(filterValue));
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.trees?.delete(tagToRemove.text);
    this.taglist?.push(tagToRemove.text);
  }

  onTagAdd(value: string): void {
    if (value) {
      this.trees?.add(value);
      this.taglist = this.taglist?.filter(o => o !== value);
    }
    this.tagInputElement.nativeElement.value = '';
    // this.taglist = [];
  }

  onInput(){
    this.filteredOptions$ = this.getFilteredOptions(this.tagInputElement.nativeElement.value);
  }

  onTagsInit(){
    this.filteredOptions$ = of(this.taglist);
    if(!!this.initialValues){
      this.initialValues.members ? this.initialValues.members
        .split('|')
        .forEach(member=> this.trees?.add(member)) : null
    }

  }

  trackByFn(index, item) {
    return item.name;
  }

  ngOnInit(): void {
    this.onTagsInit();
    //console.log( this.trees);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if(propName === 'taglist'){
        this.filteredOptions$ = this.taglist ? of(this.taglist) : null;
      }
    }
  }

}
