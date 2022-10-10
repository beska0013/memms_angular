import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgAudioRecorderModule, NgAudioRecorderService, OutputFormat} from 'ng-audio-recorder';

@Component({
  selector: 'app-audio-log',
  standalone: true,
  imports: [CommonModule,  NgAudioRecorderModule],
  templateUrl: './audio-log.component.html',
  styleUrls: ['./audio-log.component.scss']
})
export class AudioLogComponent implements OnInit {
  private outputFormat: OutputFormat;

  constructor(private audioRecorderService: NgAudioRecorderService) {

    this.audioRecorderService.recorderError.subscribe(recorderErrorCase => {
      // Handle Error
    })
  }

  startRecording() {
    this.audioRecorderService.startRecording();
  }



  stopRecording() {
    this.audioRecorderService.stopRecording(this.outputFormat).then((output) => {
      console.log(output);
      // do post output steps
    }).catch(errrorCase => {
      // Handle Error
    });
  }

  ngOnInit(): void {
  }

}
