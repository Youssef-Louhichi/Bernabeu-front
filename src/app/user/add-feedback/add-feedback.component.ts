import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ReservationService } from 'src/app/services/reservation.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent {

  constructor(private reservationservice:ReservationService,private dialog:MatDialog,public dialogRef: MatDialogRef<AddFeedbackComponent>,@Inject(MAT_DIALOG_DATA) public id:number){}
  dis:boolean=true


  envoyer(message:string){
    this.reservationservice.addFeedback(this.id,message).subscribe(
      res => this.dialogRef.close(res)
     
    
        
    )
    this.dialog.open(AlertComponent, {
      data: {message:"Ton message est envoyé avec succés",index:2},
      position: { top: '1%',left:'40%' },
      hasBackdrop: false
    })
  }


  buttDisabled(message:string){
    this.dis=message==""

  }
}
