import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rows;
  // rowlength and rowid, might want to use time
  events: { rowId: number, eventName: string, rowLength: number }[] = [];

  private eventCounter = 1;
  private selectedRows: number[];

  constructor() {
    this.rows = new Array(24).fill(null).map((n, i) => ({ id: i, selected: false }));
  }

  updateRows(event: number[]) {
    console.log(event)
    this.selectedRows = event;
    this.rows = [...this.rows.map(r => ({
      ...r, selected: event.some(n => r.id === n)
    }))]
  }

  // Handler duplicates
  addEventSelected() {
    console.log(this.selectedRows);
    if (this.selectedRows.length < 1 || this.events.some(e => e.rowId === this.selectedRows[0])) {
      return;
    }
    const newEvent = {
      rowId: this.selectedRows[0],
      eventName: `${this.eventCounter++}`,
      rowLength: this.selectedRows.length,
      position: this.getContentPosition(this.selectedRows[0]),
      height: `${this.selectedRows.length * 50}px`
    }
    this.events = [...this.events, newEvent]
  }

  getContentPosition(rowId) {
    const rowDiff = this.events.map(e => e.rowLength).reduce((acc, current) => current + acc, 0);
    const position = (rowId - rowDiff) * 50;
    return `${position}px`;
  }
}

// Get the range from the under layer.
// Create event with the grid dimensions and position from the range.

// Need sliding, next/prev day animations/nav

// Need annotations style popup

// Need side popout for more detail