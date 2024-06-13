import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-annuler-reservation',
  templateUrl: './annuler-reservation.component.html',
  styleUrls: ['./annuler-reservation.component.css']
})
export class AnnulerReservationComponent {

  constructor(public dialogRef: MatDialogRef<AnnulerReservationComponent>,private reservationservice:ReservationService,@Inject(MAT_DIALOG_DATA) public id:number){}


  close(x:number){
    if(x==1){
      
      this.reservationservice.annuleReservation(this.id).subscribe(res=>{
        this.dialogRef.close(res)

      })
    }
    this.dialogRef.close( )
  }

}


