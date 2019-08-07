import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rows;

  constructor() {
    this.rows = new Array(24).fill(null).map((n, i) => ({ id: i, selected: false }));
  }

  updateRows(event: number[]) {
    console.log(event)
    this.rows = [...this.rows.map(r => ({
      ...r, selected: event.some(n => r.id === n)
    }))]
  }
}

// Get the range from the under layer.
// Create event with the grid dimensions and position from the range.