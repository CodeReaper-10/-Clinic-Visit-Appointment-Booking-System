import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {
  progress = 100;
  buffer = 0;
  interval: any;

  constructor(@Inject(MAT_DIALOG_DATA) public error: any) {}

  ngOnInit(): void {
    // Start a timer that reduces the progress bar every second
    this.interval = setInterval(() => {
      if (this.progress > 0) {
        this.progress -= 1;
      }
    }, 48); // The dialog is shown for 5000 ms and the progress bar has 100 total value (so, 5000/100). Reduced it by 2 ms as the dialog takes a few ms to pop-up with animation.
  }
}