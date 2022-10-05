import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fm-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fm-team.component.html',
  styleUrls: ['./fm-team.component.scss']
})
export class FmTeamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
