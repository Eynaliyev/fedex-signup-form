import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
@Component({
  selector: 'snackbar.component',
  templateUrl: './snackbar.component.html',
  styles: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
}