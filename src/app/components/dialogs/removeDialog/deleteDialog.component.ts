import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'deleteDialog',
  templateUrl: './deleteDialog.component.html',
  styleUrls: ['./deleteDialog.component.css']
})
export class DeleteDialogComponent{

  action: string;
  localData: any;

  constructor(public fialogRef: MatDialogRef<DeleteDialogComponent>) { 
  }

  ngOnInit(): void {
  }

  delete(){
    this.fialogRef.close("true");
  }
}
