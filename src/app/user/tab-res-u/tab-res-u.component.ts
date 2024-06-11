import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { AddFeedbackComponent } from '../add-feedback/add-feedback.component';
import { MatDialog } from '@angular/material/dialog';
import { AnnulerReservationComponent } from '../annuler-reservation/annuler-reservation.component';
import { ReservationService } from 'src/app/services/reservation.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-tab-res-u',
  templateUrl: './tab-res-u.component.html',
  styleUrls: ['./tab-res-u.component.css']
})
export class TabResUComponent implements OnInit {

  constructor(private dialog: MatDialog, private reservationservice: ReservationService) { }
  reservations!: Reservation[]
  today = new Date()


  ngOnInit(): void {
   this.inisializeReservation()
  }

  inisializeReservation(){
    this.reservationservice.getReservationsByClient(Number(localStorage.getItem("idCl"))).subscribe(res => {
      this.reservations = res.sort((a, b) => a.date_res < b.date_res ? 1 : -1);
    })
  }

  transDate(d: Date) {
    let date = formatDate(d, 'dd/MM/yyyy', 'en')
    let mois: number = Number(date.substring(3, 5)) - 1
    let jour: number = Number(date.substring(0, 2))
    let année: number = Number(date.substring(6))
    return new Date(année, mois, jour)
  }



  updateRate(id: number, rate: number): void {
    this.reservationservice.addRate(id, rate).subscribe(res => {
      this.reservations = this.reservations.filter(r => r.idRes != res.idRes)
      this.reservations.push(res)
      this.reservations.sort((a, b) => a.date_res < b.date_res ? 1 : -1);

    })
  }

  openFeedBack(id: number) {
    this.dialog.open(AddFeedbackComponent, {
      data: id
    }).afterClosed().subscribe(res => {
      if (res) {
        this.reservations = this.reservations.filter(r => r.idRes != res.idRes)
        this.reservations.push(res)
        this.reservations.sort((a, b) => a.date_res < b.date_res ? 1 : -1);
      }
    })
  }

  annuler(id: number) {
    this.dialog.open(AnnulerReservationComponent, {
      data: id
    });
  }
}
