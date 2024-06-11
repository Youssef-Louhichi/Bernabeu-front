import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Terrain } from 'src/app/models/terrain';
import { ClientService } from 'src/app/services/client.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TerrainService } from 'src/app/services/terrain.service';

@Component({
  selector: 'app-res-form',
  templateUrl: './res-form.component.html',
  styleUrls: ['./res-form.component.css']
})
export class ResFormComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ResFormComponent>, @Inject(MAT_DIALOG_DATA) public data: { time: string, date: string, id: number },
    private fb: FormBuilder, private clientservice: ClientService, private terrainservice: TerrainService, private reservationservice: ReservationService,
    private router: Router) { }

  mois: number = Number(this.data.date.substring(3, 5)) - 1
  jour: number = Number(this.data.date.substring(0, 2))
  année: number = Number(this.data.date.substring(6))

  terrain!: Terrain

  d: Date = new Date(this.année, this.mois, this.jour)



  reservationForm: FormGroup = this.fb.group({
    idRes: null,
    date_res: this.data.date,
    temps: this.data.time,
    tarif: null,
    nbjoueurs: 12,
    rate: null,
    feedback: null,
    eau: false,
    done: false,
    annule: false,
    terrain: null,
    client: null
  });


  ngOnInit(): void {
    this.initialization()
  }

  initialization(){
    
    this.clientservice.getClientById(Number(localStorage.getItem("idCl"))).subscribe(cl => {

      this.terrainservice.getTerrainById(this.data.id).subscribe(ter => {

        this.terrain = ter
        
        this.reservationForm.setValue({
          idRes: null,
          date_res: this.data.date,
          temps: this.data.time,
          tarif: (ter.prix / this.reservationForm.get("nbjoueurs")?.value).toFixed(1),
          nbjoueurs: 12,
          rate: 0,
          feedback: "",
          eau: false,
          done: false,
          annule: false,
          terrain: ter,
          client: cl
        });
      })
    })
  }

  changerTarif() {


    let tarif = this.terrain.prix
    if (this.reservationForm.get("eau")?.value)
      tarif = tarif + 20
    tarif = tarif / this.reservationForm.get("nbjoueurs")?.value
    this.reservationForm.get("tarif")?.setValue(tarif.toFixed(1))

  }

  ajouter() {
    console.log(this.reservationForm.value)
    this.reservationForm.get("date_res")?.setValue(this.d)
    this.reservationservice.addReservation(this.reservationForm.value).subscribe(res => {
      if (res) {
        this.dialogRef.close()
        this.router.navigate(["/main/mesres"])
      }
    })
  }




}
