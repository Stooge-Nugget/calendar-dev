import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appRowSelection]'
})
export class RowSelectionDirective {
    @Output()
    rowSelectionChange = new EventEmitter();

    private mouseDown = false;
    private selectedRows = [];
    private firstCell;
    private currentCell;

    constructor() { }

    @HostListener('mousedown', ['$event.target'])
    onmousedown(event) {
        const rowNumber = +event.getAttribute('row-number');
        console.log(rowNumber);
        if (rowNumber != null && !this.mouseDown) {
            console.log(rowNumber);
            this.mouseDown = true;
            this.selectedRows = [rowNumber];
            this.firstCell = rowNumber;
            this.currentCell = rowNumber;
            this.rowSelectionChange.emit(this.selectedRows);
        }
        console.log('mouse down');
    }

    @HostListener('mouseup', ['$event.target'])
    onmouseup(event) {
        console.log('mouse up');
        this.mouseDown = false;
    }

    // @HostListener('mouseover', ['$event.target'])
    // onmouseover(event) {
    //     if (this.mouseDown) {
    //         console.log('mouse over');
    //         const rowNumber = +event.getAttribute('row-number');
    //         this.selectedRows = this.firstCell < rowNumber ? this.createRange(this.firstCell, rowNumber) : this.createRange(rowNumber, this.firstCell);
    //         this.rowSelectionChange.emit(this.selectedRows);
    //     }

    // }

    //1. end - start + 1, rowNumber was never added, only the previous row was
    //2. use currentCell to determine if row has already been processed
    //3. rowNumber != null, otherwise 0 is ignored with !!rowNumber

    @HostListener('mouseover', ['$event.target'])
    onmouseover(event) {
        const rowNumber = +event.getAttribute('row-number');
        // console.log(rowNumber);
        // console.log(this.selectedRows);
        // console.log(!this.selectedRows.some(r => rowNumber === r));

        if (this.mouseDown && this.currentCell != rowNumber) {
            console.log('mouseover: ', rowNumber);
            this.currentCell = rowNumber;
            this.selectedRows = this.firstCell < rowNumber ? this.createRange(this.firstCell, rowNumber) : this.createRange(rowNumber, this.firstCell);
            this.rowSelectionChange.emit(this.selectedRows);
        }

    }

    private createRange(start, end) {
        return (new Array(end - start + 1)).fill(undefined).map((x, i) => i + start);
    }

}