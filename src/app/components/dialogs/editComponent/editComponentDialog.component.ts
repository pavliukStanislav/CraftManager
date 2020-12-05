import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface EditComponentData{
    name: string,
    cost: number
}

@Component({
  selector: 'deleteDialog',
  templateUrl: './editComponentDialog.component.html',
  styleUrls: ['./editComponentDialog.component.css']
})
export class EditComponentDialogComponent{

  action: string;
  localData: any;

  constructor(
    public dialogRef: MatDialogRef<EditComponentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditComponentData) { 
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }
}
