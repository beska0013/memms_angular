import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbTagComponent,
  NbTagInputDirective,
} from "@nebular/theme";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {AppService} from "../../../app.service";



@Component({
  selector: 'app-fm-tags',
  standalone: true,
  imports: [CommonModule, NebularModule, ReactiveFormsModule, FormsModule],
  templateUrl: './fm-tags.component.html',
  styleUrls: ['./fm-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FmTagsComponent implements OnInit {

  constructor(private srv:AppService, private cdr:ChangeDetectorRef) { }
  @Input() status:string
  @Input() sectionTitle:string
  @Input() organizations!:any;
  @Input() searchScope!:any;
  @Input() listName!:any;
           taglist:any[];

  trackByFn(index, item) {
    return item.name;
  }

  trees: Set<string> = new Set([]);


  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInputElement: ElementRef<HTMLInputElement>;

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
    this.taglist = [];
  }

  onInputChanges(){
    const value =  this.tagInputElement.nativeElement.value;
    const searchScopeId = this.organizations.find(item => item.Title === this.searchScope.value).ID
    this.srv.searchListItems({
      listName: this.listName ,
      selectItems: ['ID', 'Title'],
      filterQuery: `substringof('${value}',Title) and OrganizationId eq ${searchScopeId}`,
    }).subscribe((res:{value:any[]}) => {
      console.log(res);
      this.taglist = res.value.map(item => item.Title);
      // console.log(this.taglist);
      this.cdr.markForCheck()
    })


  }

  ngOnInit(): void {}

}
