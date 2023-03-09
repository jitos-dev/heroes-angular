import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmitterService } from '../../services/emitters.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private emitterService: EmitterService
  ) { }

  ngOnInit(): void {

  }

  //cuando pulsa en eliminar
  btnEliminar() {
    this.emitterService.eventClickDeleteHeroe.emit(true)
  }

}
