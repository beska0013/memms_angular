import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {CdTimerModule} from "angular-cd-timer";

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[ CdTimerModule ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit,AfterViewInit {

  constructor() { }

@ViewChild('timer') timer;

@Input() prjTitle:string;
@Input() title:string;
@Input() smmId:string;



 exitLink =`${_spPageContextInfo.webAbsoluteUrl}/Lists/Projects/Last Modified.aspx`;

  timerResume(){
      this.timer.resume()
  }

  timerStop(){
      this.timer.stop()
  }
 timerReset(){
    this.timer.reset()
 }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    console.log(this.timer.get());
  }

}
