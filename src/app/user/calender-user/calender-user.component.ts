import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResFormComponent } from '../res-form/res-form.component';
import { formatDate } from '@angular/common';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-calender-user',
  templateUrl: './calender-user.component.html',
  styleUrls: ['./calender-user.component.css']
})
export class CalenderUserComponent implements OnInit {

  constructor(private dialog: MatDialog, private reservationservice: ReservationService, private active: ActivatedRoute) { }

  dates: Date[] = [];
  reservations!: Reservation[]
  reservationsclient!: Reservation[]

  calendrier: { time: string, dates: Date[] }[] = [
    { time: "14:00", dates: [] },
    { time: "15:30", dates: [] },
    { time: "17:00", dates: [] },
    { time: "18:30", dates: [] },
    { time: "20:00", dates: [] },
    { time: "21:30", dates: [] },
    { time: "23:00", dates: [] }
  ];


  ngOnInit(): void {
    this.initializeDates();
    this.initializeReservations();
    this.initializeReservationsClients();
  }

  initializeReservationsClients() {
    this.reservationservice.getReservationsByClient(Number(localStorage.getItem("idCl"))).subscribe(res => this.reservationsclient = res)

  }

  initializeReservations() {

    const id = this.active.snapshot.params['id']

    this.reservationservice.getReservationsByTerrainAndDates(id,this.dates[0],this.dates[6]).subscribe(res => {

      this.reservations = res

      for (let r of this.reservations) {
        const timeEntry = this.calendrier.find(t => t.time === r.temps);
        if (timeEntry && !r.annule) {
          timeEntry.dates.push(new Date(r.date_res));
        }
      }
    })
  }

  initializeDates(): void {
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      this.dates.push(nextDate);
    }
  }





  isDateInList(date: Date, dates: Date[]): boolean {

    return dates.some(d => d.getDate() === date.getDate());
  }





  openDialol(time: string, d: Date) {


    let n1: number = 0
    let n2: number = 0

    for (let r of this.reservationsclient) {
      if (!r.annule) {
        if (new Date(r.date_res).getDate() == d.getDate())
          n1++
        n2++
      }

    }

    if (n2 > 2) {
      this.dialog.open(AlertComponent, {
        data: {message:"Tu as accédé le nombre maximum des reservations par semaine",index:1},
        position: { top: '1%',left:'40%' },
    hasBackdrop: false


      })
      return

    }

    if (n1 > 0) {
      this.dialog.open(AlertComponent, {
        data: {message:"Tu as accédé le nombre maximum des reservations par jour",index:1},
        position: { top: '1%',left:'40%' },
        hasBackdrop: false
    
        
      })
      return
    }






    let date: string = formatDate(d, 'dd/MM/yyyy', 'en');
    const id = this.active.snapshot.params['id']


    this.dialog.open(ResFormComponent, {
      data: { time, date, id },
      width: '600px'

    });

  }

  

}
