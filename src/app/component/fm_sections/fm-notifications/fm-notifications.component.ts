import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fm-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fm-notifications.component.html',
  styleUrls: ['./fm-notifications.component.scss']
})
export class FmNotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
