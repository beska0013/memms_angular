import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fm-review-context',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fm-review-context.component.html',
  styleUrls: ['./fm-review-context.component.scss']
})
export class FmReviewContextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
